package com.github.Nayan_Mudewar.orgaNize.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDto{
    private long id;
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;
    private String createdByName;
    private String assignedToName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

