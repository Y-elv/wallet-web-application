package com.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.enums.AccountType;

import lombok.*;

@Document(collection = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Account {
    @Id
    private String id;
    private String userId;
    private AccountType accountType; 
    private String accountName;
    private double balance;
    // private List<Transaction> transactions;

}