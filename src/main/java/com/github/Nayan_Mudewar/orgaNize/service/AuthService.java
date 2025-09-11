package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.LoginResponseDto;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import com.github.Nayan_Mudewar.orgaNize.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.github.Nayan_Mudewar.orgaNize.dto.UserResponseDto;


@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthUtil authUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    public LoginResponseDto Login(LoginRequestDto dto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getName(), dto.getPassword()));
        String name=authentication.getName();
        User user=userRepository.findByName(name).orElseThrow(()->new RuntimeException("User Not found"));

        String token=authUtil.generateToken(user);

        return LoginResponseDto.builder()
                .token(token)
                .user(mapToUserResponseDto(user))
                .build();





    }

    public UserResponseDto mapToUserResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
    }
}