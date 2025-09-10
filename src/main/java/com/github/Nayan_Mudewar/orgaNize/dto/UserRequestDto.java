package com.github.Nayan_Mudewar.orgaNize.dto;

import com.github.Nayan_Mudewar.orgaNize.util.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.github.Nayan_Mudewar.orgaNize.util.enums.Role.USER;

@Data
public class UserRequestDto {
    @NotBlank
    @Size(min=2,max=100)
    private String name;
    @NotBlank
    @Size(min=2,max=100)
    private String password;
    @NotBlank
    @Size(min=2,max=100)
    private String email;

    private Role role= USER;
}
