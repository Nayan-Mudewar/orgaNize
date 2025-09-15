package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody(required = false) UserRequestDto dto) {
        if (dto == null || dto.getEmail() == null || dto.getPassword() == null || dto.getName() == null) {
            return ResponseEntity.badRequest().body("All fields (name, email, password) are required");
        }
        if (!dto.getEmail().contains("@")) {
            return ResponseEntity.badRequest().body("Invalid email format");
        }
        if (dto.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters");
        }

        try {
            UserResponseDto createdUser = userService.createUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteById(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok("User deleted successfully: " + id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody(required = false) UserRequestDto dto) {
        if (dto == null) {
            return ResponseEntity.badRequest().body("User data is required");
        }
        UserResponseDto updatedUser = userService.updateById(id, dto);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(updatedUser);
    }
}
