package com.example.full_stack.repository;

import com.example.full_stack.entity.SupportTicket;
import com.example.full_stack.entity.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByEmail(String email);
    List<SupportTicket> findByStatus(TicketStatus status);
    List<SupportTicket> findAllByOrderByCreatedAtDesc();
}
