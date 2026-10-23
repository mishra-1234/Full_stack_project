package com.example.full_stack.entity;


import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double price;

    private String imageUrl;


    @ManyToOne
    @JoinColumn(name = "vendor_shop_id", nullable = false)
    private VendorShop vendorShop;

    public Product() {
    }

    public Product(String productName, String description,
                   Double price, String imageUrl,
                   VendorShop vendorShop) {
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.vendorShop = vendorShop;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public VendorShop getVendorShop() {
        return vendorShop;
    }

    public void setVendorShop(VendorShop vendorShop) {
        this.vendorShop = vendorShop;
    }
}
