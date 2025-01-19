// CategoryRepository.java
package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
}