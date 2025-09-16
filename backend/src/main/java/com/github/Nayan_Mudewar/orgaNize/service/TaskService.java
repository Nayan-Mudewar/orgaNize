package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.Task;
import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskAssignedtoDto;
import com.github.Nayan_Mudewar.orgaNize.repository.TaskRepository;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        User createdBy = userRepository.findByName(getCurrentUsername())
                .orElseThrow(() -> new RuntimeException("Creator not found: " + getCurrentUsername()));

        User assignedTo = null;
        if (request.getAssignedToName() != null) {
            assignedTo = userRepository.findByName(request.getAssignedToName())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found: " + request.getAssignedToName()));
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

    public List<TaskResponseDto> getAllTasks() {
        String currentUsername = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        System.out.println(currentUsername);

        return taskRepository.findByCreatedBy_NameOrAssignedTo_Name(currentUsername, currentUsername)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }


    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return mapToResponseDTO(task);
    }

    public boolean deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            return false;
        }
        taskRepository.deleteById(id);
        return true;
    }

    public TaskResponseDto updateTask(Long id, TaskRequestDto request) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isEmpty()) return null;

        Task present = optionalTask.get();
        if (request.getDueDate() != null) present.setDueDate(request.getDueDate());
        if (request.getTitle() != null) present.setTitle(request.getTitle());
        if (request.getStatus() != null) present.setStatus(request.getStatus());
        if (request.getDescription() != null) present.setDescription(request.getDescription());
        if (getCurrentUsername()!= null) {
            User user = userRepository.findByName(getCurrentUsername())
                    .orElseThrow(() -> new RuntimeException("User not found: " + getCurrentUsername()));
            present.setCreatedBy(user);
        }

        Task updated = taskRepository.save(present);
        return mapToResponseDTO(updated);
    }

    public TaskResponseDto assignTask(Long id, TaskAssignedtoDto dto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        User user = userRepository.findById(dto.getAssignedToId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getAssignedToId()));

        task.setAssignedTo(user);
        Task updated = taskRepository.save(task);
        return mapToResponseDTO(updated);
    }

    public List<TaskResponseDto> TaskAssignTo(String name) {
        User user = userRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("User not found with name: " + name));

        List<Task> tasks = taskRepository.findByAssignedTo(user);
        List<TaskResponseDto> response = new ArrayList<>();
        for (Task task : tasks) {
            response.add(mapToResponseDTO(task));
        }
        return response;
    }

    public List<TaskResponseDto> filterByStatusAndName(Status status, String name) {
        List<Task> taskList = taskRepository.getByStatusAndAssignedTo_Name(status, name);
        List<TaskResponseDto> response = new ArrayList<>();
        for (Task task : taskList) {
            response.add(mapToResponseDTO(task));
        }
        return response;
    }

    private TaskResponseDto mapToResponseDTO(Task task) {
        return TaskResponseDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .createdBy(mapToUserResponseDto(task.getCreatedBy()))
                .assignedTo(task.getAssignedTo() != null ? mapToUserResponseDto(task.getAssignedTo()) : null)
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }

    private UserResponseDto mapToUserResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
