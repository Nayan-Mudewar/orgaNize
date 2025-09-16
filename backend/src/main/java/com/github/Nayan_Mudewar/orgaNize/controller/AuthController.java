package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.annotation.LogActivity;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody(required = false) UserRequestDto dto) {
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
            UserResponseDto response = authService.register(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    @LogActivity(actionType = "LOGIN", details = "User logged in")
    public ResponseEntity<?> login(@RequestBody(required = false) LoginRequestDto dto) {
        if (dto == null || dto.getName() == null || dto.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        try {
            LoginResponseDto response = authService.login(dto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
