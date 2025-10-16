package be.xaviermassart.socialnetwork.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record AuthenticationRequest(
    @NotBlank @Length(min = 4, max = 15) String username,
    @NotBlank String password
) {}
