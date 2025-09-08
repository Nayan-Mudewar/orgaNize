package com.github.Nayan_Mudewar.orgaNize.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    private UUID id;
    @NotBlank
    @Size(min=2,max=100)
    private String name;
    @NotBlank
    @Email
    @Size(max=100)
    private String email;
    @NotBlank
    @Size(min=6,max=100)
    private String password;
    private Role role=Role.USER;
    private LocalDateTime createdAt= LocalDateTime.now();
    private Boolean isActive=true;

    public enum Role{
        USER,ADMIN
    }


}
