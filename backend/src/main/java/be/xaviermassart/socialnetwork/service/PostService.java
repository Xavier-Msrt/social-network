package be.xaviermassart.socialnetwork.service;

import be.xaviermassart.socialnetwork.dto.PostDTO;
import be.xaviermassart.socialnetwork.entity.Post;
import be.xaviermassart.socialnetwork.entity.User;
import be.xaviermassart.socialnetwork.exeception.ForbiddenAccessException;
import be.xaviermassart.socialnetwork.exeception.NotFoundException;
import be.xaviermassart.socialnetwork.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@RequiredArgsConstructor
@Service
public class PostService {
    private final PostRepository postRepository;

    public Iterable<PostDTO> findAll() {
        Long userId = getIdFromAuthentication();
        return postRepository.findTenLastPost().stream()
                .map((p) -> PostDTO.from(p, userId))
                .toList();
    }

    public PostDTO findById(Long id) {
        Long userId = getIdFromAuthentication();
        return PostDTO.from(postRepository.findById(id).orElseThrow(NotFoundException::new), userId);
    }

    public PostDTO create(PostDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = (User) authentication.getPrincipal();
        Post post = postDTO.toEntity(author);
        return PostDTO.from(postRepository.save(post), author.getId());
    }


    public PostDTO updateOrCreate(Long id, PostDTO postDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = (User) authentication.getPrincipal();

        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent() && !post.get().getUser().equals(author)) {
            throw new ForbiddenAccessException();
        }
        Post postToUpdate;
        if (post.isPresent()) {
            postToUpdate = post.get();
            postToUpdate.setContent(postDTO.getContent());
            postToUpdate.setTitle(postDTO.getTitle());
            return PostDTO.from(postRepository.save(postToUpdate), author.getId());
        }
        postToUpdate = new Post();
        postToUpdate.setContent(postDTO.getContent());
        postToUpdate.setTitle(postDTO.getTitle());
        postToUpdate.setUser(author);
        return PostDTO.from(postRepository.save(postToUpdate), author.getId());


    }

    public void delete(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = (User) authentication.getPrincipal();
        Post post = postRepository.findById(id).orElseThrow(NotFoundException::new);
        if (!post.getUser().equals(author)) {
            throw new ForbiddenAccessException();
        }
        postRepository.deleteById(id);
    }

    private Long getIdFromAuthentication(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User author = (User) authentication.getPrincipal();
        return author.getId();
    }
}
