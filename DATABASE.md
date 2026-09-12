# Database Setup Instructions

This project utilizes **Prisma ORM** alongside a **MySQL** database. Prisma makes database initialization and migrations extremely simple.

## Prerequisites
- MySQL must be actively running on your local machine.
- You must have successfully configured the `DATABASE_URL` inside your `backend/.env` file (see [ENV_VARS.md](./ENV_VARS.md)).

## 1. Initializing the Database

Navigate to your backend directory in your terminal:
```bash
cd backend
```

Run the following Prisma command to push the schema to your database. 
```bash
npx prisma@5 db push
```
**What this command does:**
- It reads your `prisma/schema.prisma` file.
- It connects to your MySQL server using the `DATABASE_URL`.
- If the database (e.g., `pms`) does not exist, it creates it.
- It creates and normalizes all tables (`User`, `Project`, `Task`) with the correct columns, data types, and foreign key relationships.

## 2. Generating the Prisma Client

Usually, `db push` automatically generates the client. However, to be safe, you can manually generate the Prisma client which allows your Node.js code to safely interact with the database:
```bash
npx prisma@5 generate
```

## 3. Viewing the Database (Optional)

Prisma provides a fantastic web-based GUI for viewing and manually editing your database records. To launch it, run:
```bash
npx prisma@5 studio
```
This will open a browser window at `http://localhost:5555` where you can inspect your Users, Projects, and Tasks directly.
