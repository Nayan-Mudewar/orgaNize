package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.ActivityLog;
import com.github.Nayan_Mudewar.orgaNize.dto.ActivityLogRequestDto;
import com.github.Nayan_Mudewar.orgaNize.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ActivityLogService {
    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void logActivity(ActivityLogRequestDto dto) {
        ActivityLog log = ActivityLog.builder()
                .userId(dto.getUserId())
                .actionType(dto.getActionType())
                .TaskId(dto.getTaskId())
                .timestamp(dto.getTimestamp())
                .details(dto.getDetails())
                .build();

        activityLogRepository.save(log);
    }

    public List<ActivityLog> getByUserId(Long userId) {
        return activityLogRepository.findByUserId(userId);
    }
}

