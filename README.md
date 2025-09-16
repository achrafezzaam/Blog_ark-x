# Full-Stack Blog Application

A modern full-stack blog application with React frontend and Node.js/Express backend, featuring comprehensive authentication, authorization, and user management capabilities.

## 🚀 Features

### Frontend (React + Vite)
- **Modern React Application** with Vite for fast development
- **Authentication UI** with login and signup forms
- **Form Validation** using React Hook Form + Zod schema validation
- **Real-time User Feedback** with error messages and loading states
- **Responsive Design** with modern CSS styling
- **Protected Routes** and conditional rendering based on auth state
- **User Session Management** with localStorage persistence

### Backend (Node.js + Express)
- **RESTful API** for CRUD operations on posts
- **JWT Authentication** with secure token-based auth
- **Role-Based Authorization** (User and Admin roles)
- **Password Security** with bcryptjs hashing (12 salt rounds)
- **Comprehensive Validation** on both frontend and backend
- **Pagination, Sorting & Search** for posts
- **Centralized Error Handling** with consistent error responses
- **Request Logging** middleware
- **Atomic File Operations** to prevent data corruption
- **Admin Panel** for user management

### Security Features
- **Input Validation & Sanitization**
- **Email Format Validation** with regex patterns
- **Password Strength Requirements** (minimum 8 characters)
- **Protected API Endpoints** with JWT verification
- **Role-based Access Control**
- **Secure Error Responses** (no sensitive data exposure)

### User Experience Enhancements
- **Real-time Form Validation** with immediate feedback
- **Loading States** during form submissions
- **Success/Error Messages** for all user actions
- **Confirmation Messages** for successful authentication
- **Disabled States** to prevent multiple submissions
- **Visual Feedback** with CSS styling for errors and success states

## 🏗️ Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MainContent.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx         # Main App component
│   │   ├── App.css         # Styling
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── core/                   # Backend API
│   ├── src/
│   │   ├── routes/         # API route definitions
│   │   │   ├── auth-routes.js
│   │   │   ├── post-routes.js
│   │   │   └── admin-routes.js
│   │   ├── controllers/    # Request/response handling
│   │   │   ├── auth-controller.js
│   │   │   ├── post-controller.js
│   │   │   └── admin-controller.js
│   │   ├── models/         # Data access layer
│   │   │   ├── user-model.js
│   │   │   └── post-model.js
│   │   ├── middleware/     # Express middleware
│   │   │   ├── auth.js
│   │   │   ├── error-handler.js
│   │   │   ├── not-found.js
│   │   │   └── request-logger.js
│   │   ├── utils/          # Helper utilities
│   │   │   ├── validate.js
│   │   │   └── file-store.js
│   │   ├── config/         # Configuration
│   │   └── server.js       # Server entry point
│   ├── data/               # JSON data storage
│   ├── scripts/            # Utility scripts
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **CSS3** - Modern styling with custom properties

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **UUID** - Unique identifier generation
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the core directory:
   ```bash
   cd core
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   PORT=3000
   JWT_SECRET=your-super-secure-jwt-secret-key
   JWT_EXPIRES_IN=24h
   ```

5. Create an admin user:
   ```bash
   npm run create-admin
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be running at:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login with credentials
- `GET /profile` - Get current user profile (protected)
- `POST /refresh` - Refresh JWT token (protected)

### Posts Routes (`/api/posts`)
- `GET /` - Get all posts (public, with pagination/search)
- `POST /` - Create a new post (authenticated users)
- `GET /:id` - Get a single post (public)
- `PUT /:id` - Update a post (authenticated, own posts only)
- `DELETE /:id` - Delete a post (admin only)

### Admin Routes (`/api/admin`)
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID (admin only)
- `DELETE /users/:id` - Delete user (admin only)
- `PATCH /users/:id/role` - Update user role (admin only)

## 👥 User Roles & Permissions

### User Role
- Register and login
- Create and edit own posts
- View all posts
- Access profile information

### Admin Role
- All user permissions
- Delete any post
- Manage users (view, delete, change roles)
- Full administrative access

## 🔧 Available Scripts

### Backend (core/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run create-admin` - Create admin user

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Form Validation

### Email Validation
- Valid email format required
- Real-time validation feedback
- Server-side validation with regex patterns

### Password Requirements
- Minimum 8 characters
- Required for both registration and login
- Password confirmation matching in signup

### Error Handling
- Client-side validation with immediate feedback
- Server-side validation with detailed error messages
- Network error handling with user-friendly messages
- Loading states during form submission

## 🔒 Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcryptjs with 12 salt rounds
- **Input Validation** on both client and server
- **Role-based Authorization** for protected resources
- **Secure Error Responses** without sensitive information
- **Token Expiration** with refresh capability

## 📚 Additional Documentation

For detailed API documentation, see `core/API_DOCUMENTATION.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
