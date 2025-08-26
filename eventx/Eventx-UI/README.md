# Final-Project-MAIM

# EventX - Event Management & Ticketing System

![EventX Logo](https://img.icons8.com/color/96/000000/event-accepted.png)

A comprehensive event management system for creating events, booking tickets, and managing attendees with advanced analytics.

## ✨ Features

### 👥 For Users

- ✅ User registration and authentication
- ✅ Browse and search events
- ✅ Book tickets with seat selection
- ✅ Digital tickets with QR codes
- ✅ User profile management
- ✅ View booking history
- ✅ Responsive design for all devices

### 🛠️ For Administrators

- ✅ Admin dashboard with analytics
- ✅ Create, edit, and manage events
- ✅ Real-time event statistics
- ✅ Attendee insights and demographics
- ✅ Sales and revenue reports
- ✅ User management system
- ✅ Export data to CSV/Excel

## 🚀 Technology Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **QRCode.react** - QR code generation

### Backend

- **Node.js & Express.js** - Server runtime and framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone <repository-url>
cd eventx-backend

# Install dependencies
npm install

# Environment variables
cp .env.example .env
# Edit .env with your configurations

# Start the server
npm run dev

eventx/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── api/
    │   └── hooks/
    ├── public/
    ├── .env
    └── package.json

✨ Features
👥 For Users
✅ User registration and authentication

✅ Browse and search events

✅ Book tickets with seat selection

✅ Digital tickets with QR codes

✅ User profile management

✅ View booking history

✅ Responsive design for all devices

🛠️ For Administrators
✅ Admin dashboard with analytics

✅ Create, edit, and manage events

✅ Real-time event statistics

✅ Attendee insights and demographics

✅ Sales and revenue reports

✅ User management system

✅ Export data to CSV/Excel

🚀 Technology Stack
Frontend
React 18 - Modern React with hooks

Vite - Fast build tool and dev server

Tailwind CSS - Utility-first CSS framework

React Router v6 - Client-side routing

Axios - HTTP client for API requests

QRCode.react - QR code generation

Backend
Node.js & Express.js - Server runtime and framework

MongoDB & Mongoose - Database and ODM

JWT - JSON Web Tokens for authentication

bcryptjs - Password hashing

CORS - Cross-origin resource sharing

📦 Installation
Prerequisites
Node.js (v16 or higher)

MongoDB (local or cloud)

npm or yarn


🎯 API Endpoints
Authentication
POST /api/users/register - User registration

POST /api/users/login - User login

GET /api/users/profile - Get user profile

Events
GET /api/events - Get all events

GET /api/events/:id - Get single event

POST /api/events - Create event (Admin)

PUT /api/events/:id - Update event (Admin)

DELETE /api/events/:id - Delete event (Admin)

Tickets
POST /api/tickets/book/:eventId - Book tickets

GET /api/tickets/me - Get user's tickets

PUT /api/tickets/verify/:id - Verify ticket (Admin)

Analytics
GET /api/analytics/overview - System overview

GET /api/analytics/demographics - User demographics

GET /api/analytics/event/:id - Event-specific analytics

🎨 UI Components
Core Components
Navbar - Navigation with user authentication state

ProtectedRoute - Route protection for authenticated users

AdminRoute - Route protection for admin users

InputField - Reusable input component

TicketBooking - Ticket booking with seat selection

Pages
Home - Landing page

Login/Register - Authentication pages

Events - Events listing page

EventDetails - Single event page with booking

Profile - User profile management

MyTickets - User's ticket history

Admin Dashboard - Admin analytics dashboard

Events Management - CRUD operations for events

🔒 Security Features
JWT-based authentication

Password hashing with bcrypt

Route protection middleware

Input validation and sanitization

CORS configuration

Environment variable protection


📈 Performance Features
React lazy loading for components

Image optimization

API response caching

Database indexing

Pagination for large datasets

Efficient state management

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request
```
