package com.github.Nayan_Mudewar.orgaNize.dto;

import com.github.Nayan_Mudewar.orgaNize.Entity.Comment;
import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDateTime dueDate;
    private UserResponseDto createdBy;
    private UserResponseDto assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    //@Deprecated
   // private List<Comment> commentsList;
}

