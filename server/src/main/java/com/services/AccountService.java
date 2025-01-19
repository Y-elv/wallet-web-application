package com.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.Account;
import com.repositories.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts(String userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        ApiResponse<List<Account>> response = new ApiResponse<>(true, "Accounts retrieved successfully", accounts);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<ApiResponse<Account>> getAccountById(String id) {
        Optional<Account> accountOptional = accountRepository.findById(id);
        if (accountOptional.isPresent()) {
            ApiResponse<Account> response = new ApiResponse<>(true, "Account retrieved successfully", accountOptional.get());
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Account> response = new ApiResponse<>(false, "Account not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Account>> createAccount(Account account) {
        Account savedAccount = accountRepository.save(account);
        ApiResponse<Account> response = new ApiResponse<>(true, "Account created successfully", savedAccount);
        return ResponseEntity.status(201).body(response);
    }

    public ResponseEntity<ApiResponse<Account>> updateAccount(String id, Account accountDetails) {
        Optional<Account> accountOptional = accountRepository.findById(id);
        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            account.setUserId(accountDetails.getUserId());
            account.setAccountName(accountDetails.getAccountName());
            account.setAccountType(accountDetails.getAccountType());
            account.setBalance(accountDetails.getBalance());
            Account updatedAccount = accountRepository.save(account);
            ApiResponse<Account> response = new ApiResponse<>(true, "Account updated successfully", updatedAccount);
            return ResponseEntity.ok(response);
        } else {
            ApiResponse<Account> response = new ApiResponse<>(false, "Account not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }

    public ResponseEntity<ApiResponse<Void>> deleteAccount(String id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            ApiResponse<Void> response = new ApiResponse<>(true, "Account deleted successfully", null);
            return ResponseEntity.noContent().build();
        } else {
            ApiResponse<Void> response = new ApiResponse<>(false, "Account not found", null);
            return ResponseEntity.status(404).body(response);
        }
    }
}