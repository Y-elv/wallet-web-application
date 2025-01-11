package com.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dto.UserDto;
import com.models.User;
import com.repositories.UserRepository;
import com.utils.PasswordUtil;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
import java.util.ArrayList;
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(),
                new ArrayList<>());
    }
    
    public User createUser(@Valid UserDto userDto) {
       
        User user = new User();
        
        user.setUsername(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPassword(PasswordUtil.hashPassword(userDto.getPassword()));
        
        // Save the user to the repository and return the saved user
        return userRepository.save(user);
    }
    
}
