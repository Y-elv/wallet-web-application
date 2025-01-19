package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Budget;

import java.util.Optional;

public interface BudgetRepository extends MongoRepository<Budget, String> {
    Optional<Budget> findByUserId(String userId);
}