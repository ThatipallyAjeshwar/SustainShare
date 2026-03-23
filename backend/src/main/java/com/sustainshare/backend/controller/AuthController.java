package com.sustainshare.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sustainshare.backend.model.User;
import com.sustainshare.backend.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userService.isUsernameTaken(user.getUsername())) {
            return "Username already taken";
        }

        if (userService.isEmailTaken(user.getEmail())) {
            return "Email already in use";
        }

        userService.registerUser(user);
        return "Signup successful";
    }
}
