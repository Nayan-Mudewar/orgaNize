package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.exception.UserNotFoundException;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import com.github.Nayan_Mudewar.orgaNize.security.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;

    public UserResponseDto register(UserRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalStateException("Email already in use");
        }
        if (userRepository.existsByName(dto.getName())) {
            throw new IllegalStateException("Username already in use");
        }

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(dto.getRole())
                .build();

        User saved = userRepository.save(user);
        return new UserResponseDto(saved.getId(), saved.getName(), saved.getEmail());
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getName(), dto.getPassword())
            );

            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            User user = userRepository.findByName(userDetails.getUsername())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            String token = authUtil.generateToken(user);

            return LoginResponseDto.builder()
                    .token(token)
                    .user(new UserResponseDto(user.getId(), user.getName(), user.getEmail()))
                    .build();
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
