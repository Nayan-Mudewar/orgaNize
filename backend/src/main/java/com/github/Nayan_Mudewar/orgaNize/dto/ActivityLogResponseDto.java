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
public class ActivityLogResponseDto{

    private Long id;              // Unique ID of the log
    private Long userId;           // ID of the user who performed the action
    private String username;       // (optional but useful) username of the user
    private String entityName;     // Name of the entity (e.g., "Document", "User")
    private String entityId;       // ID of the entity on which action was performed
    private String actionType;     // CREATE / UPDATE / DELETE / LOGIN etc.
    private String details;    // Description of what happened
    private LocalDateTime timestamp; // When the action occurred
}
