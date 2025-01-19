package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dto.ApiResponse;
import com.models.SubCategory;
import com.services.SubCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subcategories")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<SubCategory>> createSubCategory(@RequestBody SubCategory subCategory) {
        return subCategoryService.createSubCategory(subCategory);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SubCategory>>> getAllSubCategories() {
        return subCategoryService.getAllSubCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SubCategory>> getSubCategoryById(@PathVariable String id) {
        return subCategoryService.getSubCategoryById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SubCategory>> updateSubCategory(@PathVariable String id, @RequestBody SubCategory subCategoryDetails) {
        return subCategoryService.updateSubCategory(id, subCategoryDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubCategory(@PathVariable String id) {
        return subCategoryService.deleteSubCategory(id);
    }
}