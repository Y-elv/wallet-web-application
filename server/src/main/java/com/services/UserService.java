package com.services;

import com.dto.ApiResponse;
import com.dto.LoginDto;
import com.dto.LoginResponse;
import com.dto.UserDto;
import com.models.User;
import com.repositories.UserRepository;
import com.utils.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, @Lazy AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    // Method to create a new user
    public ResponseEntity<ApiResponse<User>> createUser(@Valid UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setCreatedAt(new Date());

        User savedUser = userRepository.save(user);

        ApiResponse<User> response = new ApiResponse<>(true, "User registered successfully", savedUser);
        return ResponseEntity.ok(response);
    }

    // Method to authenticate user and generate JWT token
    public ResponseEntity<ApiResponse<LoginResponse>> loginUser(@Valid LoginDto loginDto) {
        // Log the incoming data from the client
        System.out.println("Login Request Received:");
        System.out.println("Email: " + loginDto.getEmail());
        System.out.println("Password: " + loginDto.getPassword());

        // Step 1: Authenticate the user
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
            System.out.println("Authentication successful!");
            System.out.println("Authenticated user details: " + authentication.getPrincipal());
        } catch (Exception e) {
            System.err.println("Authentication failed: " + e.getMessage());
            throw e; // Optionally handle this exception more gracefully
        }

        // Step 2: Set the authentication in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Step 3: Retrieve the user from the database
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> {
            System.err.println("User not found in database for email: " + loginDto.getEmail());
            return new RuntimeException("User not found");
        });

        System.out.println("User found in database:");
        System.out.println("Username: " + user.getUsername());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Encoded Password: " + user.getPassword());

        // Step 4: Generate the JWT token
        String token = jwtTokenProvider.generateToken(user);
        System.out.println("Generated JWT token: " + token);

        // Step 5: Build the response
        LoginResponse loginResponse = new LoginResponse(token, user);
        ApiResponse<LoginResponse> response = new ApiResponse<>(true, "Login successful", loginResponse);

        System.out.println("Login response ready to be sent.");
        return ResponseEntity.ok(response);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    // This is a placeholder method. Implement the actual logic to fetch user name.
    public String getUserNameById(String userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    return user.getUsername();
    }
}