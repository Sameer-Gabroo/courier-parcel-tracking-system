# Courier Parcel Tracking System

## Project Overview

A full-stack courier parcel tracking system built using:

* **Frontend:** ReactJS
* **Backend:** ASP.NET Core 8 Web API
* **Database:** Microsoft SQL Server
* **Authentication:** JWT
* **ORM/Data Access:** Entity Framework Core
* **API Documentation:** Swagger/OpenAPI
* **API Testing:** Postman

---

# Development Plan

## Phase 1 — Database Design and Setup

### Tasks

* [x] Analyze project requirements
* [x] Design ERD
* [x] Identify normalized database entities
* [x] Create Users table
* [x] Create UserDetails table
* [x] Create Roles table
* [x] Create UserRoles table
* [x] Create Customers table
* [x] Create CustomerDetails table
* [x] Create Couriers table
* [x] Create CourierDetails table
* [x] Create Hubs table
* [x] Create Routes table
* [x] Create Parcels table
* [x] Create ParcelDetails table
* [x] Create StatusEvents table
* [x] Create AuditLogs table
* [ ] Add seed data
* [ ] Add required indexes
* [ ] Verify primary keys, foreign keys and constraints

### Database Structure

```text
Users
 ├── UserDetails
 └── UserRoles
       └── Roles

Customers
 └── CustomerDetails

Couriers
 └── CourierDetails

Hubs
 └── Routes

Parcels
 ├── ParcelDetails
 ├── StatusEvents
 └── DeliveryRiskEvaluations (to be created later)

Users
 └── AuditLogs
```

> **Note:** The `DeliveryRiskEvaluations` table will be created later after the main software functionality has been completed.

---

# Phase 2 — React Frontend Prototype

The initial frontend will be created before API development to understand the complete application flow and required API operations.

## Application Layout

* [ ] Create React/Vite project
* [ ] Create application layout
* [ ] Create Navbar
* [ ] Create Sidebar
* [ ] Configure React Router
* [ ] Create reusable UI components

## Authentication Screens

* [ ] Login page
* [ ] Basic login form
* [ ] Validation UI
* [ ] Unauthorized page

## Dashboard

* [ ] Dashboard layout
* [ ] Total parcels card
* [ ] Delivered parcels card
* [ ] In-transit parcels card
* [ ] Delayed/risk parcels card
* [ ] Parcel status chart
* [ ] Recent parcels section

## Parcel Management

* [ ] Parcel list
* [ ] Search
* [ ] Status filter
* [ ] Pagination UI
* [ ] Add parcel form
* [ ] Edit parcel form
* [ ] Parcel details page
* [ ] Parcel tracking timeline

## Customer Management

* [ ] Customer list
* [ ] Add customer
* [ ] Edit customer
* [ ] Customer details

## Courier Management

* [ ] Courier list
* [ ] Add courier
* [ ] Edit courier
* [ ] Courier details

## Hub Management

* [ ] Hub list
* [ ] Add hub
* [ ] Edit hub
* [ ] Hub details

## Route Management

* [ ] Route list
* [ ] Add route
* [ ] Edit route
* [ ] Route details

## User and Role Management

* [ ] User list
* [ ] Add user
* [ ] Edit user
* [ ] Role management
* [ ] Assign roles to users

---

# Phase 3 — API Planning

After the basic React prototype is complete, identify the data and operations required by each screen.

## Authentication

```text
POST /api/auth/login
```

## Dashboard

```text
GET /api/dashboard/summary
```

## Parcels

```text
GET    /api/parcels
GET    /api/parcels/{id}
POST   /api/parcels
PUT    /api/parcels/{id}
DELETE /api/parcels/{id}
```

## Parcel Tracking

```text
GET /api/parcels/{id}/tracking
```

## Customers

```text
GET    /api/customers
GET    /api/customers/{id}
POST   /api/customers
PUT    /api/customers/{id}
DELETE /api/customers/{id}
```

## Couriers

```text
GET    /api/couriers
GET    /api/couriers/{id}
POST   /api/couriers
PUT    /api/couriers/{id}
DELETE /api/couriers/{id}
```

## Hubs

```text
GET    /api/hubs
GET    /api/hubs/{id}
POST   /api/hubs
PUT    /api/hubs/{id}
DELETE /api/hubs/{id}
```

## Routes

```text
GET    /api/routes
GET    /api/routes/{id}
POST   /api/routes
PUT    /api/routes/{id}
DELETE /api/routes/{id}
```

## Users and Roles

```text
GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}

GET    /api/roles
POST   /api/roles
PUT    /api/roles/{id}

POST   /api/users/{id}/roles
```

---

# Phase 4 — ASP.NET Core Backend

## Project Setup

* [ ] Create ASP.NET Core 8 Web API project
* [ ] Configure SQL Server connection
* [ ] Configure Entity Framework Core
* [ ] Create entity models
* [ ] Create DbContext
* [ ] Configure relationships
* [ ] Configure migrations
* [ ] Verify database connection

## Authentication and Authorization

* [ ] Implement password hashing
* [ ] Implement login
* [ ] Generate JWT
* [ ] Configure JWT authentication
* [ ] Configure role-based authorization
* [ ] Protect API endpoints

## Core APIs

* [ ] Customer APIs
* [ ] Courier APIs
* [ ] Hub APIs
* [ ] Route APIs
* [ ] Parcel APIs
* [ ] Parcel tracking APIs
* [ ] User APIs
* [ ] Role APIs

## Backend Quality

* [ ] Service layer
* [ ] Repository/data-access layer
* [ ] DTOs
* [ ] Validation
* [ ] Global exception handling
* [ ] Structured logging
* [ ] Consistent API responses
* [ ] Swagger/OpenAPI documentation

---

# Phase 5 — Connect React with API

* [ ] Configure API base URL
* [ ] Create API service layer
* [ ] Connect login page
* [ ] Store and send JWT
* [ ] Connect dashboard
* [ ] Connect parcel APIs
* [ ] Connect customer APIs
* [ ] Connect courier APIs
* [ ] Connect hub APIs
* [ ] Connect route APIs
* [ ] Connect user/role APIs
* [ ] Handle loading states
* [ ] Handle API errors
* [ ] Add success/error toast notifications

---

# Phase 6 — Business Rules and Validation

* [ ] Required-field validation
* [ ] Duplicate-record prevention
* [ ] Parcel status validation
* [ ] Soft-delete implementation
* [ ] Active/inactive handling
* [ ] Audit fields
* [ ] Audit logging
* [ ] Authorization checks
* [ ] Server-side pagination
* [ ] Search
* [ ] Sorting
* [ ] Filtering

---

# Phase 9 — Finalization

* [ ] Fix bugs
* [ ] Improve responsive UI
* [ ] Add loading indicators
* [ ] Add empty states
* [ ] Add confirmation dialogs
* [ ] Review API security
* [ ] Review database relationships
* [ ] Update README
* [ ] Add setup instructions
* [ ] Add seed credentials
* [ ] Create Postman collection
* [ ] Verify Swagger
* [ ] Add screenshots
* [ ] Prepare project demonstration
* [ ] Prepare code walkthrough




