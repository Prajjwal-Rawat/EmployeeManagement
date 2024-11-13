# Employee Management System (MERN Stack)

A web-based Employee Management System built with the MERN stack (MongoDB, Express, React, Node.js) that allows administrators to manage employee records. The system supports adding, updating, and viewing employee details. 

## Features
- Add new employees with their details (name, email, mobile, designation, gender, course, image).
- Update employee information.
- View all employees in a table.
- Image upload feature for employee profile.
- Input validation for email.

## Technologies Used
- **MongoDB**: NoSQL database for storing employee data.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **React.js**: Frontend library to create a dynamic user interface.
- **Node.js**: JavaScript runtime for building the server-side of the application.
- **Multer**: Middleware for handling `multipart/form-data`, used for image uploads.
- **React Hot Toast**: For displaying notifications.
- **Axios**: For making HTTP requests from the client-side.

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/employee-management.git
   cd employee-management
   cd backend
   
Install the dependencies:
npm install

Create a .env file in the root of the backend directory and add the following variables:

PORT=5000
MONGODB_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret-key
Start the backend server:

npm start
Frontend Setup
Navigate to the frontend directory:

cd frontend
Install the dependencies:

npm install
Start the React development server:
npm start

Usage
Open the browser and go to http://localhost:3000 to access the Employee Management System.
You can create, edit, and view employee records.
API Endpoints
1. POST /api/v1/ - Create a new employee
Request body:
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "designation": "Manager",
  "gender": "Male",
  "course": "BCA",
  "image": "image-file"
}
2. GET /api/v1 - Get all employees
Response body:

json
  {
    "_id": "employee-id",
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "designation": "Manager",
    "gender": "Male",
    "course": "BCA",
    "image": "image-url"
  }
  
3. PUT /api/v1/ - Update an employee's details
Request body:

json
{
  "name": "Updated Name",
  "email": "updated-email@example.com",
  "mobile": "0987654321",
  "designation": "Developer",
  "gender": "Female",
  "course": "MCA",
  "image": "updated-image-file"
}
5. DELETE /api/v1/ - Delete an employee
No request body required.

Contributing
Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request.
