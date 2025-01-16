package com.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

import java.util.Date;

@Document(collection = "users") // Specifies the MongoDB collection name
@Data
@AllArgsConstructor
@Getter
@Setter

public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private Date createdAt;


    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(
            @NotBlank(message = "userName is mandatory")
            @Size(min = 2, message = "userName should have at least 2 characters")
            String username) {
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            @NotBlank(message = "Email is mandatory")
            @Email(message = "Email should be valid")
            String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            @NotBlank(message = "Password is mandatory")
            @Size(min = 6, message = "Password should have at least 6 characters")
            @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character")
            String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}