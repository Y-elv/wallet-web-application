package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dto.ApiResponse;
import com.dto.UserDto;
import com.models.User;
import com.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

  
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@Valid @RequestBody UserDto userDto) {
        User user = userService.createUser(userDto);
        ApiResponse<User> response = new ApiResponse<>(true, "User registered successfully", user);
        return ResponseEntity.ok(response);
    }

    
    

}