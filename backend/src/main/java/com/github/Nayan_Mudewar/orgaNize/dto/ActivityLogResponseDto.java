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
public class ActivityLogResponseDto {

    private Long id;
    private Long userId;
    private String username;
    private String entityName;
    private String entityId;
    private String actionType;
    private String details;
    private LocalDateTime timestamp;
}
