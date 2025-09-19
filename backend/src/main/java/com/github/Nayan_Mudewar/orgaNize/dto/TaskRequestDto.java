package com.github.Nayan_Mudewar.orgaNize.dto;


import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    private String title;
    private String description;
    private Status status;
    private LocalDateTime dueDate;
    private String assignedToName;
}

