# Personal_Finance_Manager
The Personal Finance Manager is a web application designed to help users track their expenses, set budgets, and visualize their financial data in real-time. Built with a modern tech stack, this application leverages Redis for real-time updates and Socket.IO for seamless communication between the frontend and backend.

# Features
Expense Tracking: Easily log and categorize daily expenses.
Real-Time Updates: Get instant updates on expense changes using Redis and Socket.IO.
Data Visualization: Interactive charts and graphs to visualize financial data.
User Authentication: Secure login and registration system with JWT-based authentication.
Responsive Design: Works seamlessly on desktop and mobile devices.

#Tech Stack
Frontend
React: A JavaScript library for building user interfaces.
React Router: For handling client-side routing.
Axios: For making HTTP requests to the backend.
AOS (Animate On Scroll): For scroll-triggered animations.
CSS Modules: For styling components.

Backend
Node.js: A JavaScript runtime for building the backend.
Express: A web framework for Node.js.
MongoDB: A NoSQL database for storing user and expense data.
Redis: An in-memory data store used for real-time updates.
Socket.IO: For enabling real-time, bidirectional communication.
JWT (JSON Web Tokens): For secure user authentication.

#Installation

Prerequisites
Node.js (v16 or higher)
MongoDB (v5 or higher)
Redis (v6 or higher)
NPM or Yarn

#Install Dependencies

For the backend:  
cd backend
npm install

For the frontend:
cd ../frontend
npm install

#Set Up Environment Variables

Create a .env file in the backend directory and add the following:

MONGO_URI=mongodb://localhost:27017/finance-manager
JWT_SECRET=your_jwt_secret_key

Start the Backend Server
cd backend
npm start

Start the Frontend Development Server

cd ../frontend
npm start

Access the Application
Open your browser and navigate to http://localhost:3000.
