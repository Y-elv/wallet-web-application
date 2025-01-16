package com.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.models.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    // Constructor to log the values
    public JwtTokenProvider() {
        // Values will be injected after the constructor is called
    }

    @PostConstruct
    public void init() {
        System.out.println("Secret Key: " + secretKey);
        System.out.println("Validity in milliseconds: " + validityInMilliseconds);
    }

    // Generate JWT token with user details
    public String generateToken(User user) {
        try {
            Map<String, Object> claims = new HashMap<>();
            claims.put("email", user.getEmail());
            claims.put("username", user.getUsername());
            claims.put("id", user.getId());

            Date now = new Date();
            Date validity = new Date(now.getTime() + validityInMilliseconds);

            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(user.getEmail())
                    .setIssuedAt(now)
                    .setExpiration(validity)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        } catch (Exception e) {
            System.err.println("Error generating token: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }


    // Validate JWT token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extract user detail from JWT token
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // Utility method to extract claims from a token
    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}