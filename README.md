# URL Shortener Project (MVC Structure)

This project is a simple URL Shortener. It helps you turn long URLs into short ones. It uses Node.js, Express, and MongoDB. The project is built with the MVC (Model-View-Controller) structure.

## Features

- Shorten long URLs
- Redirect with short URLs
- Show user’s own URL list
- Simple logging system
- Token check with middleware

## Folder Structure

- controllers/ # Gets requests and calls services
- middleware/ # Checks token before request
- models/ # MongoDB schemas
- repository/ # MongoDB database functions
- routers/ # API route definitions
- services/ # Business logic functions
- utils/ # Functions (generateToken, logger)
- .env # Environment variables
- index.js # Main server file

## Technologies Used

- Node.js
- dotenv
- Express.js
- MongoDB (Mongoose)
- Pino (for logging)

## How to İnstall

- Download the project, install dependencies, configure environment variables, and run the server:

- git clone <URLSHORTENERMVC-main>
- cd URLSHORTENERMVC-main
- npm install express mongoose dotenv pino
- PORT=3000
- MONGO_CONNECT=<your-mongodb-connection-string>

## 🚀 How to Use

- If you don’t have Postman, please install it to test API endpoints.
- Start with node index.js in your terminal

- [POST] http://localhost:3000/auth/register Body: { username, password }
- [POST] http://localhost:3000/auth/login Body: { username, password }
- [POST] http://localhost:3000/url/shorten Body: { token, originalUrl }
- [GET] http://localhost:3000/user/list → No token required, everyone can view the URLs.
- [GET] http://localhost:3000/user/myurls → Shows URLs specific to the logged-in user.
- [GET] http://localhost:3000/url/:shortUrl → Redirects using the provided short URL.
