# 🚚 Courier Parcel Tracking System

A full-stack courier parcel tracking platform built with **ASP.NET Core Web API, ReactJS, and SQL Server**.

The system provides parcel management, parcel tracking, authentication, role-based authorization, and a responsive frontend for managing courier operations.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration and authentication
- JWT-based authentication
- Role-based authorization
- Protected application functionality

### 📦 Parcel Management

- Create and manage parcels
- Track parcels
- Update parcel status
- Manage parcel-related information
- Monitor parcel delivery progress

### ⚙️ Backend

- RESTful Web APIs
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server database
- Global exception handling
- Database persistence

### 💻 Frontend

- ReactJS frontend
- JavaScript
- HTML
- CSS
- Responsive user interface

---

## 🛠️ Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| C# | Backend programming language |
| ASP.NET Core Web API | REST API development |
| Entity Framework Core | ORM and database access |
| SQL Server | Relational database |
| JWT | Authentication |
| REST API | Frontend/backend communication |

### Frontend

| Technology | Purpose |
|---|---|
| ReactJS | Frontend application |
| JavaScript | Frontend programming |
| HTML | Application structure |
| CSS | Styling and responsive UI |

### Development Tools

- Visual Studio
- VS Code
- Git
- GitHub
- GitLab

---

## 🏗️ System Architecture

The application follows a full-stack architecture where the ReactJS frontend communicates with the ASP.NET Core Web API, which handles application logic and database communication through Entity Framework Core.

```text
┌──────────────────────────┐
│                          │
│       ReactJS            │
│       Frontend           │
│                          │
└────────────┬─────────────┘
             │
             │ HTTP / REST API
             ▼
┌──────────────────────────┐
│                          │
│   ASP.NET Core Web API   │
│                          │
│   Authentication         │
│   Authorization          │
│   Parcel Management      │
│   Tracking               │
│   Exception Handling     │
│                          │
└────────────┬─────────────┘
             │
             │ Entity Framework Core
             ▼
┌──────────────────────────┐
│                          │
│       SQL Server         │
│                          │
│    Relational Database   │
│                          │
└──────────────────────────┘
