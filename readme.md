# AquaExplore Documentation

## Objective

AquaExplore is a simplified booking platform for undersea submersible expeditions. The system enables users to browse expeditions, book slots, and receive notifications. Administrators manage expedition schedules and monitor bookings. This documentation highlights the features implemented to ensure scalability, security, and user-friendliness.

---

## Project Overview

### Frontend (Next.js)

#### Features:

1. **Homepage**

   - Displays available expeditions with filter options (e.g., destination, dates).
   - Interactive UI designed using Tailwind CSS.

2. **User Dashboard**

   - Shows list of user bookings with options to cancel bookings.
   - Real-time updates for schedule and seat availability using Socket.IO.

3. **Admin Dashboard**

   - Enables CRUD operations for expedition management.
   - Displays analytics like popular destinations and bookings per month (using Recharts).

4. **Authentication**

   - Email-based authentication using Magic Links/OTPs.
   - Role-based access control (User, Admin) with permissions enforcement.

5. **WebSocket Integration**

   - Client-side WebSocket connection setup to receive real-time updates.

#### Scripts:

- `dev`: Run the development server.
- `build`: Build the production version of the application.
- `start`: Start the production server.
- `lint`: Run ESLint to identify issues.
- `format`: Format code using Prettier.
- `pre-commit`: Ensure code is linted, formatted, and built before committing.

#### Key Dependencies:

- **@tanstack/react-query**: State management for server-side data.
- **socket.io-client**: WebSocket connections.
- **react-hook-form**: Form validation.
- **tailwindcss**: Styling.
- **zod**: Input validation schemas.

---

### Backend (NestJS)

#### Features:

1. **Authentication**

   - Email-based authentication using SendGrid.
   - JWT-based token validation for Magic Links and OTPs.

2. **Role-Based Access Control (RBAC)**

   - Defined roles (User, Admin) with permissions.
   - Role-based access checks on protected endpoints.

3. **Expedition Management**

   - APIs for creating, reading, updating, and deleting expeditions.
   - Input validation using NestJS validation pipes.
   - MongoDB aggregation for analytics (e.g., popular destinations).

4. **Real-Time Notifications**

   - Server-side WebSocket integration using Socket.IO.
   - Real-time schedule and seat updates sent to connected clients.

5. **Validation and Security**

   - Input validation to prevent overbooking and ensure valid data.
   - Environment variables managed via ****`.env`**** files.

#### Scripts:

- `start`\*\*\*\*: Run the application with environment configuration.
- `start:dev`\*\*\*\*: Run the application in watch mode for development.
- `lint`\*\*\*\*: Run ESLint to identify issues.
- `format`\*\*\*\*: Format code using Prettier.
- `test`\*\*\*\*: Execute tests using Jest.
- `pre-commit`\*\*\*\*: Ensure linting, formatting, and building before committing.

#### Key Dependencies:

- **@nestjs/platform-socket.io**\*\*: WebSocket integration.\*\*
- **@nestjs/config**\*\*: Environment configuration management.\*\*
- **mongoose**\*\*: MongoDB ODM.\*\*
- **class-validator**\*\*: Data validation.\*\*
- **rxjs**\*\*: Reactive programming.\*\*
- **@sendgrid/mail**\*\*: Email delivery service.\*\*

---

### Environment Setup

1. **Environment Variables**

   - Example file: ****`.env.example`****.
   - Configure variables like database URI, SendGrid API key, JWT secret, etc.

2. **Docker Configuration**

   - Dockerfiles for both frontend and backend.
   - `docker-compose.yml`\*\*\* for orchestrating services.\*

---

### Real-Time Notifications

1. **Backend Setup**

   - Implemented server-side WebSocket integration with Socket.IO.
   - Notifications sent for schedule updates and seat availability.

2. **Frontend Setup**

   - Configured client-side WebSocket connections.
   - Received and displayed real-time notifications to users.

---

### GitHub Version Control

- **Branching Strategy**\*\*: GitFlow with feature-based branches.\*\*
- **Commits**\*\*: Each feature implemented with atomic, descriptive commits.\*\*

---

### Testing

- **Unit Testing**\*\*: Backend tested using Jest.\*\*
- **E2E Testing**\*\*: Endpoints tested via Postman.\*\*
- **Validation Testing**\*\*: Ensured input and environment variables are valid.\*\*

---

### Key Deliverables

1. Fully functional booking platform.
2. .env.example file for environment setup.
3. Postman collection for API testing.
4. Docker configuration for both frontend and backend.
5. README file with setup instructions.

---

### Timeline and Completion

- **Start Date**\*\*: January 22, 2025.\*\*
- ***End Date***\*\*: January 26, 2025.\*\*
- *Delivery deadline exceeded by 1:30 hours.*

