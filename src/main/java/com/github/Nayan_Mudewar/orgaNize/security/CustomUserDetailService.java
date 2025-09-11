package com.github.Nayan_Mudewar.orgaNize.security;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         User user=userRepository.findByName(username).orElseThrow(()->new RuntimeException("Username not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getName())
                .password(user.getPassword())
                .authorities("USER") // or map your actual roles here
                .build();
    }
}
