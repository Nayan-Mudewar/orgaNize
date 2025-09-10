package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.Task;
import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskassignedtoDto;
import com.github.Nayan_Mudewar.orgaNize.repository.TaskRepository;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    public TaskResponseDto createTask(TaskRequestDto request) {
        // find creator by username
        User createdBy = userRepository.findByName(request.getCreatedByName())
                .orElseThrow(() -> new RuntimeException("Creator not found: " + request.getCreatedByName()));

        User assignedTo = null;
        if (request.getAssignedToName() != null) {
            assignedTo = userRepository.findByName(request.getAssignedToName())
                    .orElseThrow(() -> new RuntimeException(
                            "Assigned user not found: " + request.getAssignedToName()
                    ));
        }

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .createdBy(createdBy)
                .assignedTo(assignedTo)
                .build();

        Task saved = taskRepository.save(task);
        return mapToResponseDTO(saved);
    }

    private TaskResponseDto mapToResponseDTO(Task task) {
        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdByName(task.getCreatedBy().getName())
                .assignedToName(task.getAssignedTo() != null ? task.getAssignedTo().getName() : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }

    public List<TaskResponseDto> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .filter(Objects::nonNull)
                .map(task -> mapToResponseDTO(task))
                .collect(Collectors.toList());
    }

    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToResponseDTO(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto request) {
        Optional<Task> optionaltask = taskRepository.findById(id);
        if (optionaltask.isPresent()) {
            Task present = optionaltask.get();
            if (request.getDueDate() != null) present.setDueDate(request.getDueDate());
            if (request.getTitle() != null) present.setTitle(request.getTitle());
            if (request.getStatus() != null) present.setStatus(request.getStatus());
            if (request.getDescription() != null) present.setDescription(request.getDescription());
            if (request.getCreatedByName() != null) {
                User user = userRepository.findByName(request.getCreatedByName()).orElseThrow(() -> new RuntimeException("user not found"));
                present.setCreatedBy(user);
            }


            Task updated = taskRepository.save(present);
            return mapToResponseDTO(updated);
        } else {
            return null;
        }
    }

    public TaskResponseDto assignTask(Long id, TaskassignedtoDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found" + id));

        User user = userRepository.findByName(dto.getAssignedToName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setAssignedTo(user);
        Task updated = taskRepository.save(task);
        return mapToResponseDTO(updated);

    }

    public List<TaskResponseDto> TaskAssignTo(String name){
        User user=userRepository.findByName(name).orElseThrow(()->new RuntimeException("User not Found"));
        List<Task> tasks=taskRepository.findByAssignedTo(user);
        List<TaskResponseDto> response=new ArrayList<>();

        for(Task task:tasks){
            response.add(mapToResponseDTO(task));
        }
        return response;
    }
}








