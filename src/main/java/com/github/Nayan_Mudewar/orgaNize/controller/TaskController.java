package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.annotation.LogActivity;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.TaskAssignedtoDto;
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
    @LogActivity(actionType="CREATE", details="Created a task")
    public ResponseEntity<TaskResponseDto> createTask(@RequestBody TaskRequestDto request) {
        return ResponseEntity.ok(taskService.createTask(request));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @DeleteMapping("/{id}")
    @LogActivity(actionType="DELETE", details="Deleted a task")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @LogActivity(actionType="UPDATE", details="Updated a task")
    public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long id, @RequestBody TaskRequestDto dto) {
        TaskResponseDto updateTask = taskService.updateTask(id, dto);
        if (updateTask == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updateTask);
    }

    @PutMapping("/assign/{id}")
    @LogActivity(actionType="ASSIGN TASK", details="Assign  task")
    public ResponseEntity<TaskResponseDto> assignTask(@PathVariable Long id, @RequestBody TaskAssignedtoDto dto) {
        return ResponseEntity.ok(taskService.assignTask(id, dto));
    }

    @GetMapping("/AssignTasks/{name}")
    public ResponseEntity<List<TaskResponseDto>> getAssignedTaskList(@PathVariable String name) {
        return ResponseEntity.ok(taskService.TaskAssignTo(name));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TaskResponseDto>> getAssignedTasks(@RequestParam Status status, @RequestParam String name) {
        List<TaskResponseDto> dto = taskService.filterByStatusAndName(status, name);
        return ResponseEntity.ok(dto);
    }
}

