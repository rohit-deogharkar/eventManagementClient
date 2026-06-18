# MyEventManager — Event Management Application

A full-stack event management platform where users can browse events, register to attend, and admins can create and manage events.

| | |
|---|---|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | http://myeventmanager.s3-website.ap-south-1.amazonaws.com/ |
| Backend API | https://mychat.lol/api |

---

## GitHub Repository

```
Frontend - https://github.com/rohit-deogharkar/eventManagementClient.git
Backend - https://github.com/rohit-deogharkar/eventManagmentServer.git
```
---

## Project Structure

```
MyEventManager/
├── eventManagmentServer/    # Node.js + Express API
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Route handlers
│   ├── middlewares/         # Auth, validation, error handling
│   ├── models/              # Mongoose schemas (User, Event)
│   ├── routes/              # API routes
│   ├── validators/          # Request validation rules
│   ├── utils/                 # JWT helper
│   ├── server.js            # Entry point
│   └── .env                 # Environment variables (not committed)
│
├── eventManagmentClient/    # React application
    ├── src/
    │   ├── api/             # Axios API calls
    │   ├── components/      # Reusable UI components
    │   ├── context/         # AuthContext (JWT state)
    │   ├── pages/           # Route pages
    │   └── utils/           # Helpers
    └── .env                 # Frontend env (not committed)


```
---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local install or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) (optional, for API testing)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rohit-deogharkar/eventManagementClient.git
git clone https://github.com/rohit-deogharkar/eventManagmentServer.git
```

### 2. Backend setup

```bash
cd eventManagmentServer
npm install
```

Create a `.env` file in the `eventManagmentServer/`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/MyEventManager
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=app_gmail
EMAIL_PASS=app_gmail_passkey
```

Start the backend:

```bash
npm run dev
```

Server runs at **http://localhost:5000**

### 3. Frontend setup

Open a new terminal:

```bash
cd eventManagementClient
npm install
```

Create a `.env` file in the `eventManagementClient/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs at **http://localhost:5173**

### 4. Create an admin user (optional)

By default, new users get the `user` role. To create an admin, register a user then update their role in MongoDB:

```js
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Features

### User
- Register and login with JWT authentication
- Browse all events with pagination and search
- View event details and attendee list
- Register / unregister for events

### Admin
- Create, edit, and delete events
- All user features

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

Protected routes require the JWT token in the request header:

```
Authorization: Bearer <your_token>
```

Token is returned on successful **Register** or **Login** and expires in **7 days**.

---

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Login and get JWT token |
| `POST` | `/auth/verifyEmail` | No | Verify user email using OTP |

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response `201`**
```json
{
    "success": true,
    "message": "OTP sent successfully",
    "email": "john@example.com"
}
```

```http
POST /api/auth/verifyEmail
Content-Type: application/json

{
  "email" : "john@example.com",
  "otp" : "952963"
}
```

**Response `201`**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "665f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response `200`** — same shape as register.

---

### Event Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/events` | No | — | List events (pagination + search) |
| `GET` | `/events/:id` | No | — | Get event details with attendees |
| `POST` | `/events` | Yes | Admin | Create event |
| `PUT` | `/events/:id` | Yes | Admin | Update event |
| `DELETE` | `/events/:id` | Yes | Admin | Delete event |
| `POST` | `/events/register/:id` | Yes | User | Register for event |
| `POST` | `/events/unRegister/:id` | Yes | User | Unregister from event |

#### Get All Events

```http
GET /api/events?page=1&limit=10&search=tech
```

**Query params:** `page`, `limit`, `search` (title search, case-insensitive)

**Response `200`**
```json
{
  "success": true,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [
    {
      "_id": "665f...",
      "title": "Tech Conference",
      "description": "...",
      "date": "2026-12-15T10:00:00.000Z",
      "location": "Mumbai",
      "createdBy": { "_id": "...", "name": "Admin", "email": "..." },
      "attendees": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### Get Event By ID

```http
GET /api/events/:id
```

**Response `200`**
```json
{
  "success": true,
  "data": {
    "_id": "665f...",
    "title": "Tech Conference",
    "description": "...",
    "date": "2026-12-15T10:00:00.000Z",
    "location": "Mumbai",
    "createdBy": { "_id": "...", "name": "Admin", "email": "..." },
    "attendees": [
      { "_id": "...", "name": "John Doe", "email": "john@example.com" }
    ]
  }
}
```

#### Create Event (Admin)

```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tech Conference 2026",
  "description": "Annual tech meetup",
  "date": "2026-12-15T10:00:00.000Z",
  "location": "Mumbai, India"
}
```

#### Register for Event

```http
POST /api/events/register/:id
Authorization: Bearer <token>
```

**Response `200`**
```json
{
  "success": true,
  "message": "Registered successfully"
}
```

#### Unregister from Event

```http
POST /api/events/unRegister/:id
Authorization: Bearer <token>
```

**Response `200`**
```json
{
  "success": true,
  "message": "Successfully unregistered from event"
}
```

---

### Error Responses

```json
{
  "success": false,
  "message": "Error description"
}
```

Validation errors:
```json
{
  "success": false,
  "errors": [
    { "type": "field", "msg": "Email is required", "path": "email", "location": "body" }
  ]
}
```

| Status | Meaning |
|--------|---------|
| `400` | Validation error / bad request |
| `401` | Missing or invalid JWT token |
| `403` | Forbidden (non-admin accessing admin route) |
| `404` | Resource not found |
| `500` | Server error |


## Author

Rohit Deogharkar