package com.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

}
