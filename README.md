# 🍬 Sweet Shop Management System

A **Sweet Shop Management System** built using **Node.js, TypeScript, Express, Prisma, and PostgreSQL**, following **Domain-Driven Modular Architecture** and **Test-Driven Development (TDD)**.

This project was developed as part of the **Incubyte Software Craftsperson Internship Assessment** and focuses on clean architecture, correctness, and incremental development.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with password hashing
- Role-based access control (`USER`, `ADMIN`)
- JWT-based authentication
- Protected routes using middleware
- Domain-level error handling

### 🍭 Sweets Management

- Admin-only creation of sweets
- Public listing of available sweets
- Flexible search by:
  - Name
  - Category
  - Price range

### 📦 Inventory Management

- Purchase sweets (reduces quantity)
- Prevent purchase when stock is insufficient
- Admin-only restocking of sweets

### 🧪 Quality & Craftsmanship

- Test-Driven Development (RED → GREEN → REFACTOR)
- Domain-Driven Modular Architecture
- Clean separation of concerns
- Real PostgreSQL database (NeonDB)
- Meaningful, frequent Git commits

---

## 🏗️ Architecture Overview

```

src/
├── app.ts
├── server.ts
│
├── common/
│   ├── errors/
│   ├── middleware/
│   └── jwt/
│
├── modules/
│   ├── auth/
│   └── sweets/
│
└── prisma/

```

### Key Architectural Decisions

- Each domain (Auth, Sweets, Inventory) owns its routes, services, and tests
- Controllers are thin; business logic lives in services
- Prisma schema is the single source of truth for persistence
- Validation is handled at the boundary using Zod
- Domain errors are mapped cleanly to HTTP responses

---

## 🧪 Test-Driven Development (TDD)

The project strictly follows **TDD principles**:

1. Write failing tests (RED)
2. Implement minimal logic to pass tests (GREEN)
3. Refactor safely with test coverage

### Covered Behaviors

- Authentication flows
- Duplicate email handling
- Password hashing
- JWT generation & verification
- Role-based access control
- Inventory constraints
- Search functionality

### Testing Tools

- **Vitest**
- **Supertest**

---

## 🛠️ Tech Stack

### Backend

- Node.js (v25+)
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (NeonDB)
- Zod (validation)
- JWT (authentication)
- bcryptjs (password hashing)

### Tooling

- Vitest
- Supertest
- Prisma Migrate
- Git 

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd sweet-shop
```

### 2️⃣ Install Dependencies

```bash
cd server
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in `server/`:

```env
DATABASE_URL=<your-neon-postgres-url>
JWT_SECRET=supersecretkey
PORT=3000
```

### 4️⃣ Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Run Tests

```bash
npm test
```

### 6️⃣ Start the Server

```bash
npm run dev
```

---

## 📡 API Overview

### Auth

- `POST /api/auth/register`
- `GET /api/auth/me` (protected)

### Sweets

- `POST /api/sweets` (admin only)
- `GET /api/sweets`
- `GET /api/sweets/search`

### Inventory

- `POST /api/sweets/:id/purchase`
- `POST /api/sweets/:id/restock` (admin only)

---

## 🤖 AI Usage Disclosure (Mandatory)

AI tools were used **responsibly and transparently** to support development, not replace understanding or ownership.

### Tool Used

- **ChatGPT**

### How AI Was Used

- Writing initial test cases during TDD
- Validating architectural and design decisions
- Debugging runtime and Prisma-related issues
- Improving code clarity and structure
- Rewriting commit messages to be clear and meaningful

### Human Ownership

- All architectural decisions were reviewed and finalized manually
- All tests were understood, executed, and iterated by me
- Business logic and domain rules were designed and verified by me
- AI acted as a **pair-programming assistant**, not an automated solution

---

## 🧾 Test Report

All tests pass successfully using **Vitest**.

Thank you for reviewing this submission.
