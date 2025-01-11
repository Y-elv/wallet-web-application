package com.config;

import com.services.JwtService;
import com.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.context.annotation.Lazy;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String REQUEST_ID_HEADER = "X-Request-ID";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final JwtService jwtService;
    private final UserService userService;
    private final SecurityProperties securityProperties;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            @Lazy UserService userService,
            SecurityProperties securityProperties) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.securityProperties = securityProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String requestId = UUID.randomUUID().toString();
        response.setHeader(REQUEST_ID_HEADER, requestId);

        try {
            String header = request.getHeader("Authorization");
            if (header == null || !header.startsWith(BEARER_PREFIX)) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = header.substring(BEARER_PREFIX.length());
            String username = jwtService.extractUsername(token);
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userService.loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            log.error("Could not set user authentication in security context", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            Map<String, String> errorDetails = new HashMap<>();
            errorDetails.put("message", "Invalid or expired JWT token");
            errorDetails.put("requestId", requestId);
            objectMapper.writeValue(response.getWriter(), errorDetails);
            return;
        }

        filterChain.doFilter(request, response);
    }
}