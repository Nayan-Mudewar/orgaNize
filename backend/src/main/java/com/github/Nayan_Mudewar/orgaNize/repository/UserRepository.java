package com.github.Nayan_Mudewar.orgaNize.repository;

import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    boolean existsByEmail(String email);

    boolean existsByName(String name);


}

