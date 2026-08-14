package com.example.full_stack.dto;

import com.example.full_stack.entity.User;

public class LoginResponse {


    private String message;
    private User user;

    public LoginResponse() {
    }

    public LoginResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
