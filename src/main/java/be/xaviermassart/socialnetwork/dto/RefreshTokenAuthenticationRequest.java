package be.xaviermassart.socialnetwork.dto;

import jakarta.validation.constraints.NotNull;

public record RefreshTokenAuthenticationRequest(
        @NotNull String refreshToken
) { }
