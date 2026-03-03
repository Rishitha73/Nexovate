# Nexovate - Backend & Frontend Setup Guide

## Project Structure

```
Nexovate/
├── backend/          # Node.js + Express + MongoDB
│   ├── config/       # Database configuration
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Auth, error handling
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── .env          # Environment variables
│   └── server.js     # Entry point
└── frontend/         # React + Vite
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── context/       # React context (Auth)
    │   ├── hooks/         # Custom hooks
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── utils/         # Utility functions
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    ├── .env               # Environment variables
    └── vite.config.js     # Vite configuration
```

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Local installation or MongoDB Atlas account
- **npm** or **yarn** - Usually comes with Node.js
- **Git** - For version control

## Installation & Setup

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
The `.env` file is already configured with:
- `MONGO_URI` - MongoDB connection string (using MongoDB Atlas)
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment setting (development/production)

**For local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/nexovate
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

#### Start the Backend Server
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run start
```

The server will run on `http://localhost:5000`

### 2. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Environment Configuration
The `.env` file is already configured with:
- `VITE_API_URL` - Backend API URL (default: `http://localhost:5000/api`)

#### Start the Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features Implemented

### Authentication System
- ✅ User Registration
- ✅ User Login with JWT tokens
- ✅ Protected Routes (PrivateRoute component)
- ✅ Auto token refresh on API calls
- ✅ Automatic logout on 401 response
- ✅ Error handling and validation

### API Integration
- ✅ Axios-based API client with interceptors
- ✅ Automatic Bearer token attachment
- ✅ Centralized error handling
- ✅ API base URL from environment variables

### Frontend Pages
- ✅ **Home** - Landing page
- ✅ **Login** - User login with error handling
- ✅ **Register** - User registration with validation
- ✅ **Dashboard** - Protected user dashboard
- ✅ **Profile** - User profile management

### Backend Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

#### Users (`/api/users`)
- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID (protected)
- `PUT /:id` - Update user (protected)
- `DELETE /:id` - Delete user (admin only)

## Authentication Flow

### User Registration
1. User enters name, email, password, and confirms password
2. Frontend validates passwords match
3. Frontend sends registration request to `/api/auth/register`
4. Backend validates email doesn't exist, hashes password
5. Backend returns user data and JWT token
6. Frontend stores token and user data in localStorage
7. User is redirected to dashboard

### User Login
1. User enters email and password
2. Frontend sends login request to `/api/auth/login`
3. Backend validates credentials
4. Backend returns user data and JWT token
5. Frontend stores token and user data in localStorage
6. User is redirected to dashboard

### Protected Routes
- User must have valid token in localStorage
- `PrivateRoute` component checks authentication status
- Unauthenticated users are redirected to login page
- 401 responses automatically clear auth data and redirect to login

### Token Management
- JWT tokens last for 30 days (configurable in backend)
- Tokens are sent with every API request in `Authorization: Bearer <token>` header
- Axios interceptor handles automatic token attachment

## Building for Production

### Backend
```bash
cd backend
npm install --production
# Set NODE_ENV=production in .env
npm run start
```

### Frontend
```bash
cd frontend
npm run build
# Creates optimized build in 'dist' folder
npm run preview  # Preview production build locally
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas credentials are correct
- Check network connectivity for MongoDB Atlas
- Verify `MONGO_URI` in `.env`

### CORS Errors
- Ensure both services are running
- Check CORS configuration in backend `server.js`
- Verify API URL in frontend `.env`

### Token Expiration
- Tokens last 30 days (configurable in auth controller)
- Clear localStorage and login again if issues persist
- Check `JWT_SECRET` consistency between backend and frontend

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will automatically use next available port

## Security Notes

⚠️ **Important for Production:**
1. Change `JWT_SECRET` to a strong random string
2. Use environment-specific configuration
3. Enable HTTPS/SSL
4. Use MongoDB Atlas with IP whitelisting
5. Set `NODE_ENV=production`
6. Implement rate limiting
7. Add more validation and sanitization

## Development Tips

- Use Postman/Insomnia to test API endpoints
- Check browser DevTools Network tab to verify requests
- Use Redux Dev Tools browser extension for state management
- Review ESLint warnings and fix them

## Next Steps

1. **Database Seeders** - Create initial data for testing
2. **Email Verification** - Add email confirmation on registration
3. **Password Reset** - Implement forgot password flow
4. **Two-Factor Authentication** - Add 2FA for enhanced security
5. **API Documentation** - Generate Swagger/OpenAPI docs
6. **Testing** - Add Jest/Vitest test suites
7. **Deployment** - Deploy to Vercel (frontend) and Heroku/AWS (backend)

## Support & Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Last Updated:** March 3, 2026
