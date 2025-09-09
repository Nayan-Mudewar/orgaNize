package com.github.Nayan_Mudewar.orgaNize.dto;

import com.github.Nayan_Mudewar.orgaNize.util.enums;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDto {
    @NotBlank
    @Size(min=2,max=100)
    private String username;
    @NotBlank
    @Size(min=2,max=100)
    private String password;
    @NotBlank
    @Size(min=2,max=100)
    private String email;

    private enums.Role role= enums.Role.USER;
}
