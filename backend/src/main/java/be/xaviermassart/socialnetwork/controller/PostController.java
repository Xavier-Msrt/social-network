package be.xaviermassart.socialnetwork.controller;

import be.xaviermassart.socialnetwork.dto.PostDTO;
import be.xaviermassart.socialnetwork.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    @GetMapping()
    public Iterable<PostDTO> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public PostDTO findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping()
    public PostDTO create(@RequestBody @Valid PostDTO postDTO) {
        return postService.create(postDTO);
    }

    @PutMapping("/{id}")
    public PostDTO updateOrCreate(@PathVariable Long id, @RequestBody @Valid PostDTO postDTO) {
        if(!postDTO.getId().equals(id)){
            throw new IllegalArgumentException("The id need to be the same as the path variable");
        }
        return postService.updateOrCreate(id, postDTO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }
}
