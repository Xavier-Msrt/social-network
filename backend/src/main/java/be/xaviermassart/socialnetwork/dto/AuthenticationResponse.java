package be.xaviermassart.socialnetwork.dto;

import jakarta.validation.constraints.NotNull;

public record AuthenticationResponse(
        @NotNull String accessToken,
        @NotNull String refreshToken
) {
}
