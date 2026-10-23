package com.example.full_stack.service;



import com.example.full_stack.entity.Product;
import com.example.full_stack.entity.VendorShop;
import com.example.full_stack.repository.ProductRepository;
import com.example.full_stack.repository.VendorShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductService {


    private final ProductRepository productRepository;

    @Autowired
    private VendorShopRepository vendorShopRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public Product addProduct(Product product, Long vendorShopId) {

        VendorShop vendorShop = vendorShopRepository
                .findById(vendorShopId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Vendor Shop not found with id: " + vendorShopId
                        )
                );

        product.setVendorShop(vendorShop);

        return productRepository.save(product);
    }


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }


    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
