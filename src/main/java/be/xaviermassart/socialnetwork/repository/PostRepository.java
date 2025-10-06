package be.xaviermassart.socialnetwork.repository;

import be.xaviermassart.socialnetwork.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
