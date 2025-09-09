package com.github.Nayan_Mudewar.orgaNize.dto;

import com.github.Nayan_Mudewar.orgaNize.util.enums;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
   private long id;
   private String username;
   private String email;
}
