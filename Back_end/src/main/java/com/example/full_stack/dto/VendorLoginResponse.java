package com.example.full_stack.dto;




import com.example.full_stack.entity.Vendor;
public class VendorLoginResponse {

    private String message;
    private Vendor vendor;

    public VendorLoginResponse() {}

    public VendorLoginResponse(String message, Vendor vendor) {
        this.message = message;
        this.vendor = vendor;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }
}
