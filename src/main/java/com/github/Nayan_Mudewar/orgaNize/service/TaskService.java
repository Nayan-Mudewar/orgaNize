package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.Task;
import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskResponseDto;
import com.github.Nayan_Mudewar.orgaNize.repository.TaskRepository;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
                .status(Status.valueOf(request.getStatus()))
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
                .status(task.getStatus().name())
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


}


