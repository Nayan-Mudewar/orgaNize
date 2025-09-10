package com.github.Nayan_Mudewar.orgaNize.repository;

import com.github.Nayan_Mudewar.orgaNize.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
