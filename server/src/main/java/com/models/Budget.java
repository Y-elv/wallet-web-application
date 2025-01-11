package com.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "budgets")
public class Budget {
    @Id
    private String id;
    private String userId;
    private double amount;
    private Date startDate;
    private Date endDate;
}
