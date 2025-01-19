package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.Budget;
import com.repositories.BudgetRepository;

import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    public ResponseEntity<ApiResponse<Budget>> createBudget(Budget budget) {
        Budget savedBudget = budgetRepository.save(budget);
        ApiResponse<Budget> response = new ApiResponse<>(true, "Budget created successfully", savedBudget);
        return ResponseEntity.status(201).body(response);
    }

    public ResponseEntity<ApiResponse<Budget>> getBudgetByUserId(String userId) {
        Optional<Budget> budgetOptional = budgetRepository.findByUserId(userId);
        if (budgetOptional.isPresent()) {
            ApiResponse<Budget> response = new ApiResponse<>(true, "Budget retrieved successfully", budgetOptional.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Budget> response = new ApiResponse<>(false, "Budget not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Budget>> updateBudget(String userId, Budget budgetDetails) {
        Optional<Budget> budgetOptional = budgetRepository.findByUserId(userId);
        if (budgetOptional.isPresent()) {
            Budget budget = budgetOptional.get();
            budget.setAmount(budgetDetails.getAmount());
            Budget updatedBudget = budgetRepository.save(budget);
            ApiResponse<Budget> response = new ApiResponse<>(true, "Budget updated successfully", updatedBudget);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Budget> response = new ApiResponse<>(false, "Budget not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Void>> deleteBudget(String userId) {
        Optional<Budget> budgetOptional = budgetRepository.findByUserId(userId);
        if (budgetOptional.isPresent()) {
            Budget budget = budgetOptional.get();
            budgetRepository.delete(budget);
            ApiResponse<Void> response = new ApiResponse<>(true, "Budget deleted successfully", null);
            return ResponseEntity.noContent().build();
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "Budget not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }
}