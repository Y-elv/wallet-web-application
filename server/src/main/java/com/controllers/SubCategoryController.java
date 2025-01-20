package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dto.ApiResponse;
import com.services.SubCategoryService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/subcategories")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Void>> addSubCategory(@RequestBody Map<String, String> request) {
        String categoryId = request.get("categoryId");
        String name = request.get("name");
        return subCategoryService.addSubCategory(categoryId, name);
    }


}