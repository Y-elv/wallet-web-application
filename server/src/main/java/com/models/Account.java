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

    public Account(double balance, String accountName, AccountType accountType, String userId, String id) {
        this.balance = balance;
        this.accountName = accountName;
        this.accountType = accountType;
        this.userId = userId;
        this.id = id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    // private List<Transaction> transactions;

}