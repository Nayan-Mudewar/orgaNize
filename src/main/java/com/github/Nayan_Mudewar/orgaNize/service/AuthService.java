package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginResponseDto;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;

import java.util.Optional;

import static jdk.internal.org.jline.utils.InfoCmp.Capability.user1;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public LoginResponseDto Login(LoginRequestDto dto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getName(), dto.getPassword()));
        Optional<User> user = userRepository.findByName(dto.getName());
        if(user.isPresent()) {
            User user1 = user.get();
        }else{
            return null;
        }
        generate




    }

    public UserResponseDto mapToUserResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }
}