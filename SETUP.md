# Project Setup Instructions

Follow these step-by-step instructions to get TaskNexus (PMS) running on your local machine.

## Prerequisites
- **Node.js**: Ensure you have Node.js version 16 or higher installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MySQL**: Ensure you have MySQL version 8.0 or higher installed and running locally. You can download it from [mysql.com](https://www.mysql.com/).

## 1. Installation

First, clone or extract the project repository to your local machine, then navigate to the root directory (`pms`).

### Install Backend Dependencies
Navigate to the `backend` directory and install the required Node modules:
```bash
cd backend
npm install
```

### Install Frontend Dependencies
Open a new terminal, navigate to the `frontend` directory, and install the required Node modules:
```bash
cd frontend
npm install
```

## 2. Configuration
Before starting the servers, you must set up your environment variables and database. Please refer to [ENV_VARS.md](./ENV_VARS.md) for environment configuration and [DATABASE.md](./DATABASE.md) for database initialization instructions.

## 3. Running the Application Locally

Once your database is configured and dependencies are installed, you can start the development servers. It is highly recommended to run these in two separate terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
*The backend API will start on `http://localhost:5000`.*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*The frontend development server will start and automatically open `http://localhost:5173` in your default browser.*
