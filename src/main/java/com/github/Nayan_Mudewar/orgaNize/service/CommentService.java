package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.Comment;
import com.github.Nayan_Mudewar.orgaNize.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
     @Autowired
    private CommentRepository commentRepository;

     public Comment createComment(Comment comment){
         Comment Comment=new Comment();
         Comment.setTask(comment.getTask());
         Comment.setText(comment.getText());
         Comment.setUser(comment.getUser());
         commentRepository.save(Comment);
         return Comment;
     }
     public void deleteComment(Long id) {
         commentRepository.deleteById(id);
     }


}