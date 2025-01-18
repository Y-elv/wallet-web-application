package com.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    @NotBlank(message = "userName is mandatory")
    @Size(min = 2, message = "userName should have at least 2 characters")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password should have at least 6 characters")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character")
    private String password;

    public @NotBlank(message = "Password is mandatory") @Size(min = 6, message = "Password should have at least 6 characters") @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is mandatory") @Size(min = 6, message = "Password should have at least 6 characters") @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$", message = "Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Email is mandatory") @Email(message = "Email should be valid") String getEmail() {
        return email;
    }

    public UserDto(String password, String email, String username) {
        this.password = password;
        this.email = email;
        this.username = username;
    }

    public void setEmail(@NotBlank(message = "Email is mandatory") @Email(message = "Email should be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "userName is mandatory") @Size(min = 2, message = "userName should have at least 2 characters") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "userName is mandatory") @Size(min = 2, message = "userName should have at least 2 characters") String username) {
        this.username = username;
    }
}