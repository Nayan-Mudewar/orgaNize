package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;
import com.github.Nayan_Mudewar.orgaNize.dto.UserRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;

    public UserResponseDto createUser(UserRequestDto dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPassword(dto.getPassword());
        userrepository.save(user);

        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = userrepository.findAll();
        List<UserResponseDto> responseDtos = new ArrayList<>();

        for (User user : users) {
            responseDtos.add(mapToResponseDto(user));
        }

        return responseDtos;
    }

    public UserResponseDto getUserByName(Long id) {
        Optional<User> userOptional = userrepository.findById(id);
        if (userOptional.isPresent()) {
            return mapToResponseDto(userOptional.get());
        } else {
            return null;
        }
    }

    public UserResponseDto updateById(Long id, UserRequestDto dto) {
        Optional<User> useroptional = userrepository.findById(id);
        if (useroptional.isPresent()) {
            User present = useroptional.get();
            present.setEmail(dto.getEmail());
            present.setPassword(dto.getPassword());
            present.setName(dto.getName());
            present.setRole(dto.getRole());

            User updated = userrepository.save(present);
            return mapToResponseDto(updated);
        } else {
            return null;
        }
    }

    public boolean deleteById(Long id) {
        userrepository.deleteById(id);
        return true;
    }


    public UserResponseDto mapToResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }
}
