# React User Management Application

A React application that integrates with the Reqres API to perform basic user management functions.

## 🚀 Features

- Basic login screen using email and password.
- Displays a paginated list of users fetched from the `/api/users` endpoint.
- Implements pagination to navigate through user pages.
- Provides Update and Delete user's data options for each user.
- Update User: Opens a form to update user details (first name, last name, email) using the `/api/users/{id}` endpoint.
- Search functionality to filter users by name or email.


## 🛠️ Tech Stack

- React.js with Tailwind CSS
- React Router DOM for routing
- Axios for API requests

## 📦 Libraries and Dependencies

- `axios` – For making HTTP requests.
- `react-router-dom` – For routing.
- `tailwindcss` – For designing the UI.

## ⚙️ Setup Instructions

### 1. **Clone the Repository**

 ```
git clone https://github.com/SHIKHAR-Bajpai/EmployWise-Assignment-mern.git
cd frontend
```

### 2. **Install Dependencies**

```
npm install
```

### 3. Start the Development Server

```
npm run dev
```

By default, the application will run on:

http://localhost:5173

## 🔥 Usage Instructions

- Login with following credentials:
- **Email: eve.holt@reqres.in**
- **Password: cityslicka**
- Get a paginated list of users.
- Edit and delete a user.

## 🧠 Assumptions and Considerations

- The application assumes that the Reqres API (https://reqres.in/) is available and functioning as expected.
- Login credentials are hardcoded for the assignment (eve.holt@reqres.in and cityslicka).

## 🧩 API Endpoints

### 🔐 Auth APIs:
- POST: https://reqres.in//api/login 

### 👥 Users APIs:
- GET: https://reqres.in//api/users?page={page} 
- PUT: https://reqres.in//api/users/{id} 
- DELETE: https://reqres.in//api/users/{id} 

## 🔗 Hosted Link

Application is hosted at: https://employwise-assignment-mern.onrender.com