package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Transaction;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByAccountId(String accountId);
    List<Transaction> findByAccountIdAndDateBetween(String accountId, Date startDate, Date endDate);
    List<Transaction> findByUserId(String userId);
}