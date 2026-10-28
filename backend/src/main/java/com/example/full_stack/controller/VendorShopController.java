package com.example.full_stack.controller;

import com.example.full_stack.entity.Vendor;
import com.example.full_stack.entity.VendorShop;
import com.example.full_stack.repository.VendorRepository;
import com.example.full_stack.repository.VendorShopRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/shops")
public class VendorShopController {

    private final VendorShopRepository shopRepository;
    private final VendorRepository vendorRepository;

    public VendorShopController(
            VendorShopRepository shopRepository,
            VendorRepository vendorRepository) {

        this.shopRepository = shopRepository;
        this.vendorRepository = vendorRepository;
    }


    @GetMapping
    public ResponseEntity<List<VendorShop>> getAllShops() {
        return ResponseEntity.ok(shopRepository.findAll());
    }


    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<VendorShop>> getShopsByVendor(
            @PathVariable Long vendorId) {

        return ResponseEntity.ok(
                shopRepository.findByVendorId(vendorId)
        );
    }


    @PostMapping("/vendor/{vendorId}")
    public ResponseEntity<?> saveShop(
            @PathVariable Long vendorId,
            @RequestBody VendorShop shop) {

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vendor not found with id: " + vendorId
                        )
                );

        shop.setVendor(vendor);

        return ResponseEntity.ok(
                shopRepository.save(shop)
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {

        shopRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}