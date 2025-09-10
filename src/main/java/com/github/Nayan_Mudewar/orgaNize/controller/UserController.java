package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto dto) {
        UserResponseDto createdUser = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteById(id);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok("User deleted successfully: " + id);

    }

    @PutMapping("update/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody UserRequestDto dto) {

        UserResponseDto updatedUser = userService.updateById(id, dto);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404
        }
        return ResponseEntity.ok(updatedUser); // 200 OK
    }


}
