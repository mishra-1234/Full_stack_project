package com.example.full_stack.dto;

public class TicketResponse {
    private String message;
    private Long ticketId;

    public TicketResponse(String message, Long ticketId) {
        this.message = message;
        this.ticketId = ticketId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }
}
