package com.github.Nayan_Mudewar.orgaNize.Entity;

import com.github.Nayan_Mudewar.orgaNize.util.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

import static com.github.Nayan_Mudewar.orgaNize.util.enums.Role.USER;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @NotBlank
    @Size(min = 2, max = 100)
    @Column(name="name", unique = true, nullable = false, length = 100)
    private String name;

    @NotBlank
    @Size(max = 100)
    @Column(name="email", unique = true, nullable = false, length = 100)
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    @Column(name="password")
    private String password;

    private Role role = USER;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Boolean isActive = true;

}
