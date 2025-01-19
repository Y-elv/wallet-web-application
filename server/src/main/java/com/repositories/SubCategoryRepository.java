// SubCategoryRepository.java
package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.SubCategory;

public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {
}