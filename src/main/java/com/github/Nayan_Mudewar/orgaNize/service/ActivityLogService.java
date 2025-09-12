package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.ActivityLog;
import com.github.Nayan_Mudewar.orgaNize.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ActivityLogService {
    @Autowired
    private ActivityLogRepository activityLogRepository;
    public void logActivity(Long id, Long userId, String actionType, Long TaskId, LocalDateTime timestamp,String details){
           ActivityLog log=ActivityLog.builder()
                   .id(id)
                   .userId(userId)
                   .actionType(actionType)
                   .TaskId(TaskId)
                   .details(details)
                   .build();

                  activityLogRepository.save(log);

    }
}
