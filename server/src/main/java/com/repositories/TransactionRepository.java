package com.repositories;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Transaction;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByAccountId(String accountId);
    List<Transaction> findByAccountIdAndDateBetween(String accountId, Date startDate, Date endDate);
    List<Transaction> findByUserId(String userId);

    @Aggregation(pipeline = {
            "{ '$match': { 'userId': ?0 } }",
            "{ '$group': { '_id': null, 'totalSpent': { '$sum': '$amount' } } }"
    })
    double sumAmountByUserId(String userId);

    List<Transaction> findByUserIdAndDateBetween(String userId, Date startDate, Date endDate);
}