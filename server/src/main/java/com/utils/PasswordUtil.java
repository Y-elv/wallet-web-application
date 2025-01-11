package com.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Method to hash a password
    public static String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    // Method to verify a password
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}