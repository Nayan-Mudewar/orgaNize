package com.github.Nayan_Mudewar.orgaNize.controller;

import com.github.Nayan_Mudewar.orgaNize.Entity.Comment;
import com.github.Nayan_Mudewar.orgaNize.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        ;
        return ResponseEntity.ok(commentService.createComment(comment));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

}
