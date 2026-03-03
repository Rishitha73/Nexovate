# Authentication System Documentation

## Overview

The Nexovate application implements a complete JWT-based authentication system with React Context for state management on the frontend and Express middleware on the backend.

## Architecture

### Frontend Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ├─Register/Login
       ▼
┌─────────────────────┐
│  Login/Register     │
│    Page (jsx)       │
└──────┬──────────────┘
       │
       ├─Call authService
       ▼
┌─────────────────────┐
│  authService.js     │
│  (API calls)        │
└──────┬──────────────┘
       │
       ├─API Request (axios + interceptor)
       ▼
┌─────────────────────┐
│   Backend API       │
│  /auth/register     │
│  /auth/login        │
└──────┬──────────────┘
       │
       ├─Returns: {user, token}
       ▼
┌─────────────────────┐
│  Store in           │
│  localStorage +     │
│  AuthContext        │
└──────┬──────────────┘
       │
       ├─Redirect to Dashboard
       ▼
    Success
```

### Backend Authentication Flow

```
┌──────────────────┐
│  API Request     │
│  with token      │
└────────┬─────────┘
         │
         ├─Header: Authorization: Bearer <token>
         ▼
┌──────────────────┐
│  auth.js         │
│  protect()       │
│  Middleware      │
└────────┬─────────┘
         │
    ┌────┴────┐
    │          │
  Valid     Invalid
    │          │
    ▼          ▼
┌─────────────────────┐
│  Verify JWT Token   │ 
│  Decode token       │
│  Get user from DB   │
│  Set req.user       │
└──────┬──────────────┘
       │
       ├─next() - Continue to route handler
       ▼
   Route Handler
```

## Frontend Implementation

### 1. AutoContext (`src/context/AuthContext.jsx`)

Manages authentication state globally:

```javascript
// Provides:
- user: Current logged-in user or null
- loading: Loading state while checking auth
- register(): Sign up new user
- login(): Sign in existing user
- logout(): Clear auth data
- updateUser(): Update current user
```

### 2. Auth Service (`src/services/authService.js`)

Handles API calls:

```javascript
// Methods:
- register(name, email, password)  → User registration
- login(email, password)           → User login
- logout()                         → Clear auth
- getCurrentUser()                 → Get stored user
- getToken()                       → Get JWT token
```

### 3. API Client (`src/services/api.js`)

Axios instance with interceptors:

```javascript
// Request Interceptor:
- Automatically add Bearer token to all requests

// Response Interceptor:
- Handle 401 errors (logout user, redirect to login)
- Pass through other responses
```

### 4. Protected Routes (`src/components/PrivateRoute.jsx`)

Wrapper component for protected pages:

```javascript
- Check if user is authenticated
- Show loading state
- Redirect to login if not authenticated
- Render component if authenticated
```

## Backend Implementation

### 1. User Model (`backend/models/User.js`)

Schema with password hashing:

```javascript
Fields:
- name: String (required)
- email: String (required, unique, lowercase)
- password: String (required, min 6, hashed with bcrypt)
- role: String (user/admin, default: user)
- timestamps: Created/updated dates

Methods:
- matchPassword(enteredPassword): Compare with hashed password
- Pre-save hook: Hash password before saving
```

### 2. Auth Controller (`backend/controllers/authController.js`)

Endpoint handlers:

```javascript
POST /auth/register
- Validate input
- Check if email exists
- Hash password with bcrypt
- Create user
- Return user + token

POST /auth/login
- Validate email & password
- Find user
- Compare password with hashed version
- Return user + token

GET /auth/me (protected)
- Return current user details
```

### 3. Auth Middleware (`backend/middleware/auth.js`)

Route protection:

```javascript
protect middleware:
- Extract token from Authorization header
- Verify token with JWT_SECRET
- Find user in database
- Set req.user for route handler
- Return error if token invalid/expired

