package com.github.Nayan_Mudewar.orgaNize.aop;

import com.github.Nayan_Mudewar.orgaNize.annotation.LogActivity;
import com.github.Nayan_Mudewar.orgaNize.dto.ActivityLogRequestDto;
import com.github.Nayan_Mudewar.orgaNize.security.CustomUserDetails;
import com.github.Nayan_Mudewar.orgaNize.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@RequiredArgsConstructor
public class ActivityLogAspect {

    private final ActivityLogService activityLogService;

    @AfterReturning("@annotation(com.github.Nayan_Mudewar.orgaNize.annotation.LogActivity)")
    public void logActivity(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        LogActivity annotation = methodSignature.getMethod().getAnnotation(LogActivity.class);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            Long userId = userDetails.getUserId();

            ActivityLogRequestDto dto = ActivityLogRequestDto.builder()
                    .userId(userId)
                    .actionType(annotation.actionType())
                    .taskId(null)
                    .timestamp(LocalDateTime.now())
                    .details(annotation.details())
                    .build();

            activityLogService.logActivity(dto);

        }
    }


}

