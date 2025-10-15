package be.xaviermassart.socialnetwork.dto;

import be.xaviermassart.socialnetwork.entity.Post;
import be.xaviermassart.socialnetwork.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostDTO {

    private Long id;

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private LocalDateTime postedAt;

    private Long authorId;
    private String authorName;

    public static PostDTO from(Post post) {
        User user = post.getUser();
        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(user.getId())
                .authorName(user.getUsername())
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
