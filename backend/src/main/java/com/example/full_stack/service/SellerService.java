package com.example.full_stack.service;

import com.example.full_stack.dto.SellerRegistrationRequest;
import com.example.full_stack.entity.Role;
import com.example.full_stack.entity.Seller;
import com.example.full_stack.entity.User;
import com.example.full_stack.repository.SellerRepository;
import com.example.full_stack.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {

    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;

    public SellerService(SellerRepository sellerRepository, UserRepository userRepository) {
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Seller registerSeller(SellerRegistrationRequest request) {
        if (sellerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Seller with email " + request.getEmail() + " is already registered.");
        }

        Seller seller = new Seller(
                request.getFullName(),
                request.getEmail(),
                request.getPhone(),
                request.getStoreName(),
                request.getGstNumber(),
                request.getCategory(),
                request.getCity(),
                request.getPassword(),
                Role.VENDOR,
                "PENDING_VERIFICATION"
        );

        Seller savedSeller = sellerRepository.save(seller);

        // Also ensure a corresponding User entry exists with role VENDOR so they can log in
        if (userRepository.findByEmail(request.getEmail()).isEmpty()) {
            User user = new User(
                    request.getFullName(),
                    request.getEmail(),
                    request.getPassword(),
                    Role.VENDOR
            );
            userRepository.save(user);
        }

        return savedSeller;
    }

    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    public Optional<Seller> getSellerById(Long id) {
        return sellerRepository.findById(id);
    }
}
