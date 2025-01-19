package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dto.ApiResponse;
import com.models.Budget;
import com.services.BudgetService;

@RestController
@RequestMapping("/api/v1/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public ResponseEntity<ApiResponse<Budget>> createBudget(@RequestBody Budget budget) {
        return budgetService.createBudget(budget);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<Budget>> getBudgetByUserId(@PathVariable String userId) {
        return budgetService.getBudgetByUserId(userId);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<Budget>> updateBudget(@PathVariable String userId, @RequestBody Budget budgetDetails) {
        return budgetService.updateBudget(userId, budgetDetails);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteBudget(@PathVariable String userId) {
        return budgetService.deleteBudget(userId);
    }
}