admin middleware:
- Check if user has admin role
- Only allow admins to access route
```

### 4. Error Handler (`backend/middleware/errorHandler.js`)

Centralized error handling:

```javascript
- Mongoose validation errors → 400
- Duplicate key errors → 400
- JWT errors → 401
- Production: Hide stack trace
- Development: Show full error details
```

## Data Flow

### Registration

1. **Frontend**: User fills form → `authService.register()`
2. **API**: POST `/api/auth/register` with `{name, email, password}`
3. **Backend**: 
   - Validate input
   - Hash password with bcrypt
   - Create user in MongoDB
4. **Response**: `{_id, name, email, role, token}`
5. **Frontend**: 
   - Store token in localStorage
   - Store user in localStorage
   - Update AuthContext
   - Redirect to dashboard

### Login

1. **Frontend**: User fills form → `authService.login()`
2. **API**: POST `/api/auth/login` with `{email, password}`
3. **Backend**:
   - Find user by email
   - Compare password with hash
4. **Response**: `{_id, name, email, role, token}`
5. **Frontend**: (Same as registration)

### Protected API Call

1. **Frontend**: Component calls `api.get('/users/:id')`
2. **Interceptor**: Adds `Authorization: Bearer <token>` header
3. **Backend**: Middleware verifies token
4. **Handler**: Processes request with `req.user` context
5. **Response**: Returns data or error

### Logout

1. **Frontend**: User clicks logout
2. **Clear**: Remove token from localStorage
3. **Clear**: Remove user from localStorage
4. **Context**: Set user to null
5. **Redirect**: Redirect to home/login

## Security Features

✅ **Password Hashing**: bcryptjs (10 salt rounds)
✅ **JWT Token**: 30-day expiration
✅ **Protected Routes**: Client-side route guards
✅ **Protected Endpoints**: Server-side middleware
✅ **Role-Based Access**: Admin middleware for admin routes
✅ **Auto Logout**: 401 responses clear session
✅ **Error Messages**: Generic error messages (no info leakage)
✅ **Email Validation**: MongoDB schema validation
✅ **Password Validation**: Minimum 6 characters

## Environment Variables

### Backend (`.env`)
```env
MONGO_URI=mongodb://...          # Database connection
JWT_SECRET=your_secret_key       # Token signing secret
PORT=5000                        # Server port
NODE_ENV=development             # Environment mode
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api   # Backend URL
```

## Token Structure

### JWT Token Format
```
Header: { type: "JWT", alg: "HS256" }
Payload: { id: "user_mongodb_id", iat: timestamp, exp: timestamp }
Signature: HMACSHA256(header.payload, JWT_SECRET)
```

### Usage
```javascript
// Request
GET /api/users/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Server decodes token → extracts user ID → loads user → sets req.user
```

## Testing Authentication

### Using Postman/Insomnia

1. **Register**
   ```
   POST http://localhost:5000/api/auth/register
   Body: { "name": "John", "email": "john@example.com", "password": "123456" }
   ```

2. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   Body: { "email": "john@example.com", "password": "123456" }
   Response: { "token": "eyJ...", "user": {...} }
   ```

3. **Protected Route**
   ```
   GET http://localhost:5000/api/auth/me
   Headers: { "Authorization": "Bearer eyJ..." }
   ```

## Common Issues & Solutions

### Issue: "User already exists"
- **Cause**: Email already registered
- **Solution**: Use different email or login instead

### Issue: "Invalid email or password"
- **Cause**: Wrong email or password
- **Solution**: Check credentials, use forgot password feature (future)

### Issue: "Not authorized, token failed"
- **Cause**: Invalid/expired token
- **Solution**: Clear localStorage, login again

### Issue: "CORS error"
- **Cause**: Frontend and backend not properly connected
- **Solution**: Check API_URL in .env, ensure backend is running

### Issue: Tokens keep expiring
- **Cause**: 30-day expiration reached
- **Solution**: Implement token refresh endpoint (future enhancement)

## Future Enhancements

- [ ] Email verification on registration
- [ ] Password reset/forgot password
- [ ] Token refresh mechanism
- [ ] Two-factor authentication
- [ ] OAuth integration (Google, GitHub)
- [ ] Remember me functionality
- [ ] Account lockout after failed attempts
- [ ] Audit logging
- [ ] Session management with logout from all devices

---

**Last Updated:** March 3, 2026
