package be.xaviermassart.socialnetwork.dto;

import be.xaviermassart.socialnetwork.entity.Post;
import be.xaviermassart.socialnetwork.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

@Data
@Builder
public class PostDTO {

    private Long id;

    @NotBlank
    @Length(min = 5, max = 100)
    private String title;
    @NotBlank
    @Length(min = 10, max = 2000)
    private String content;
    private LocalDateTime postedAt;

    private Long authorId;
    private String authorName;
    private boolean isAuthor;

    public static PostDTO from(Post post, Long currentUserId) {
        User user = post.getUser();
        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(user.getId())
                .authorName(user.getUsername())
                .isAuthor(user.getId().equals(currentUserId))
                .postedAt(post.getPosted_at())
                .build();
    }

    public Post toEntity(User user) {
        Post post = new Post();
        post.setId(id);
        post.setContent(content);
        post.setTitle(title);
        post.setPosted_at(postedAt);
        post.setUser(user);
        return post;
    }
}
