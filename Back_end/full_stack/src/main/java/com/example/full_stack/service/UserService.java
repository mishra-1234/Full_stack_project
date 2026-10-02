package com.example.full_stack.service;

import com.example.full_stack.dto.LoginResponse;
import com.example.full_stack.repository.UserRepository;
import com.example.full_stack.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {


    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    public User saveUser(User user) {

        return userRepository.save(user);
    }



    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public Optional<User> findByEmailOrPhone(String identifier) {
        return userRepository.findByEmailOrPhone(identifier);
    }

    public boolean resetPassword(String email, String newPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return false;
        }
        User user = userOptional.get();
        user.setPassword(newPassword);
        userRepository.save(user);
        return true;
    }

    public LoginResponse loginUser(String identifier, String password) {

        Optional<User> userOptional = userRepository.findByEmailOrPhone(identifier);

        if (userOptional.isEmpty()) {
            return new LoginResponse("Invalid email/phone or password", null);
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(password)) {
            return new LoginResponse("Invalid email/phone or password", null);
        }

        return new LoginResponse("Login successful", user);
    }



    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
