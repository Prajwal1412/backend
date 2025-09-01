Node.js + Express backend for ShoppyGloble with MongoDB (via Mongoose) for handling users, products, and cart operations.

🚀 Features

User authentication & management

Product management

Cart handling

RESTful API structure with Express routes

MongoDB integration using Mongoose

📂 Project Structure
backend/
│── Controller/
│ ├── cart.controller.js
│ ├── products.controller.js
│ └── user.controller.js
│── Model/
│ ├── cart.model.js
│ ├── products.model.js
│ └── user.model.js
│── Routes/
│ ├── cart.routes.js
│ ├── products.routes.js
│ └── user.routes.js
│── node_modules/
│── package.json
│── server.js (or app.js - check your entry point)

🛠️ Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose ORM

Dev Tools: Nodemon

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/Prajwal1412/backend
cd backend

Install dependencies
npm install

Environment Configuration
Create a .env file in the root directory and add the following environment variables:
SECRET_KEY="Your_Secret_Key"
PORT="PORT NUMBER"
MONGO_URI="mongodb URI"

Run the server (development mode with hot reload):
npm start
