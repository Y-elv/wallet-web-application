package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.Category;
import com.repositories.CategoryRepository;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public ResponseEntity<ApiResponse<Category>> createCategory(Category category) {
        Category savedCategory = categoryRepository.save(category);
        ApiResponse<Category> response = new ApiResponse<>(true, "Category created successfully", savedCategory);
        return ResponseEntity.status(201).body(response);
    }

    public ResponseEntity<ApiResponse<List<Category>>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        ApiResponse<List<Category>> response = new ApiResponse<>(true, "Categories retrieved successfully", categories);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse<Category>> getCategoryById(String id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            ApiResponse<Category> response = new ApiResponse<>(true, "Category retrieved successfully", categoryOptional.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Category> response = new ApiResponse<>(false, "Category not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Category>> updateCategory(String id, Category categoryDetails) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(categoryDetails.getName());
            category.setSubCategories(categoryDetails.getSubCategories());
            Category updatedCategory = categoryRepository.save(category);
            ApiResponse<Category> response = new ApiResponse<>(true, "Category updated successfully", updatedCategory);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Category> response = new ApiResponse<>(false, "Category not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Void>> deleteCategory(String id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            ApiResponse<Void> response = new ApiResponse<>(true, "Category deleted successfully", null);
            return ResponseEntity.noContent().build();
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "Category not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }
}