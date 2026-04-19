# JU Resource Booking System — Backend

REST API built with **Node.js + Express + Sequelize + MySQL** for the Jahangirnagar University Resource Booking System.

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js        # Sequelize instance
│   ├── models/
│   │   ├── Resource.js        # Resource model
│   │   └── Booking.js         # Booking model (FK → Resource)
│   ├── controllers/
│   │   ├── resourceController.js
│   │   └── bookingController.js
│   ├── routes/
│   │   ├── index.js           # Mounts all routers under /api
│   │   ├── resources.js
│   │   └── bookings.js
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── notFound.js        # 404 handler
│   │   └── validate.js        # express-validator helper
│   └── app.js                 # Entry point
├── seed.js                    # DB seeder
├── .env                       # Environment config (gitignored)
├── .env.example               # Template
└── package.json
```

---

## ⚙️ Setup

### 1. Prerequisites
- Node.js ≥ 18
- MySQL ≥ 8 (running locally or via Docker)

### 2. Create the MySQL database

```sql
CREATE DATABASE resource_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your MySQL password:

```env
DB_PASSWORD=your_mysql_password
```

### 4. Install dependencies

```bash
npm install
```

### 5. Seed the database

```bash
npm run seed
```

This creates the tables (via Sequelize sync) and inserts 8 default resources.

### 6. Start the server

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

Server starts at **http://localhost:5000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/resources` | List all resources |
| GET | `/api/resources/:id` | Get one resource |
| POST | `/api/resources` | Create resource |
| PUT | `/api/resources/:id` | Update resource |
| DELETE | `/api/resources/:id` | Delete resource |
| GET | `/api/bookings` | List all bookings (with resource info) |
| GET | `/api/bookings/:id` | Get one booking |
| POST | `/api/bookings` | Create booking |
| DELETE | `/api/bookings/:id` | Cancel booking |

### POST /api/bookings — Request body

```json
{
  "resource_id": 1,
  "requested_by": "Humayra Sadia",
  "booking_date": "2026-05-01"
}
```

### Conflict detection

Returns **409** if the same resource is already booked on the same date.

---

## 🗄️ Database Schema

### resources
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED PK | Auto-increment |
| name | VARCHAR(150) | |
| type | ENUM | Computer Lab, Seminar Library, Projector, Conference Room |
| capacity | INT UNSIGNED | |
| created_at | DATETIME | Auto |
| updated_at | DATETIME | Auto |

### bookings
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED PK | Auto-increment |
| resource_id | INT UNSIGNED FK | → resources.id (CASCADE DELETE) |
| resource_name | VARCHAR(150) | Denormalized for fast reads |
| requested_by | VARCHAR(150) | |
| booking_date | DATE | No past dates |
| created_at | DATETIME | Auto |
| updated_at | DATETIME | Auto |