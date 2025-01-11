package com.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.models.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}