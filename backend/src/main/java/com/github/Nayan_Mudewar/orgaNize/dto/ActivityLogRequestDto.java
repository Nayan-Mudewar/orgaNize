package com.github.Nayan_Mudewar.orgaNize.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityLogRequestDto {
    private Long userId;
    private Long taskId;
    private String actionType;
    private String details;
    private LocalDateTime timestamp;
}

