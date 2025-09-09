package com.github.Nayan_Mudewar.orgaNize.Entity;

import com.github.Nayan_Mudewar.orgaNize.util.enums;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @NotBlank
    @Size(max = 100)
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    private enums.Role role = enums.Role.USER;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Boolean isActive = true;

}
