# Full Stack Development Journey 🚀

Welcome to my Full Stack Development learning journey!

This repository contains the projects, practice files, and mini websites I build while learning modern web development step by step.
## 📈 Learning Journey

### Day 1 — Personal Profile Page
Built my first personal webpage using basic HTML concepts.

Concepts Learned:
- Headings
- Paragraphs
- Images
- Links
- Lists

---

### Day 2 — Forms & User Inputs
Learned how forms work in HTML and practiced creating user input sections.

Concepts Learned:
- Forms
- Input Fields
- Labels
- Buttons
- Text Areas

---

### Day 3 — Multi-Page Website
Built a multi-page website and learned how webpages connect together.

Concepts Learned:
- Navigation Links
- Multiple HTML Pages
- Website Structure
- Internal Linking

---

### Day 4 — Modern CSS Styling
Started learning CSS and explored how styling changes the overall feel of a website.

Project:
- XENON X1 Landing Page

Concepts Learned:
- Colors
- Typography
- Spacing
- Hover Effects
- Buttons
- Google Fonts

---

### Day 5 — Flexbox Layouts
Built a Smart Vending Machine UI and learned how Flexbox helps create responsive layouts.

Project:
- SMARTVEND UI

Concepts Learned:
- display: flex
- justify-content
- align-items
- flex-wrap
- Card Layouts
- Responsive Alignment

---

### Day 6 — CSS Grid Dashboard
Built a modern music streaming dashboard using CSS Grid.

Project:
- VIBEBOX Music Dashboard

Concepts Learned:
- display: grid
- grid-template-columns
- Dashboard Layouts
- Sidebar Design
- UI Structuring
- Modern Dark UI

---

### Day 7 — Bootstrap Responsive Website
Built a responsive fitness landing page using Bootstrap and custom CSS.

Project:
- PULSEFIT Landing Page

Concepts Learned:
- Bootstrap Grid System
- Responsive Design
- Bootstrap Components
- Utility Classes
- Animated Gradients
- Modern UI Design

---

### Day -8 Basic js
A modern shopping cart web app built using HTML, CSS, and JavaScript.

Project:
-NEOCART 🛒

 📚 What I Learned
- JavaScript variables and functions
- Event listeners
- DOM manipulation
- Updating UI dynamically
- Working with dropdown menus
- Building interactive web apps 

### Day 9 — Intermediate JavaScript Playlist Generator 🎵

Built a smart mood-based playlist generator using JavaScript logic and dynamic UI themes.

Project:
- MOODSYNC Playlist Generator

Concepts Learned:
- Arrays and Objects
- JavaScript Functions
- Random Playlist Shuffling
- Conditional Logic
- Dynamic Theme Switching
- Working with Multiple Playlists
- UI Personalization
- JavaScript Logic Flow

### Day 10 — Advanced Drum Kit DOM Project 🥁

Built an interactive futuristic Drum Kit website using JavaScript DOM Manipulation.

Project:
- NEOBEATS Drum Kit

Concepts Learned:
- DOM Manipulation
- Keyboard Event Listeners
- Mouse Click Event Listeners
- Audio Control with JavaScript
- Dynamic Button Animations
- JavaScript Functions
- Event Handling
- CSS Animations & Glow Effects

### Day 11 — Node.js + Express + EJS Chat Application 💬

Built a futuristic Discord-inspired community chat application using Node.js, Express, and EJS.

Project:
- VIBECHAT

Concepts Learned:
- Node.js Basics
- Express.js Routing
- EJS Templating
- GET & POST Requests
- Middleware
- Serving Static Files
- Dynamic Rendering
- Form Handling
- Full Stack Project Structure

### Day 12 — Full Stack Capstone Project ⚡

Built a futuristic student productivity dashboard called STUDYFLOW using Node.js, Express, EJS, and JavaScript.

Project:
- STUDYFLOW

