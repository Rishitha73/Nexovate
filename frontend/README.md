# Nexovate Frontend

A modern React application built with Vite, featuring authentication, routing, and a clean component structure.

## 🚀 Features

- **React 19** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **Axios** for API communication
- **Context API** for state management
- **Private Routes** for protected pages
- **Responsive Design** with modern CSS

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Profile.jsx
│   ├── services/        # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── userService.js
│   ├── utils/           # Utility functions
│   │   ├── formatters.js
│   │   ├── storage.js
│   │   └── validation.js
│   ├── App.jsx          # Main app component
│   ├── App.css          # App styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json
└── vite.config.js
```

## 🛠️ Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Key Components

### Authentication
- **AuthContext**: Manages user authentication state
- **Login/Register**: Authentication pages with form validation
- **PrivateRoute**: Protects routes that require authentication

### Services
- **api.js**: Axios instance with interceptors
- **authService.js**: Authentication API calls
- **userService.js**: User profile API calls

### Utilities
- **validation.js**: Form validation functions
- **formatters.js**: Date, number, and text formatting
- **storage.js**: localStorage helpers

### Custom Hooks
- **useDebounce**: Debounce values for search/input
- **useLocalStorage**: Sync state with localStorage

## 🎨 Styling

The project uses CSS modules and follows a component-based styling approach. Each component has its own CSS file for better maintainability.

## 🔐 Authentication Flow

1. User registers or logs in
2. JWT token stored in localStorage
3. Token attached to API requests via Axios interceptor
4. Protected routes check authentication status
5. Automatic redirect to login on 401 errors

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔄 API Integration

The frontend communicates with the backend API using Axios. All API endpoints are defined in the services folder:

- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/users/profile` - Get/Update user profile

## 📝 Environment Variables

- `VITE_API_URL` - Backend API base URL

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
