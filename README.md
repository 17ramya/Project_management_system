# TaskNexus (PMS)

## Description

A full-stack Project Management System designed to help users efficiently manage their projects and associated tasks. The application features user authentication, project creation, task management, and a dashboard for an overview of progress.

This system is built with a focus on modern design, security, and clean architecture.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt for password hashing.
- **Project Management**: Create, read, update, and delete (CRUD) projects. View project statistics.
- **Task Management**: Create tasks within projects, set priorities (Low, Medium, High), status (Pending, In Progress, Completed), and due dates.
- **Smart Project Status**: Projects automatically update their status to 'Completed' when all associated tasks are finished, and revert to 'In Progress' if a task is reopened.
- **Dashboard**: A comprehensive overview displaying total projects, total tasks, completed tasks, and projects in progress.
- **Search & Filtering**: Easily search projects and tasks by name, and filter them by status or priority.
- **Modern UI**: A sleek, vibrant, and professional glassmorphic interface utilizing the Outfit font and fluid animations.

## Tech Stack

- **Frontend**: React (via Vite) + TypeScript + Vanilla CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL (via Prisma ORM)

## Project Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL Database server running locally (or remote)

### Environment Variables

#### Backend (`/backend/.env`)
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
DATABASE_URL="mysql://root:yourpassword@localhost:3306/pms_db"
JWT_SECRET="your_super_secret_jwt_key_here"
```

#### Frontend (`/frontend/.env`)
Create a `.env` file in the `frontend` directory with the following variable:
```env
VITE_API_URL="http://localhost:5000/api"
```

### Database Setup

1. Ensure your MySQL server is running and create a database for the project (e.g., `pms_db`).
2. Navigate to the `backend` directory and push the Prisma schema to the database:
   ```bash
   cd backend
   npx prisma db push
   ```

### Running the Application

1. **Start the Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The frontend will run on the port specified by Vite (usually `http://localhost:5173`).*

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and receive a JWT.
- `POST /api/auth/logout` - Logout the current user (client-side token removal).

### Project Endpoints
*(Requires JWT Authentication)*
- `GET /api/projects` - Get all projects for the authenticated user.
- `GET /api/projects/:id` - Get details of a specific project.
- `POST /api/projects` - Create a new project.
- `PUT /api/projects/:id` - Update an existing project.
- `DELETE /api/projects/:id` - Delete a project.

### Task Endpoints
*(Requires JWT Authentication)*
- `GET /api/tasks` - Get tasks (with optional filters: `projectId`, `status`, `priority`).
- `GET /api/tasks/:id` - Get details of a specific task.
- `POST /api/tasks` - Create a new task in a project.
- `PUT /api/tasks/:id` - Update an existing task.
- `DELETE /api/tasks/:id` - Delete a task.
