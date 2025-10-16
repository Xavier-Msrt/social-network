package be.xaviermassart.socialnetwork.service;

import be.xaviermassart.socialnetwork.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.MacAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final long ACCESS_TOKEN_EXPIRATION = 1000L * 60 * 15; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRATION = 1000L * 60 * 60 * 24 * 7; // 7 days
    private static final MacAlgorithm ALGORITHM = Jwts.SIG.HS512;
    @Value("${jwt.secret.access}")
    private String secretAccess;
    @Value("${jwt.secret.refresh}")
    private String secretRefresh;
    @Value("${jwt.issuer}")
    private String issuer;
    @Value("${jwt.audience}")
    private String audience;

    private SecretKey secretAccessKey;
    private SecretKey secretRefreshKey;

    @PostConstruct
    void initKey() {
        this.secretAccessKey = Keys.hmacShaKeyFor(secretAccess.getBytes(StandardCharsets.UTF_8));
        this.secretRefreshKey = Keys.hmacShaKeyFor(secretRefresh.getBytes(StandardCharsets.UTF_8));
    }

    public String generateRefreshToken(Long userId) {
        return Jwts.builder()
                .subject(userId.toString())
                .issuer(issuer)
                .audience().add(audience).and()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(secretRefreshKey, ALGORITHM)
                .compact();
    }

    public boolean isRefreshTokenValid(String token, User user) {
        final String userId = extractUserIdFromRefresh(token);
        return userId.equals(user.getId().toString()) && !isExpired(token, false);
    }

    public String generateToken(Long userId) {
        return Jwts.builder()
                .subject(userId.toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(secretAccessKey, ALGORITHM)
                .compact();
    }

    public String extractUserId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractUserIdFromRefresh(String token) {
        return extractClaim(token, Claims::getSubject, false);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        if (!(userDetails instanceof User user)) {
            return false;
        }
        final String userId = extractUserId(token);
        return userId.equals(user.getId().toString()) && !isExpired(token, true);
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token, true);
        return resolver.apply(claims);
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver, Boolean isAccessKey) {
        Claims claims = extractAllClaims(token, isAccessKey);
        return resolver.apply(claims);
    }

    private boolean isExpired(String token, Boolean isAccessKey) {
        Date exp = extractExpiration(token, isAccessKey);
        return exp.before(new Date());
    }

    private Date extractExpiration(String token, Boolean isAccessKey) {
        return extractClaim(token, Claims::getExpiration, isAccessKey);
    }

    private Claims extractAllClaims(String token, Boolean isAccessKey) {
        SecretKey key = isAccessKey ? secretAccessKey : secretRefreshKey;
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
