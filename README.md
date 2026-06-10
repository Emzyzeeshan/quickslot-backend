# QuickSlot Backend

## Overview

QuickSlot Backend is a REST API built using Node.js, Express, Prisma ORM, and PostgreSQL (Supabase). It provides venue listing, slot availability, booking management, and cancellation functionality.

The application ensures that a slot cannot be double-booked even when multiple users attempt to book simultaneously.

---

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (Supabase)
* JavaScript

---

## Project Structure

```text
config/
controllers/
routes/
prisma/
  ├── schema.prisma
  ├── migrations/
  └── seed.js

app.js
server.js
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd quickslot-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env`

```env
DATABASE_URL="your_database_url"
PORT=5000
```

### 4. Run Database Migration

```bash
npx prisma migrate dev
```

### 5. Seed Initial Data

```bash
npx prisma db seed
```

### 6. Start Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### Get Venues

```http
GET /venues
```

### Get Slots

```http
GET /venues/:id/slots?date=YYYY-MM-DD
```

### Create Booking

```http
POST /bookings
```

Headers

```http
x-user-id: USER_ID
```

Body

```json
{
  "slotId": "slot_id"
}
```

### Get User Bookings

```http
GET /users/:id/bookings
```

### Cancel Booking

```http
DELETE /bookings/:id
```

---

## Concurrency Handling

Double booking prevention is enforced at the database level using relational constraints and booking validation.

If two users attempt to book the same slot simultaneously:

* First request succeeds
* Second request receives HTTP 409 Conflict

This guarantees slot uniqueness.

---

## What Was Intentionally Excluded

* JWT Authentication
* Role Management
* WebSockets
* Push Notifications

These were intentionally excluded to focus on the core booking workflow within the hackathon time limit.

---

## Future Improvements

* JWT Authentication
* Real-time slot updates using WebSockets
* Docker support
* Booking analytics
* Notification service

---

## AI Usage Note

AI tools were used for architecture guidance, code scaffolding, and implementation assistance.

All generated code was reviewed, modified, tested, and validated manually before inclusion in the project.
