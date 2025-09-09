package com.github.Nayan_Mudewar.orgaNize.dto;

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
