package com.models;

import org.springframework.data.annotation.Id;
import lombok.*;
import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Document;

import com.enums.TransactionType;


@Document(collection = "transactiona")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Transaction {
      @Id
    private String id;
    private String accountId;
    private Date date;
    private double amount;
    private TransactionType type; 
    private String subCategoryId;

}
