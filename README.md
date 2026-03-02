# MERN Stack Boilerplate

A complete full-stack boilerplate with MongoDB, Express.js, React, and Node.js.

## Features

- **Backend (Node.js + Express.js)**
  - RESTful API architecture
  - MongoDB with Mongoose ODM .
  - JWT authentication
  - Password hashing with bcrypt
  - Role-based access control
  - Error handling middleware
  - CORS enabled

- **Frontend (React)**
  - React Router for navigation
  - Context API for state management
  - Authentication flow
  - Private routes
  - Responsive design
  - Axios for API calls

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   └── userController.js   # User CRUD operations
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   └── User.js             # User model
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── userRoutes.js       # User endpoints
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB URI and JWT secret:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mernapp
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Admin only)

## Usage

1. Start MongoDB (if running locally)
2. Start the backend server
3. Start the frontend development server
4. Visit `http://localhost:3000`
5. Register a new account or login
6. Access the protected dashboard

## Environment Variables

### Backend (.env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cors
- dotenv

### Frontend
- React 18
- React Router v6
- Axios
- Context API

## License

ISC
