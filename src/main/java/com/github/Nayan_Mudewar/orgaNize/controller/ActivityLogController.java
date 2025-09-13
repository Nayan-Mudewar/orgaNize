package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.Entity.ActivityLog;
import com.github.Nayan_Mudewar.orgaNize.dto.ActivityLogResponseDto;
import com.github.Nayan_Mudewar.orgaNize.repository.ActivityLogRepository;
import com.github.Nayan_Mudewar.orgaNize.security.CustomUserDetails;
import com.github.Nayan_Mudewar.orgaNize.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/activity-log")
public class ActivityLogController {
    @Autowired
    private ActivityLogService activityLogService;
    @Autowired
    private ActivityLogRepository activityLogRepository;
    @GetMapping
    public ResponseEntity<List<ActivityLog>> getActivityLogs() {
       return  ResponseEntity.ok(activityLogRepository.findAll());
    }
    @GetMapping("/me")
    public ResponseEntity<List<ActivityLog>> getMyActivityLog(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        return ResponseEntity.ok(activityLogService.getByUserId(userId));
    }

}
