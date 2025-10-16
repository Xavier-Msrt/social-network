package be.xaviermassart.socialnetwork.repository;

import be.xaviermassart.socialnetwork.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p ORDER BY p.posted_at DESC LIMIT 10")
    List<Post> findTenLastPost();
}
