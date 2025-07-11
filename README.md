
# PropZilla API

A backend API for managing real estate property listings, inspired by platforms like Zillow. Built using Node.js, Express.js, and MongoDB, it includes secure user authentication, role-based access control, and advanced property search features.

---

## Features

- ✅ User Registration & Login (JWT Authentication)
- ✅ Role-Based Access Control (Admin/User)
- ✅ CRUD Operations for Properties
- ✅ Search with filters (location, price, bedrooms)
- ✅ Pagination support
- ✅ Password update functionality
- ✅ Data validation with `express-validator`
- ✅ Centralized error handling
- ✅ API versioning (`/api/v1`)
- 🧪 Postman collection available

---

## 🧰 Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Runtime     | Node.js           |
| Framework   | Express.js        |
| Database    | MongoDB + Mongoose|
| Auth        | JWT               |
| Validation  | express-validator |

---

## 📁 Folder Structure

PropZilla API/
│
├── src/
│ ├── users/ 
│ ├── properties/ 
│ ├── middleware/ 
│ 
├── .env 
├── .gitignore 
├── package.json 
├── index.js 
├── README.md 

---

API Endpoints:

Users
------
POST /api/v1/users/register — Register user

POST /api/v1/users/login — Login and receive JWT

GET /api/v1/users/me — Get current user profile

PATCH /api/v1/users/update-password — Update password

GET /api/v1/users — Admin only: get all users

PATCH /api/v1/users/:id/role — Admin: change user role

DELETE /api/v1/users/:id — Admin: deactivate user

Properties
-----------
POST /api/v1/properties — Create property (Admin only)

GET /api/v1/properties — List/search properties

GET /api/v1/properties/:id — Get property by ID

PATCH /api/v1/properties/:id — Update property

DELETE /api/v1/properties/:id — Delete property