Concepts Learned:
- Full Stack Project Structure
- Node.js & Express.js
- EJS Templating
- Dynamic Rendering
- Form Handling
- DOM Manipulation
- JavaScript Logic
- Theme Toggling
- Dynamic Task Suggestions
- Deadline Tracking System
- Priority-Based UI Design
- Glassmorphism UI
- Floating UI Animations
  
### Day 13 — Full Stack Capstone Project with fetch API
Project:
 - STUDYFLOW
 Concepts Learned:
 -Fetch API
 -Async / Await
 -JSON Data Handling
 -Browser Geolocation API
 -Error Handling
 -Local Storage
 -Dynamic DOM Manipulation
 -Real-World API Integration

### Day 14 — Integration with More APIs ⚡
Project:
- STUDYFLOW

Concepts Learned:
- REST API fundamentals
- Express.js routes
- GET requests
- Fetch API
- JSON responses
- Communication between two applications
- Client-Server architecture concepts

# Day-15 StudyFlow API Task Management System

## Overview

StudyFlow is a Full Stack project that demonstrates communication between two separate Express.js applications using REST APIs.

The project consists of:

### Student Dashboard

* Stores study tasks
* Provides API endpoints
* Manages task data

### Teacher Dashboard

* Fetches student tasks
* Creates new tasks
* Deletes existing tasks
* Communicates with the Student Dashboard through API requests

This project simulates a real-world client-server architecture where multiple applications exchange data through REST APIs.

---

## Features

### GET Request

Teachers can fetch tasks from the Student Dashboard.

### POST Request

Teachers can create and send new tasks directly to the Student Dashboard.

### DELETE Request

Teachers can remove tasks through API endpoints.

### REST API Integration

Applications communicate using:

* GET
* POST
* DELETE

requests.

### Dynamic Task Management

Tasks include:

* Title
* Subject
* Deadline
* Priority

### Express.js Backend

Built using:

* Node.js
* Express.js
* EJS
* JavaScript

---

## Technologies Used

* Node.js
* Express.js
* JavaScript
* EJS
* REST APIs
* Fetch API
* HTML5
* CSS3

---

## What I Learned

* REST API fundamentals
* Client-server communication
* JSON data exchange
* API route creation
* Fetch API requests
* Cross-application communication
* CRUD operations
* Backend architecture concepts

---

## Future Improvements

* PUT request support
* Database integration (MongoDB)
* Authentication system
* Real-time updates using Socket.IO
* User roles (Teacher / Student)

---
🚀 Day 16 of My Full Stack Web Development Journey

Today, I built a full-stack project called **StudyFlow** — a Student & Teacher Task Management System powered by PostgreSQL.

This project was a major step forward because I moved beyond basic CRUD applications and implemented communication between two separate services.

👨‍🎓 Student Dashboard:

* Create and manage study tasks
* Set priorities and deadlines
* Import assignments from teachers
* PostgreSQL-backed task storage

👩‍🏫 Teacher Dashboard:

* Create assignments
* Manage shared tasks
* Synchronize assignments with students

💡 One of the most interesting parts of this project was designing a Teacher → Student task synchronization workflow using PostgreSQL. Teacher-created assignments can be imported into the student dashboard while maintaining database relationships through linked IDs.

Through this project, I practiced:

✅ PostgreSQL Integration
✅ Express.js REST APIs
✅ CRUD Operations
✅ Multi-Service Architecture
✅ Database Relationships
✅ Fetch API & Async JavaScript
✅ Data Synchronization Logic
✅ Full Stack Development

💻 Tech Used:

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* PostgreSQL
* Axios

# StudyFlow - Authentication System Upgrade (Day 17)

## Overview

Today I upgraded StudyFlow by implementing a complete user authentication system using PostgreSQL and bcrypt.

This upgrade allows users to create accounts, securely store credentials, and log in to access the application.

## Features Implemented

### User Registration

