🎯 Criss-Cross – Event & Hackathon Management System

Criss-Cross is a full-stack web application that allows students to discover and register for events, organizers to create and manage events, and admins to manage users and platform activities.

This platform is designed to simplify hackathon and event management in colleges or communities.

🚀 Features
👨‍🎓 Student

Register & Login

Discover events based on interests

Search and filter events

Register for events

Bookmark events

View registered events

🧑‍💼 Organizer

Create new events

Update existing events

Manage event details

View registered participants

Delete events

🛡️ Admin

Manage Students & Organizers

Approve / Remove events

Monitor platform activity

Control user access

🏗️ Tech Stack
Frontend

React.js

React Router

Tailwind CSS (if used)

Axios

React Icons

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

📂 Project Structure
criss-cross/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── sidebar.jsx
│   ├── discoverevents.jsx
│   └── updateevent.jsx
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/criss-cross.git
cd criss-cross

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start backend server:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm start


App will run at:

http://localhost:3000


Backend runs at:

http://localhost:5000

🗄️ Database Design (MongoDB Collections)
Users Collection

name

email

password

role (student / organizer / admin)

interests

Events Collection

title

description

date

location

category

organizerId

participants

status (approved / pending)

🔐 Authentication

JWT-based authentication

Role-based access control

Protected routes for Admin and Organizer

📌 Future Enhancements

Email notifications

Event approval workflow

Real-time event updates

Dashboard analytics

Payment integration

Deployment using Docker

🤝 Contributing

Fork the repository

Create a new branch

Make your changes

Submit a Pull Request

📄 License

This project is developed for educational and project purposes
