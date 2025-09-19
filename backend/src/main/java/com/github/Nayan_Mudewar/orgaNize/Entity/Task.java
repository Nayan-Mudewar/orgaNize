package com.github.Nayan_Mudewar.orgaNize.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.github.Nayan_Mudewar.orgaNize.util.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.github.Nayan_Mudewar.orgaNize.util.enums.Status.TODO;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = TODO;
    @Column(name = "dueDate")
    private LocalDateTime dueDate;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    @JsonIgnoreProperties({"createdTasks","assignTasks"})
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    @JsonIgnoreProperties({"createdTasks","assignTasks"})
    private User assignedTo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

   // @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
  //  @JsonIgnoreProperties("task")
  //  private List<Comment> comments = new ArrayList<>();


}
