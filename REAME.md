
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

## Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Runtime     | Node.js           |
| Framework   | Express.js        |
| Database    | MongoDB + Mongoose|
| Auth        | JWT               |
| Validation  | express-validator |

---

## Folder Structure

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
