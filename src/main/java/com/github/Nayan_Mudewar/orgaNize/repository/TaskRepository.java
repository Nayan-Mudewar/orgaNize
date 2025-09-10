package com.github.Nayan_Mudewar.orgaNize.repository;

import com.github.Nayan_Mudewar.orgaNize.Entity.Task;
import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    Optional<Task> findById(Long id);
    List<Task> findByAssignedTo(User user);
    void deleteById(Long id);
}
