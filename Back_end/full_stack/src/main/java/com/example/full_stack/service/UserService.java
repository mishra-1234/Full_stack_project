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

    public LoginResponse loginUser(String email, String password) {

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return new LoginResponse("Invalid email or password", null);
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(password)) {
            return new LoginResponse("Invalid email or password", null);
        }

        return new LoginResponse("Login successful", user);
    }



    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
