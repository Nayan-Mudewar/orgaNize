package com.github.Nayan_Mudewar.orgaNize.dto;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Builder

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

