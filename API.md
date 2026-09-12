# API Documentation

The backend exposes a fully RESTful API built on Express.js. All endpoints are prefixed with `/api`. 

## Authentication & Security
Most endpoints require authentication. 
- You must obtain a token via the `POST /api/auth/login` endpoint.
- You must attach the token to the HTTP headers of subsequent requests:
  `Authorization: Bearer <YOUR_JWT_TOKEN>`

---

## 1. Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/register` | No | Registers a new user account. Passwords are automatically hashed via bcrypt. |
| `POST` | `/login` | No | Authenticates a user and returns a signed JWT token valid for 1 day. |
| `POST` | `/logout` | No | Invalidates the current user session on the client side. |

**Example Registration Payload:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

---

## 2. Project Endpoints (`/api/projects`)

*Note: All project endpoints strictly scope database queries to the authenticated user's ID.*

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET`  | `/` | Yes | Retrieves an array of all projects owned by the authenticated user, including nested task arrays to calculate progress. |
| `GET`  | `/:id` | Yes | Retrieves the details of a single specific project by its UUID. |
| `POST` | `/` | Yes | Creates a new project assigned to the authenticated user. |
| `PUT`  | `/:id` | Yes | Updates an existing project (e.g., changing status to "In Progress"). |
| `DELETE`| `/:id` | Yes | Deletes a project. **Cascading Delete:** All associated tasks will also be destroyed. |

**Example Create Project Payload:**
```json
{
  "name": "Website Redesign",
  "description": "Revamp the main landing page.",
  "status": "Not Started",
  "startDate": "2026-10-01",
  "endDate": "2026-10-15"
}
```

---

## 3. Task Endpoints (`/api/tasks`)

*Note: All task endpoints strictly scope database queries to the authenticated user's ID.*

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `GET`  | `/` | Yes | Retrieves tasks. Supports URL query filtering (`?projectId=...`, `?status=...`, `?priority=...`, `?search=...`). |
| `GET`  | `/:id` | Yes | Retrieves a single specific task by its UUID. |
| `POST` | `/` | Yes | Creates a new task and links it to a specific `projectId`. |
| `PUT`  | `/:id` | Yes | Updates an existing task (e.g., changing priority or marking as "Completed"). **Smart Sync:** If a task update results in all of a project's tasks being "Completed", the parent project is automatically updated to "Completed". |
| `DELETE`| `/:id` | Yes | Deletes a specific task. |

**Example Create Task Payload:**
```json
{
  "name": "Design Mockups",
  "description": "Create Figma designs for the new header.",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-10-05",
  "projectId": "uuid-of-the-parent-project"
}
```
