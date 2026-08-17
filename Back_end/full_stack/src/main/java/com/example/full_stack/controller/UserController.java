package com.example.full_stack.controller;

import com.example.full_stack.dto.LoginRequest;
import com.example.full_stack.dto.LoginResponse;
import com.example.full_stack.dto.ResetPasswordRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.full_stack.entity.User;
import com.example.full_stack.service.UserService;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create User
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {

        Optional<User> userOptional = userService.findByEmail(request.getEmail());

        // Case 1: Email not found — user is not registered
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse("USER_NOT_FOUND", null));
        }

        User user = userOptional.get();

        // Case 2: Password mismatch
        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse("WRONG_PASSWORD", null));
        }

        // Case 3: Success
        return ResponseEntity.ok(new LoginResponse("Login successful", user));
    }

    // Reset Password
    @PutMapping("/reset-password")
    public ResponseEntity<LoginResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean success = userService.resetPassword(request.getEmail(), request.getNewPassword());

        if (!success) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new LoginResponse("USER_NOT_FOUND", null));
        }

        return ResponseEntity.ok(new LoginResponse("Password reset successful", null));
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get User By ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }





    // Login User

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
    // Update User
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {

        User existingUser = userService.getUserById(id);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());

        return userService.saveUser(existingUser);
    }



}
