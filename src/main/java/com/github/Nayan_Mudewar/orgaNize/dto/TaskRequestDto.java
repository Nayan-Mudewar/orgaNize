package com.github.Nayan_Mudewar.orgaNize.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequestDto{
    private String title;
    private String description;
    private String status;
    private LocalDateTime dueDate;
    private String createdByName;

    private String assignedToName;
}

