package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.annotation.LogActivity;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskAssignedtoDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskResponseDto;
import com.github.Nayan_Mudewar.orgaNize.service.TaskService;
import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @LogActivity(actionType = "CREATE", details = "Created a task")
    public ResponseEntity<?> createTask(@RequestBody(required = false) TaskRequestDto request) {
        if (request == null || request.getTitle() == null) {
            return ResponseEntity.badRequest().body("Title is required");
        }
        TaskResponseDto dto = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        List<TaskResponseDto> tasks = taskService.getAllTasks();
        if (tasks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @DeleteMapping("/{id}")
    @LogActivity(actionType = "DELETE", details = "Deleted a task")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @LogActivity(actionType = "UPDATE", details = "Updated a task")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody(required = false) TaskRequestDto dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().body("Task data is required");
        }
        TaskResponseDto updateTask = taskService.updateTask(id, dto);
        if (updateTask == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
        return ResponseEntity.ok(updateTask);
    }

    @PutMapping("/assign/{id}")
    @LogActivity(actionType = "ASSIGN TASK", details = "Assign task")
    public ResponseEntity<?> assignTask(@PathVariable Long id, @RequestBody TaskAssignedtoDto dto) {
        return ResponseEntity.ok(taskService.assignTask(id, dto));
    }

    @GetMapping("/AssignTasks/{name}")
    public ResponseEntity<?> getAssignedTaskList(@PathVariable String name) {
        return ResponseEntity.ok(taskService.TaskAssignTo(name));
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getAssignedTasks(@RequestParam(required = false) Status status, @RequestParam String name) {
        List<TaskResponseDto> dto;
        if (status != null) {
            dto = taskService.filterByStatusAndName(status, name);
        } else {
            dto = taskService.getTasksByAssignedToName(name); // <- create this method in service
        }
        if (dto.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(dto);
    }

}
