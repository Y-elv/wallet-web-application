package com.controllers;

import com.models.Account;
import com.services.AccountService;
import com.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<List<Account>>> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Account>> getAccountById(@PathVariable String id) {
        return accountService.getAccountById(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Account>> createAccount(@Valid @RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Account>> updateAccount(@PathVariable String id, @Valid @RequestBody Account accountDetails) {
        return accountService.updateAccount(id, accountDetails);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable String id) {
        return accountService.deleteAccount(id);
    }
}