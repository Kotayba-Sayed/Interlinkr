Backend for Interlinkr
This repository contains the backend implementation for Interlinkr, a social media platform.

Features
Posts: CRUD operations for creating, reading, updating, and deleting posts.
Comments: CRUD operations for managing comments on posts.
Likes: Endpoints for liking/unliking posts.
Users: User authentication, registration, login, profile management, and admin access for user management.
Technologies Used
Express: Node.js web application framework used for routing.
Sequelize: Promise-based Node.js ORM for database interactions.
MySQL: Relational database management system.
bcryptjs: Library for hashing passwords.
jsonwebtoken: Library for generating and verifying JSON Web Tokens for authentication.
cors: Middleware for enabling Cross-Origin Resource Sharing.
nodemon: Utility for auto-restarting the server during development.
dotenv: Library for loading environment variables from a .env file into process.env.


Setup
Clone the repository.
Install dependencies using npm install.
Set up the database configuration in config.json.
Set up environment variables in a .env file if necessary.
Run the server using npm start or npm run devStart for development with nodemon.

API Endpoints
POST /usersRoute: Register a new user.
POST /usersRoute/login: Authenticate a user and receive a JWT token.
PUT /usersRoute/changepassword: Change user's password.
GET /usersRoute/profile: Get current user's profile.
GET /usersRoute/all: Get all user profiles.
GET /usersRoute/:id: Get a specific user profile.
DELETE /usersRoute/Delete/:id: Delete a user profile (admin access required).
GET /postRoute: Get all posts.
POST /postRoute: Create a new post (admin access required).
PUT /postRoute/:id: Update a post (admin access required).
DELETE /postRoute/:id: Delete a post (admin access required).
GET /postRoute/:postId/like: Get the number of likes for a post.
POST /LikeRoute: Like/unlike a post.
GET /commentRoute/:postId: Get all comments for a post.
POST /commentRoute/:postId: Add a comment to a post.
PUT /commentRoute/:id: Update a comment (admin access required).
DELETE /commentRoute/:id: Delete a comment (admin access required).


Contributors
[Your Name]
[Kotayba Sayed]


This project is open for public use without any attached license. You are welcome to use, modify, and distribute the code for any purpose without restrictions.