* Create a new account
* Store user details in PostgreSQL
* Prevent duplicate email registrations

### Password Security

* Passwords are hashed using bcrypt
* 10 salt rounds for enhanced security
* Plain-text passwords are never stored

### User Login

* Verify user credentials
* Compare passwords using bcrypt.compare()
* Redirect authenticated users to the StudyFlow dashboard

### Error Handling

* Email already registered
* User not found
* Incorrect password
* User-friendly feedback displayed directly on the authentication page

## Technologies Used

* Node.js
* Express.js
* PostgreSQL
* bcrypt
* EJS
* HTML5
* CSS3
* JavaScript

## What I Learned

* Authentication fundamentals
* Password hashing and salting
* Secure credential storage
* User validation workflows
* PostgreSQL integration with Express
* Building better user experiences through form validation and error handling

## Next Steps

* Session Management
* Protected Routes
* Logout Functionality
* User-specific dashboards
* Role-based access (Teacher / Student)

## Project Status

StudyFlow is evolving from a simple task manager into a full-stack web application with secure authentication and database-driven architecture.
# 📚 StudyFlow – Day 18

## 🔐 Authentication & User-Specific Dashboard

Today, I transformed StudyFlow from a shared task management system into a secure multi-user application by implementing authentication, session management, and user-specific task isolation.

---

## 🚀 Features Implemented

### 👤 User Registration

* Created a registration system for new users.
* User details are stored in PostgreSQL.
* Prevented duplicate email registrations.

### 🔒 Secure Password Hashing

* Integrated bcrypt for password security.
* Passwords are hashed before being stored in the database.
* Improved application security following industry practices.

### 🔑 User Login System

* Added login functionality.
* Validates user credentials against stored records.
* Displays proper error messages for invalid login attempts.

### 🧠 Session-Based Authentication

* Implemented Express Session.
* Maintains login state across requests.
* Restricted access to protected routes.

### 🚪 Logout Functionality

* Added secure logout support.
* Destroys active sessions.
* Redirects users back to the authentication page.

### 📋 User-Specific Tasks

* Added a `user_id` column to the tasks table.
* Each user now sees only their own tasks.
* Prevented cross-user access to task data.

### 👨‍🏫 Teacher Task Integration

* Updated teacher task imports to automatically associate imported tasks with the currently logged-in user.
* Teacher tasks now remain isolated per user.

### 🎨 UI Improvements

* Styled authentication pages to match the StudyFlow theme.
* Added visible error messages for registration and login failures.
* Improved overall user experience.

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* PostgreSQL
* EJS
* bcrypt
* express-session

---

## 🎯 What I Learned

* Password hashing with bcrypt
* Session-based authentication
* Route protection
* User authorization concepts
* Multi-user database architecture
* Secure login and registration flows
* Associating data with authenticated users

---

## 📌 Next Goal

Continue improving StudyFlow by adding advanced user experience features and making the application feel even closer to a production-ready platform.

# Day-19 🎬 CineFinder

CineFinder is a React-based movie search application that allows users to search for movies, browse movie information, and save their favorite movies for quick access.

## 🚀 Features

- Search movies using the OMDb API
- Dynamic movie card display
- Responsive grid layout
- Modern UI design
- Sidebar navigation
- Favorites system
- Add and remove favorite movies
- React Hooks for state management
- Animated gradient background

## 🛠️ Technologies Used

- React
- JavaScript
- CSS3
- Vite
- OMDb API




## 🎯 Goal

My goal is to improve my frontend and backend development skills by consistently building projects and learning modern technologies.

I’m also documenting this journey publicly through daily LinkedIn posts to track my progress and stay consistent.

## 🔗 Connect With Me

LinkedIn:
https://www.linkedin.com/in/michael-josewin-5453543a1/

GitHub:
https://github.com/michaeljosewin2007-lgtm/Full-Stack-Development

---

⭐ Still learning. Still building. Still improving.
