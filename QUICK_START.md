# Quick Start Guide - Nexovate Authentication System

## Prerequisites
- Node.js v16+ installed
- MongoDB running (local or Atlas)
- Git (optional)

## One-Minute Setup

### Terminal 1: Start Backend
```bash
cd backend
npm install
npm run dev
```

**Expected Output**:
```
Server running on port 5000
MongoDB Connected: [connection info]
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

**Expected Output**:
```
Local:   http://localhost:5173/
```

### Access Application
Open browser to **http://localhost:5173**

## Testing Authentication

### 1. Register New User
- **URL**: http://localhost:5173/register
- **Form Fields**:
  - Full Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Confirm: password123
- **Click**: Sign Up

### 2. Login
- **URL**: http://localhost:5173/login
- **Form Fields**:
  - Email: john@example.com
  - Password: password123
- **Click**: Sign In

### 3. Access Protected Pages
- **Dashboard**: http://localhost:5173/dashboard (redirects to login if not authenticated)
- **Profile**: http://localhost:5173/profile (redirects to login if not authenticated)

### 4. Logout
- **Click**: Logout button in navbar
- **Redirect**: Returns to home page

## API Testing with Postman/Insomnia

### Import Collection
```json
{
  "info": {
    "name": "Nexovate Auth API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"password\": \"123456\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"john@example.com\", \"password\": \"123456\"}"
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/auth/me",
        "header": {
          "Authorization": "Bearer [TOKEN_FROM_LOGIN]"
        }
      }
    }
  ]
}
```

### Manual API Testing

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'
```

**Response**:
```json
{
  "_id": "user_id_here",
  "name": "John",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

**Response**: (Same as register)

#### Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**:
```json
{
  "_id": "user_id",
  "name": "John",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2026-03-03T...",
  "updatedAt": "2026-03-03T..."
}
```

## Common Commands

### Backend
```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Start production server
npm run start
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/nexovate
JWT_SECRET=your_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Folder Structure Quick Reference

```
backend/
├── config/db.js          ← MongoDB connection
├── controllers/
│   ├── authController.js ← Register, Login, GetMe
│   └── userController.js ← User CRUD
├── middleware/
│   ├── auth.js           ← JWT protection
│   └── errorHandler.js   ← Error handling
├── models/User.js        ← User schema
├── routes/
│   ├── authRoutes.js     ← Auth endpoints
│   └── userRoutes.js     ← User endpoints
├── .env                  ← Config (GITIGNORED)
└── server.js             ← Express app

frontend/
├── src/
│   ├── components/
│   │   ├── PrivateRoute.jsx  ← Protected routes
│   │   └── Navbar.jsx         ← Navigation
│   ├── context/
│   │   └── AuthContext.jsx    ← Auth state
│   ├── pages/
│   │   ├── Login.jsx          ← Login page
│   │   ├── Register.jsx       ← Register page
│   │   ├── Dashboard.jsx      ← Protected
│   │   ├── Profile.jsx        ← Protected
│   │   └── Home.jsx           ← Public
│   ├── services/
│   │   ├── api.js             ← Axios config
│   │   ├── authService.js     ← Auth API calls
│   │   └── userService.js     ← User API calls
│   ├── App.jsx                ← Main app
│   └── main.jsx               ← Entry point
├── .env                        ← Config (GITIGNORED)
└── vite.config.js              ← Build config
```

## Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Local: mongod should be running on 27017
# Atlas: Check MONGO_URI in .env

# Test connection
mongo "mongodb://localhost:27017"
```

### "Port 5000 already in use"
```bash
# Either:
# 1. Kill the process using port 5000
lsof -i :5000        # macOS/Linux
netstat -ano | findstr :5000  # Windows

# 2. Change PORT in .env
PORT=5001
```

### "CORS error"
```bash
# Ensure both servers are running:
# Backend: http://localhost:5000
# Frontend: http://localhost:5173

# Check VITE_API_URL in frontend/.env
VITE_API_URL=http://localhost:5000/api
```

### "Token failed" error
```bash
# Try clearing browser cache/localStorage:
# 1. Open DevTools (F12)
# 2. Go to Application/Storage
# 3. Delete all localStorage entries
# 4. Login again
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s /q node_modules & del package-lock.json  # Windows
npm install
```

## File Editing

### Important Files for Development

**Backend**
- `backend/controllers/authController.js` - Add new auth methods
- `backend/models/User.js` - Modify user schema
- `backend/middleware/auth.js` - Customize authentication

**Frontend**
- `frontend/src/context/AuthContext.jsx` - Manage auth state
- `frontend/src/services/authService.js` - API calls
- `frontend/src/pages/Login.jsx` - Login UI
- `frontend/src/pages/Register.jsx` - Register UI

## Test Credentials (After First Registration)

```
Email: test@example.com
Password: password123
```

## Useful Links

- Gitignore Check: `git status` should not show .env files
- API Base URL: http://localhost:5000/api
- Frontend App: http://localhost:5173
- Vite Docs: https://vitejs.dev
- Express Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com

## Performance Tips

- Use `npm install --legacy-peer-deps` if dependency conflicts
- Clear browser cache in DevTools if styles look wrong
- Restart servers if changes don't reflect
- Check console (F12) for JavaScript errors

---

**Happy Coding! 🚀**

For detailed documentation, see:
- SETUP.md - Complete setup guide
- AUTHENTICATION.md - Auth architecture
- COMPLETION_STATUS.md - Features checklist
