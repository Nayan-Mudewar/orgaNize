package com.github.Nayan_Mudewar.orgaNize.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLogRequestDto {
    private Long userId;
    private String actionType;
    private Long taskId;
    private LocalDateTime timestamp;
    private String details;
}

