package com.github.Nayan_Mudewar.orgaNize.dto;


import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
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
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDateTime dueDate;
    private String createdByName;
    private String assignedToName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

