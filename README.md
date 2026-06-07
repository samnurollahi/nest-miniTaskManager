# Mini Task Manager (miniTaskApp)

A simple task management backend built with NestJS designed for managing tasks in development teams.

This project provides a REST API with Swagger documentation for testing and integration.

---

## Features

- Create new tasks
- Assign tasks to agents/users
- Retrieve all tasks
- Retrieve tasks assigned to current user
- Secure endpoints with authentication
- Swagger API documentation
- Modular NestJS architecture

---

## Tech Stack

- Node.js
- NestJS
- TypeScript
- Swagger (OpenAPI 3.0)
- JWT Authentication
- REST API

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/mini-task-manager.git
cd mini-task-manager

Install dependencies:

npm install
Environment Variables

Create a .env file in the root directory:

PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
Running the Project
Development
npm run start:dev
Production
npm run build
npm run start:prod
Swagger Documentation

After running the project, open:

http://localhost:3000/api

Swagger UI is available for testing all endpoints.

API Endpoints
Task Module
Create Task
POST /task/add-task

Creates a new task and assigns it to a user/agent.

Get All Tasks
GET /task/get-all

Returns all tasks in the system.

Get My Tasks
GET /task/get-my-task

Returns tasks assigned to the authenticated user.

Authentication

Most endpoints require authentication.

Use the Authorize button in Swagger UI and pass:

Bearer <token>
Project Structure
src/
 ├── task/
 │    ├── task.controller.ts
 │    ├── task.service.ts
 │    ├── task.module.ts
 │    └── dto/
 ├── auth/
 ├── users/
 ├── common/
 └── main.ts
Notes
Built as a mini task management system for teams
Designed to be scalable for future SaaS expansion
Fully documented with Swagger
Author

Sam

License

MIT
```
