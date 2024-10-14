I successfully developed a Webtoon Library App for Animemangatoon.com, incorporating the following features:

Home Page:

Displayed a list of popular webtoons, complete with titles, thumbnail images, and brief descriptions.
Implemented an "Add to Favorites" button for each webtoon, allowing users to add items to their Favorites Page seamlessly.
Webtoon Detail Page:

Accessible by clicking on a webtoon title from the Home Page.
Created a detailed page for each webtoon, featuring an enlarged image, comprehensive description, and a user comments section.
Data was dynamically fetched via a RESTful API, ensuring users receive the most up-to-date information.
User Authentication:

Implemented a simple login and registration system using JWT (JSON Web Tokens).
Allowed users to create accounts and log in to access exclusive features, such as adding webtoons to their favorites.
Favorites Page:

Developed a dedicated page for logged-in users to view their favorite webtoons.
Favorites are stored dynamically in a MongoDB or MySQL database, allowing for persistent user preferences.
Deployment:

The backend was deployed on Render, and the frontend was hosted on Netlify.
Ensured the application is secure and properly manages environment variables to protect sensitive information.
Project Repository:

The complete project was uploaded to GitHub, following the assignment submission guidelines.
Commands to Run the Application
To run the application locally, follow these steps:

Clone the Repository
git clone https://github.com/Misbah-fatma/Assignment-forGhackk/

Frontend (React)
Navigate to the frontend directory:
cd client

Install dependencies:
npm install

Start the frontend server:
npm start

Backend (Node.js/Express)
Navigate to the backend directory:
cd server

Install dependencies:
npm install

Start the backend server:
npm run start

Environment Variables
Ensure to set up the following environment variables in your .env file for both the frontend and backend:

Backend:
DATABASE_URL (MongoDB or MySQL connection string)
JWT_SECRET (Secret key for JWT)

Frontend:
REACT_APP_API_URL (Base URL for the backend API)
