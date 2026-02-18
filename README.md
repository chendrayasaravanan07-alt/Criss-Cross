# Criss-Cross – Event Management System

## Overview

Criss-Cross is a full-stack web application built using the MERN stack that enables event and hackathon management with role-based access control.

The system supports three user roles:
- Student
- Organizer
- Admin

The application allows event creation, discovery, registration, and administrative management with secure authentication.

---

## Architecture

Client-Server Architecture:

- Frontend: React.js (Single Page Application)
- Backend: Node.js + Express.js (REST API)
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- Authorization: Role-Based Access Control

---

## Core Modules

### 1. Authentication Module
- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- Protected routes using middleware

---

### 2. Student Module
- View approved events
- Search events by category or interest
- Register for events
- View registered events

---

### 3. Organizer Module
- Create new events
- Update existing events
- Delete events
- View registered participants

---

### 4. Admin Module
- Manage students and organizers
- Monitor events
- Approve or remove events
- Platform-level control

---

## Database Schema

### User Schema
- name: String
- email: String (unique)
- password: String (hashed)
- role: Enum (student, organizer, admin)
- interests: Array

### Event Schema
- title: String
- description: String
- category: String
- date: Date
- location: String
- organizerId: ObjectId (reference to User)
- participants: Array of User IDs
- status: Enum (pending, approved)

---

## API Endpoints

Authentication:
- POST /api/auth/register
- POST /api/auth/login

Events:
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id
- POST /api/events/register/:id

---

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file inside backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

Backend runs on:
```
http://localhost:5000
```

---

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization middleware
- Server-side input validation

---

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## Purpose

This project demonstrates:
- Full-stack application development
- REST API design
- Role-based access control
- CRUD operations
- MongoDB data modeling
- Authentication & Authorization
