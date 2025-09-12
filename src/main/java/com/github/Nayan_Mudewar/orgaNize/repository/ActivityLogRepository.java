package com.github.Nayan_Mudewar.orgaNize.repository;

import com.github.Nayan_Mudewar.orgaNize.Entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findByUserId(Long userId);
}
