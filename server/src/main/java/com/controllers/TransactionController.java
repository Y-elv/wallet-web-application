package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dto.ApiResponse;
import com.models.Transaction;
import com.services.TransactionService;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Transaction>> createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByAccountId(@PathVariable String accountId) {
        return transactionService.getTransactionsByAccountId(accountId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByUserId(@PathVariable String userId) {
        return transactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/{accountId}/date-range")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByAccountIdAndDateRange(
            @PathVariable String accountId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return transactionService.getTransactionsByAccountIdAndDateRange(accountId, startDate, endDate);
    }

    @GetMapping("/summary/{userId}")
    public ResponseEntity<Map<String, Double>> getTransactionSummary(@PathVariable String userId) {
        Map<String, Double> summary = transactionService.getTransactionSummary(userId);
        return ResponseEntity.ok(summary);
    }

    @GetMapping(value = "/report", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> generateReport(
            @RequestParam String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        ByteArrayInputStream bis = transactionService.generateTransactionsReport(userId, startDate, endDate);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=transactions_report.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(bis.readAllBytes());
    }
}