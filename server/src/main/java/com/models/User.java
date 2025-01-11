package com.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

import java.util.Date;

@Document(collection = "users") // Specifies the MongoDB collection name
@Data 
@NoArgsConstructor
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
   


}