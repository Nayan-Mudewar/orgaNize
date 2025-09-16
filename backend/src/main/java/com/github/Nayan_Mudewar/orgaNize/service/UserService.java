package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto createUser(UserRequestDto dto) {
        if (userrepository.existsByEmail(dto.getEmail())) {
            throw new IllegalStateException("Email already in use");
        }
        if (userrepository.existsByName(dto.getName())) {
            throw new IllegalStateException("Username already exists");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        userrepository.save(user);
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = userrepository.findAll();
        List<UserResponseDto> responseDtos = new ArrayList<>();
        for (User user : users) {
            responseDtos.add(mapToUserResponseDto(user));
        }
        return responseDtos;
    }

    public UserResponseDto getUserByName(Long id) {
        Optional<User> userOptional = userrepository.findById(id);
        return userOptional.map(this::mapToUserResponseDto).orElse(null);
    }

    public UserResponseDto updateById(Long id, UserRequestDto dto) {
        Optional<User> useroptional = userrepository.findById(id);
        if (useroptional.isPresent()) {
            User present = useroptional.get();
            present.setEmail(dto.getEmail());
            present.setPassword(passwordEncoder.encode(dto.getPassword()));
            present.setName(dto.getName());
            present.setRole(dto.getRole());

            User updated = userrepository.save(present);
            return mapToUserResponseDto(updated);
        }
        return null;
    }

    public boolean deleteById(Long id) {
        if (!userrepository.existsById(id)) {
            return false;
        }
        userrepository.deleteById(id);
        return true;
    }

    public UserResponseDto mapToUserResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }
}
