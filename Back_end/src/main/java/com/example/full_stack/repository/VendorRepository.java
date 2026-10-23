package com.example.full_stack.repository;

import com.example.full_stack.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendorRepository  extends JpaRepository<Vendor,Long> {


    Optional <Vendor> findByEmail(String name);
}
