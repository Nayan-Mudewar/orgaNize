package com.github.Nayan_Mudewar.orgaNize.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity){
        httpSecurity
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/public").permitAll()
                        .requestMatchers().hasAnyRole(ADMIN)

    }

    @Bean
    public String Passwordecoder(){
        BCryptPasswordEncoder
    }
}
