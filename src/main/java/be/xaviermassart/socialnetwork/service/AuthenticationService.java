package be.xaviermassart.socialnetwork.service;

import be.xaviermassart.socialnetwork.dto.AuthenticationRequest;
import be.xaviermassart.socialnetwork.dto.AuthenticationResponse;
import be.xaviermassart.socialnetwork.dto.RefreshTokenAuthenticationRequest;
import be.xaviermassart.socialnetwork.entity.User;
import be.xaviermassart.socialnetwork.exeception.BadAuthenticationCredentialException;
import be.xaviermassart.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthenticationResponse register(AuthenticationRequest request) {
        if (userRepository.existsUserByUsername(request.username())) {
            throw new BadAuthenticationCredentialException();
        }

        String encodedPassword = passwordEncoder.encode(request.password());
        User user = User.builder()
                .username(request.username())
                .password(encodedPassword)
                .build();

        User savedUser = userRepository.save(user);
        String accessToken = jwtService.generateToken(savedUser.getId());
        String refreshToken = jwtService.generateRefreshToken(savedUser.getId());

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
            if (!auth.isAuthenticated()) {
                throw new BadAuthenticationCredentialException();
            }
        } catch (Exception e) {
            throw new BadAuthenticationCredentialException();
        }

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(BadAuthenticationCredentialException::new);

        Long userId = user.getId();
        String accessToken = jwtService.generateToken(userId);
        String refreshToken = jwtService.generateRefreshToken(userId);

        return new AuthenticationResponse(accessToken, refreshToken);
    }

    public AuthenticationResponse refresh(RefreshTokenAuthenticationRequest request) {
        Long userId = Long.valueOf(jwtService.extractUserIdFromRefresh(request.refreshToken()));
        Optional<User> user = userRepository.findUserById(userId);
        if(user.isEmpty()){
            throw new BadAuthenticationCredentialException();
        }

        if(!jwtService.isRefreshTokenValid(request.refreshToken(), user.get())){
            throw new BadAuthenticationCredentialException();
        }

        String accessToken = jwtService.generateToken(userId);
        String refreshToken = jwtService.generateRefreshToken(userId);

        return new AuthenticationResponse(accessToken, refreshToken);
    }
}
