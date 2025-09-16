# Blog API Authentication & Authorization Documentation

## Overview
This API now includes JWT-based authentication and role-based authorization with two user roles: `user` and `admin`.

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
  },
  "error": null
}
```

### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token"
  },
  "error": null
}
```

### GET /api/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

### POST /api/auth/refresh
Refresh JWT token (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "new-jwt-token"
  },
  "error": null
}
```

## Posts Endpoints (Updated with Auth)

### GET /api/posts
Get all posts (public, optional authentication for user context).

**Headers (Optional):**
```
Authorization: Bearer <jwt-token>
```

### POST /api/posts
Create a new post (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post content...",
  "author": "Author Name",
  "tags": ["tag1", "tag2"]
}
```

### GET /api/posts/:id
Get a specific post (public, optional authentication).

### PUT /api/posts/:id
Update a post (requires authentication, users can only update their own posts, admins can update any).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### DELETE /api/posts/:id
Delete a post (requires admin role).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

## Admin Endpoints

### GET /api/admin/users
Get all users (admin only).

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

### GET /api/admin/users/:id
Get a specific user (admin only).

### DELETE /api/admin/users/:id
Delete a user (admin only, cannot delete self).

### PATCH /api/admin/users/:id/role
Update user role (admin only, cannot change own role).

**Request Body:**
```json
{
  "role": "admin" // or "user"
}
```

## User Roles & Permissions

### User Role (`user`)
- Can register and login
- Can create posts
- Can update their own posts
- Can view all posts
- Cannot delete posts
- Cannot access admin endpoints

### Admin Role (`admin`)
- All user permissions
- Can update any post
- Can delete any post
- Can view all users
- Can delete users (except themselves)
- Can change user roles (except their own)

## Error Responses

### 400 Bad Request
```json
{
  "data": null,
  "error": {
    "statusCode": 400,
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "data": null,
  "error": {
    "statusCode": 401,
    "message": "Access token required"
  }
}
```

### 403 Forbidden
```json
{
  "data": null,
  "error": {
    "statusCode": 403,
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "data": null,
  "error": {
    "statusCode": 404,
    "message": "User not found"
  }
}
```

## Setup Instructions

1. Install dependencies:
   ```bash
   cd core
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Update JWT_SECRET in .env file with a secure secret key.

4. Create an admin user:
   ```bash
   npm run create-admin
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

## JWT Token Usage

Include the JWT token in the Authorization header for protected endpoints:
```
Authorization: Bearer <your-jwt-token>
```

Tokens expire after 24 hours by default (configurable via JWT_EXPIRES_IN environment variable).

## Security Features

- Passwords are hashed using bcryptjs with 12 salt rounds
- JWT tokens are signed and verified
- Role-based access control
- Input validation and sanitization
- Error handling without sensitive information exposure