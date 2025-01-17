package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.Account;

public interface AccountRepository extends MongoRepository<Account, String> {
    // Additional query methods can be defined here if needed
}
