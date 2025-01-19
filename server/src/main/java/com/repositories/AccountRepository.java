package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Account;

import java.util.List;

public interface AccountRepository extends MongoRepository<Account, String> {
    List<Account> findByUserId(String userId);


}
