package com.services;

import com.models.Budget;
import com.models.User;
import com.repositories.UserRepository;
import com.repositories.BudgetRepository;
import com.utils.PdfReportUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.dto.ApiResponse;
import com.models.Transaction;
import com.models.Account;
import com.repositories.TransactionRepository;
import com.repositories.AccountRepository;
import com.enums.TransactionType;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private JavaMailSender mailSender;

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

        // Check if the global budget is exceeded
        checkAndNotifyBudget(transaction.getUserId());

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

    private void checkAndNotifyBudget(String userId) {
        // Retrieve the global budget for the user
        Optional<Budget> budgetOptional = budgetRepository.findByUserId(userId);
        if (!budgetOptional.isPresent()) {
            return;
        }

        Budget budget = budgetOptional.get();

        // Calculate the total spent across all accounts
        double totalSpent = transactionRepository.sumAmountByUserId(userId);

        double notExceed = budget.getNotExceed();

        if (totalSpent > notExceed) {
            sendBudgetExceedEmail(userId,notExceed , totalSpent);
        }
    }

    private void sendBudgetExceedEmail(String userId,double notExceed, double totalSpent) {
        // Fetch the user details from the UserRepository
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            // Handle the case where the user is not found
            System.out.println("User not found: " + userId);
            return;
        }

        User user = userOptional.get();
        String username = user.getUsername();
        String userEmail = user.getEmail();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setSubject("Budget Exceeded Notification");
        message.setText("Dear " + username + ",\n\nYour total spending has exceeded your budget of " + notExceed+ ". Total spent: " + totalSpent + ".");
        System.out.println("Sending email to: " + userEmail);
        System.out.println("Subject: " + message.getSubject());
        System.out.println("Body: " + message.getText());
        mailSender.send(message);
    }

    public Map<String, Double> getTransactionSummary(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        // Summarize transactions by type
        Map<String, Double> summary = transactions.stream()
                .collect(Collectors.groupingBy(
                        transaction -> transaction.getType().toString(),
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        return summary;
    }

    public ByteArrayInputStream generateTransactionsReport(String userId, Date startDate, Date endDate) {
        List<Transaction> transactions = transactionRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        return PdfReportUtil.generateTransactionsReport(transactions);
    }
}