package com.example.full_stack.repository;

import com.example.full_stack.entity.VendorShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorShopRepository extends JpaRepository<VendorShop, Long> {


    List<VendorShop> findByVendorId(Long vendorId);


    Optional<VendorShop> findFirstByVendorId(Long vendorId);
}