# Project Implementation Plan

## 1. Project Overview

I have gone through the project requirements and understood the main features and technologies that need to be used for the Courier Parcel Tracking System.

**Technology Stack:**

* Backend: ASP.NET Core 8 Web API
* Frontend: ReactJS
* Database: Microsoft SQL Server
* Authentication: JWT
* API Documentation: Swagger/OpenAPI
* API Testing: Postman
* Data Access: Entity Framework Core

## 2. Objective

After going through the documentation, I understand that the system should provide the following features:

1. User login with JWT-based authentication.
2. Role-based authorization.
3. Customer, courier, hub, and route management.
4. Parcel booking and tracking-number generation.
5. Parcel status and hub-event tracking.
6. Customer parcel tracking and history.
7. Dashboard with summary information and at least one chart.
8. Search, sorting, filtering, and server-side pagination.
9. Frontend and backend validation.
10. Soft delete, active/inactive status, audit fields, and audit logging.
11. Global exception handling and structured application logging.
12. Swagger/OpenAPI documentation and a Postman collection.
13. Local delivery-delay risk evaluation with a score and explanation.


## Implementation Timeline

### Day 1 — Database Design and Project Planning

Today I plan to work on the initial database design.



* Go through the requirements again.
* Create the ERD.
* Create basic wireframes for the main screens.
* Decide the database tables and their relationships.
* Decide the required primary keys and foreign keys.

### Day 2 — JWT and Role Authorization

On Tuesday, I plan to work on authentication and authorization.


* Create the login functionality.
* Implement password hashing.
* Generate JWT tokens.
* Validate JWT tokens in protected APIs.
* Implement role-based authorization.


### Day 3 —  Data APIs

On Wednesday, I plan to create the CRUD APIs for:

* Customers
* Hubs
* Couriers
* Routes

I will also work on:

* DTOs
* Validation
* Service layer
* Repository/data access
* Search
* Sorting
* Server-side pagination

I will test the APIs using Swagger while developing them.

### Day 4 —  Data Frontend

On Thursday, I will start working on the React frontend.

Since I am still getting familiar with React, I will spend some time understanding the React topics needed for the project while also starting the actual screens.

Initial screens:

* Customers
* Hubs
* Couriers
* Routes


### Day 5 — Frontend Forms and API Integration

On Friday, I will continue the React work.

I plan to add:

* Create/edit forms
* Frontend validation
* API integration


### Day 6 — Parcel Booking Workflow

On Monday, I will start working on the main parcel workflow.

* Parcel creation
* Tracking-number generation
* Customer selection
* Origin hub selection
* Destination hub selection
* Route selection
* Courier assignment where required
* Parcel status
* Backend validation


### Day 7 — Parcel Tracking and Status History

On Tuesday, I will work on the tracking functionality.

* Create StatusEvents.
* Add hub/status updates.
* Create parcel history.
* Create customer tracking page.
* Create transaction detail screen.
* Create tracking API.
* Test the complete parcel journey from booking to delivery.

### Day 8 — AI Feature and Debugging

I will work on the delivery-delay risk feature.

I will study the required local AI/ML approach and implement the delivery-delay risk feature based on the project requirements. I will document the selected approach, inputs, scoring/model logic, and limitations.

### Day 9 — Final Testing and Demo Preparation

On the final day, I will focus on completing and reviewing the project.

