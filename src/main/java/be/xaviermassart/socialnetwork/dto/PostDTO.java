package be.xaviermassart.socialnetwork.dto;

import be.xaviermassart.socialnetwork.entity.Post;
import be.xaviermassart.socialnetwork.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class PostDTO {

    private Long id;

    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private Long authorId;
    private Date postedAt;

    public static PostDTO from(Post post) {
        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(post.getUser().getId())
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
