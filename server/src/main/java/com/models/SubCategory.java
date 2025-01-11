package com.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "subCategories")
public class SubCategory {
    @Id
    private String id;
    private String categoryId;
    private String name;
}
