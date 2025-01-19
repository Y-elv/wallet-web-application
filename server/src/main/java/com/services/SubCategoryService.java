package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.SubCategory;
import com.repositories.SubCategoryRepository;
import java.util.List;
import java.util.Optional;

@Service
public class SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public ResponseEntity<ApiResponse<SubCategory>> createSubCategory(SubCategory subCategory) {
        SubCategory savedSubCategory = subCategoryRepository.save(subCategory);
        ApiResponse<SubCategory> response = new ApiResponse<>(true, "SubCategory created successfully", savedSubCategory);
        return ResponseEntity.status(201).body(response);
    }

    public ResponseEntity<ApiResponse<List<SubCategory>>> getAllSubCategories() {
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        ApiResponse<List<SubCategory>> response = new ApiResponse<>(true, "SubCategories retrieved successfully", subCategories);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse<SubCategory>> getSubCategoryById(String id) {
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findById(id);
        if (subCategoryOptional.isPresent()) {
            ApiResponse<SubCategory> response = new ApiResponse<>(true, "SubCategory retrieved successfully", subCategoryOptional.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<SubCategory> response = new ApiResponse<>(false, "SubCategory not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<SubCategory>> updateSubCategory(String id, SubCategory subCategoryDetails) {
        Optional<SubCategory> subCategoryOptional = subCategoryRepository.findById(id);
        if (subCategoryOptional.isPresent()) {
            SubCategory subCategory = subCategoryOptional.get();
            subCategory.setCategoryId(subCategoryDetails.getCategoryId());
            subCategory.setName(subCategoryDetails.getName());
            SubCategory updatedSubCategory = subCategoryRepository.save(subCategory);
            ApiResponse<SubCategory> response = new ApiResponse<>(true, "SubCategory updated successfully", updatedSubCategory);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<SubCategory> response = new ApiResponse<>(false, "SubCategory not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Void>> deleteSubCategory(String id) {
        if (subCategoryRepository.existsById(id)) {
            subCategoryRepository.deleteById(id);
            ApiResponse<Void> response = new ApiResponse<>(true, "SubCategory deleted successfully", null);
            return ResponseEntity.noContent().build();
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "SubCategory not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }
}