package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.Transaction;
import com.models.Account;
import com.repositories.TransactionRepository;
import com.repositories.AccountRepository;
import com.enums.TransactionType;

import java.util.List;
import java.util.Date;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<ApiResponse<Transaction>> createTransaction(Transaction transaction) {
        Optional<Account> accountOptional = accountRepository.findById(transaction.getAccountId());
        if (!accountOptional.isPresent()) {
            ApiResponse<Transaction> response = new ApiResponse<>(false, "Account not found", null);
            return ResponseEntity.status(404).body(response);
        }

        Account account = accountOptional.get();

        if (transaction.getType() == TransactionType.EXPENSE) {
            if (account.getBalance() < transaction.getAmount()) {
                ApiResponse<Transaction> response = new ApiResponse<>(false, "Insufficient balance", null);
                return ResponseEntity.badRequest().body(response);
            }
            account.setBalance(account.getBalance() - transaction.getAmount());
        } else {
            account.setBalance(account.getBalance() + transaction.getAmount());
        }

        accountRepository.save(account);
        Transaction savedTransaction = transactionRepository.save(transaction);
        ApiResponse<Transaction> response = new ApiResponse<>(true, "Transaction created successfully", savedTransaction);
        return ResponseEntity.status(201).body(response);
    }

    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByAccountId(String accountId) {
        List<Transaction> transactions = transactionRepository.findByAccountId(accountId);
        ApiResponse<List<Transaction>> response = new ApiResponse<>(true, "Transactions retrieved successfully", transactions);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByUserId(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);
        ApiResponse<List<Transaction>> response = new ApiResponse<>(true, "Transactions retrieved successfully", transactions);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByAccountIdAndDateRange(String accountId, Date startDate, Date endDate) {
        List<Transaction> transactions = transactionRepository.findByAccountIdAndDateBetween(accountId, startDate, endDate);
        ApiResponse<List<Transaction>> response = new ApiResponse<>(true, "Transactions retrieved successfully", transactions);
        return ResponseEntity.ok(response);
    }
}