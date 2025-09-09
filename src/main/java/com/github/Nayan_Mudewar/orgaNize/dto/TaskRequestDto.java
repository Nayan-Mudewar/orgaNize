package com.github.Nayan_Mudewar.orgaNize.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto{
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;
    private String createdByName;

    private String assignedToName;
}

