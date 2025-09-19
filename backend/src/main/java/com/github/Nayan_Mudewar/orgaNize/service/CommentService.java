package com.github.Nayan_Mudewar.orgaNize.service;

import com.github.Nayan_Mudewar.orgaNize.Entity.Comment;
import com.github.Nayan_Mudewar.orgaNize.Entity.Task;
import com.github.Nayan_Mudewar.orgaNize.Entity.User;
import com.github.Nayan_Mudewar.orgaNize.dto.CommentRequestDto;
import com.github.Nayan_Mudewar.orgaNize.dto.CommentResponseDto;
import com.github.Nayan_Mudewar.orgaNize.repository.CommentRepository;
import com.github.Nayan_Mudewar.orgaNize.repository.TaskRepository;
import com.github.Nayan_Mudewar.orgaNize.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE comment
    public CommentResponseDto createComment(CommentRequestDto request) {
        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .task(task)
                .user(user)
                .text(request.getText())
                .createdAt(LocalDateTime.now())
                .build();

        Comment saved = commentRepository.save(comment);
        return mapToResponseDto(saved);
    }

    // GET all comments
    public List<CommentResponseDto> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        List<CommentResponseDto> response = new ArrayList<>();
        for (Comment comment : comments) {
            response.add(mapToResponseDto(comment));
        }
        return response;
    }

    // GET comments by task
    public List<CommentResponseDto> getCommentsByTaskId(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        List<Comment> comments = commentRepository.findByTask(task);

        List<CommentResponseDto> response = new ArrayList<>();
        for (Comment comment : comments) {
            response.add(mapToResponseDto(comment));
        }
        return response;
    }

    // DELETE comment
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    // Mapper
    private CommentResponseDto mapToResponseDto(Comment comment) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .taskTitle(comment.getTask().getTitle())
                .userName(comment.getUser().getName())
                .text(comment.getText())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
