# Refactored Blog API

This is a Node.js and Express API for a simple blog, refactored for better structure, reliability, and maintainability.

## Features

-   RESTful API for CRUD operations on posts.
-   Pagination, sorting, and searching for posts.
-   Centralized and consistent error handling.
-   Atomic file writes to prevent data corruption.
-   Request logging.
-   Validation for incoming data.

## Project Structure

The project follows a standard layered architecture:

-   `/src/routes`: API route definitions.
-   `/src/controllers`: Request/response handling logic.
-   `/src/models`: Data access and business logic.
-   `/src/middleware`: Express middleware for cross-cutting concerns.
-   `/src/utils`: Helper utilities like validation and file storage.
-   `/src/config`: Environment configuration.
-   `/data`: JSON data storage.

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file from the `.env.example` and set your desired `PORT`.
    ```bash
    cp .env.example .env
    ```

## Running the Application

-   To start the server:
    ```bash
    npm start
    ```
-   To start in development mode with auto-reloading (requires `nodemon`):
    ```bash
    npm run dev
    ```

The server will be running at `http://localhost:3000`.

## API Endpoints

-   `GET /api/posts`: Get all posts with pagination, sorting, and searching.
    -   Query Params: `page`, `limit`, `sort`, `order`, `q`
-   `GET /api/posts/:id`: Get a single post by its ID.
-   `POST /api/posts`: Create a new post.
-   `PUT /api/posts/:id`: Update an existing post.
-   `DELETE /api/posts/:id`: Delete a post.
