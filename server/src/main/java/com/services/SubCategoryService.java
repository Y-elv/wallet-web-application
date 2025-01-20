package com.services;

import com.models.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.repositories.CategoryRepository;
import com.dto.ApiResponse;

import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public ResponseEntity<ApiResponse<Void>> addSubCategory(String categoryId, String subCategoryName) {
        // Check if the category exists
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();

            // Add the subcategory to the list
            if (category.getSubCategories() != null && !category.getSubCategories().contains(subCategoryName)) {
                category.getSubCategories().add(subCategoryName);
            } else if (category.getSubCategories() == null) {
                category.setSubCategories(List.of(subCategoryName));
            }

            // Save the updated category
            categoryRepository.save(category);

            ApiResponse<Void> response = new ApiResponse<>(true, "Subcategory added successfully",null);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "Category not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

}
