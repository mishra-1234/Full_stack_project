package com.example.full_stack.service;

import com.example.full_stack.dto.TicketRequest;
import com.example.full_stack.entity.SupportTicket;
import com.example.full_stack.entity.TicketStatus;
import com.example.full_stack.repository.SupportTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService {

    private final SupportTicketRepository supportTicketRepository;

    @Autowired
    public SupportTicketService(SupportTicketRepository supportTicketRepository) {
        this.supportTicketRepository = supportTicketRepository;
    }

    public SupportTicket createTicket(TicketRequest request) {
        SupportTicket ticket = new SupportTicket();
        ticket.setName(request.getName());
        ticket.setEmail(request.getEmail());
        ticket.setOrderId(request.getOrderId());
        ticket.setIssueType(request.getIssueType());
        ticket.setMessage(request.getMessage());
        return supportTicketRepository.save(ticket);
    }

    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAllByOrderByCreatedAtDesc();
    }

    public SupportTicket getTicketById(Long id) {
        Optional<SupportTicket> ticket = supportTicketRepository.findById(id);
        return ticket.orElse(null);
    }

    public List<SupportTicket> getTicketsByEmail(String email) {
        return supportTicketRepository.findByEmail(email);
    }

    public SupportTicket updateTicketStatus(Long id, TicketStatus status) {
        Optional<SupportTicket> ticketOpt = supportTicketRepository.findById(id);
        if (ticketOpt.isPresent()) {
            SupportTicket ticket = ticketOpt.get();
            ticket.setStatus(status);
            return supportTicketRepository.save(ticket);
        }
        return null;
    }

    public List<SupportTicket> getTicketsByStatus(TicketStatus status) {
        return supportTicketRepository.findByStatus(status);
    }
}
