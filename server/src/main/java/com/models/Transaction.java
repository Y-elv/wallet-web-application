package com.models;

import org.springframework.data.annotation.Id;
import lombok.*;
import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Document;

import com.enums.TransactionType;


@Document(collection = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Transaction {
      @Id
    private String id;
    private String accountId;
    private String userId;
    private Date date;
    private double amount;
    private TransactionType type; 
    private String subCategoryId;

    public String getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(String subCategoryId) {
        this.subCategoryId = subCategoryId;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
