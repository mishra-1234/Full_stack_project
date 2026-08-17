# 🛒 Multi-Vendor Marketplace & Order Orchestration System

An enterprise-grade, microservices-driven e-commerce platform built to solve complex order routing, splitting, and multi-vendor fulfillment challenges in modern digital marketplaces.

---

## 🎯 The Problem Solved

Marketplaces aggregating multiple independent sellers often struggle with:
* **Order Splitting:** Handling single-cart checkouts containing items from multiple distinct vendors.
* **Intelligent Routing:** Directing sub-orders to the respective vendors instantly without bottlenecks.
* **Fulfillment Tracking:** Maintaining end-to-end status visibility for buyers across fragmented vendor shipments.

This platform implements an automated **Order Orchestration Engine** using message queues to split, dispatch, and track orders reliably at scale.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | Angular, TypeScript, HTML5, CSS3 |
| **Backend** | Advanced Java, Spring Boot, Microservices Architecture |
| **Messaging & Events** | RabbitMQ |
| **Database** | MySQL |
| **Domain** | E-Commerce / Marketplace Management |

---

## ⚡ Key Architectural Features

* **Asynchronous Order Orchestration:** Uses **RabbitMQ** event-driven queues to decouple order placement, inventory reservations, and payment confirmations.
* **Multi-Seller Sub-Order Splitting:** Automatically decomposes unified shopping cart transactions into vendor-specific dispatch queues.
* **Microservices Ecosystem:** Independent services for user management, catalog, order processing, and vendor fulfillment.
* **Role-Based Portals:** Tailored interfaces in **Angular** for Customers, Vendors (dashboard/inventory management), and System Admins.
* **Reliable Persistence:** Normalized **MySQL** schema managing distributed transactional states across multi-vendor checkouts.
  
---

👥 Contributors
Dibyajeet Mishra (@mishra-1234)
Mrutyunjaya Sahoo (@Mrutyunjaya940)
Samar pratap singh (@Mr-Samar-9708)
Rosan Kumar Das (@KumarRosan7)

🌟 Show Your Support
Give a ⭐️ if this project helped or inspired your own full-stack journey!
