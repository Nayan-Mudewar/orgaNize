package com.github.Nayan_Mudewar.orgaNize.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {
    private Long userId;
    private Long taskId;
    private String text;
}
