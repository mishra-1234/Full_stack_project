# 🛒 Multi-Vendor Marketplace & Order Orchestration System

An enterprise-grade, microservices-driven e-commerce platform designed to handle order routing, splitting, and multi-vendor fulfillment.

## 🎯 The Problem Solved

Marketplaces with multiple independent sellers often face challenges such as:

- **Order Splitting:** Handling single-cart checkouts containing items from multiple vendors.
- **Intelligent Routing:** Directing sub-orders to the respective vendors.
- **Fulfillment Tracking:** Providing buyers with end-to-end visibility across vendor shipments.

This platform aims to implement an automated **Order Orchestration Engine** using message queues to split, dispatch, and track orders.

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| Frontend | Angular, TypeScript, HTML5, CSS3 |
| Backend | Java, Spring Boot, Microservices |
| Messaging & Events | RabbitMQ |
| Database | MySQL |
| Domain | E-Commerce / Marketplace Management |

## ⚡ Key Architectural Features

- **Asynchronous Order Orchestration:** Uses RabbitMQ event-driven messaging to decouple order placement and processing.
- **Multi-Seller Sub-Order Splitting:** Supports splitting shopping cart transactions into vendor-specific orders.
- **Microservices Ecosystem:** Services for user management, catalog, order processing, and vendor fulfillment.
- **Role-Based Portals:** Angular interfaces for customers, vendors, and administrators.
- **Reliable Persistence:** MySQL database for marketplace data and order states.

## 🚀 Frontend Development

The frontend was generated using Angular CLI version 21.2.19.

### Development Server

Navigate to the frontend project directory and run:

```bash
npm install
ng serve
```

Open http://localhost:4200/ in your browser. The application reloads automatically when source files change.

### Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

For a list of available schematics:

```bash
ng generate --help
```

### Building

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

### Running Unit Tests

```bash
ng test
```

The project uses Vitest as its test runner, according to the Angular-generated documentation.

### End-to-End Tests

```bash
ng e2e
```

Angular CLI does not include an end-to-end testing framework by default. Configure one if needed.

### Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Vitest Documentation](https://vitest.dev/)

## 👥 Contributors

- [Dibyajeet Mishra](https://github.com/mishra-1234)
- [Mrutyunjaya Sahoo](https://github.com/Mrutyunjaya940)
- [Samar Pratap Singh](https://github.com/Mr-Samar-9708)
- [Rosan Kumar Das](https://github.com/KumarRosan7)

## 🌟 Show Your Support

Give a ⭐ if this project helped or inspired your full-stack journey!
