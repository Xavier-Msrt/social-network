package be.xaviermassart.socialnetwork.controller;

import be.xaviermassart.socialnetwork.dto.AuthenticationRequest;
import be.xaviermassart.socialnetwork.dto.AuthenticationResponse;
import be.xaviermassart.socialnetwork.dto.RefreshTokenAuthenticationRequest;
import be.xaviermassart.socialnetwork.exeception.BadAuthenticationCredentialException;
import be.xaviermassart.socialnetwork.service.AuthenticationService;
import be.xaviermassart.socialnetwork.validator.PasswordValidator;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody @Valid AuthenticationRequest request) {
        if(!PasswordValidator.validate(request.password())){
            throw new BadAuthenticationCredentialException();
        }
        return authenticationService.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody @Valid AuthenticationRequest request) {
        if(!PasswordValidator.validate(request.password())){
            throw new BadAuthenticationCredentialException();
        }
        return authenticationService.login(request);
    }

    @PostMapping("/refresh")
    public AuthenticationResponse refresh(@RequestBody @Valid RefreshTokenAuthenticationRequest request) {
        return authenticationService.refresh(request);
    }

    @PostMapping("/me")
    public ResponseEntity<Void> me() {
        return ResponseEntity.ok().build();
    }
}


