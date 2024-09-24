Evevts-app
A brief description or tagline for your project.

Table of Contents
Overview
Prerequisites
Installation
Environment Setup
Running the Application
MongoDB Setup
API Documentation
Project Structure

Overview
  the key features and technologies used ( Node.js, Express, MongoDB, Nodemon,JWT ,Nodemailer, Bcrypt , Node-schedule , otp-generator , joi ,mongoose , morgan , dotenv ,cos,  ).

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (version v18.17.1 or higher): Download and Install Node.js
MongoDB (version v4.4.10 or higher): Download and Install MongoDB
NPM (version 10.8.3 or higher): Installed automatically with Node.js
Git: Download and Install Git

Install Dependencies
  npm install

Environment Setup
1. MongoDB Configuration
You need a MongoDB instance running locally or a cloud-hosted MongoDB service (like MongoDB Atlas).

Default Local Configuration: The application is pre-configured to connect to MongoDB running locally at mongodb://localhost:27017/yourdatabase.

Custom Configuration: If you want to customize the MongoDB URI, create a .env file in the project root and add the following: 

2. Other Environment Variables
# Server configuration
PORT=3000
HASH_SALT_ROUNDS = 8
EMAIL = your-email
EMAIL_PASSWORD  = your-password
SECRET_KEY = your-secret-key
MODE = 'development'

# MongoDB configuration
MONGO_URI=mongodb://localhost:27017/yourdatabase

# JWT Secret for authentication
JWT_SECRET=your-secret-key

# Other configurations (like API keys, email service, etc.)
Running the Application
1. Development Mode
To run the application in development mode with Nodemon (auto-restarts the server on changes):
     npm start-dev
3. Production Mode
To run the application in production mode:
     npm start

MongoDB Setup
Local MongoDB
To run MongoDB locally, use the following commands:

1.Start the MongoDB service:
    mongod
2.Access the MongoDB shell to verify the connection:

MongoDB Atlas (Cloud)
If you prefer using MongoDB Atlas (cloud-hosted), follow these steps:

Create an account on MongoDB Atlas.

Create a new cluster and configure it.

Get your MongoDB URI and replace the MONGO_URI value in your .env file:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdatabase?retryWrites=true&w=majority

API Documentation
API documentation is available using tools like Postman or Swagger.

You can access the API documentation at: https://documenter.getpostman.com/view/31106841/2sAXqwXeqH (if using Swagger).
Alternatively, import the Postman collection to explore the available API endpoints.

Example API Endpoints:
Auth
POST /api/v1/auth/register: Register.
POST /api/v1/auth/first-login: verifiy email and first login.
POST /api/v1/auth/login: login
Events
GET /api/v1/events: Fetch all events.
POST /api/v1/events/create-event:Create a new event.
GET /api/v1/events/:eventId: Fetch specific event.
PATCH /api/v1/events/:eventId: update event a user by ID.
DELETE /api/v1/events/:eventId: delete event a user by ID.


├── db
│   ├── models             # Mongoose models for database schemas
│   └── db.connect.js      # MongoDB connection setup
├── node_modules           # Project dependencies managed by npm/yarn
├── src
│   ├── middlewares        # Custom middleware for handling request lifecycle
│   ├── modules
│   │   ├── auth           # Authentication module
│   │   │   ├── auth.controllers.js  # Handles authentication logic
│   │   │   ├── auth.middleware.js   # Middleware for authentication
│   │   │   ├── auth.routes.js       # Authentication API routes
│   │   │   ├── auth.validate.js     # Validation for authentication requests
│   │   ├── event          # Event module
│   │   │   ├── event.controllers.js # Handles event-related logic
│   │   │   ├── event.middleware.js  # Middleware for event operations
│   │   │   ├── event.routes.js      # Event-related API routes
│   │   │   ├── event.validation.js  # Validation for event requests
│   ├── routes             # General API route definitions
│   ├── utilities          # Utility functions and shared helpers
│   └── bootstrap.js       # Application initialization and configuration setup
├── .env                   # Environment variables (excluded from version control)
├── .env.example           # Example environment variables file
├── .gitignore             # Specifies files to be ignored by Git
├── index.js               # Main entry point of the application
├── package.json           # Project configuration, scripts, and dependencies
├── package-lock.json      # Locked versions of dependencies for consistency




