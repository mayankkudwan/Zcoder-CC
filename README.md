# Zcoder

Zcoder is a MERN stack project designed to provide a user-friendly interface for coding enthusiasts to track and participate in programming contests and solve coding problems. 
The project incorporates a sign-in and sign-up functionality, a dynamic homepage with search and logout options, a sidebar with upcoming contests, and a curated list of Codeforces problems.
The platform allows users to mark problems as done and provides relevant links for ease of access.

## Features

- **User Authentication**: Sign up and sign in pages to register and log in users.
- **Search Handle**: Search for Codeforces user profiles directly from the homepage.
- **Upcoming Contests**: Sidebar that displays details of upcoming contests with links to each contest.
- **Codeforces Problems**: Homepage displays 5 problems from Codeforces for each rating category with links to the problems and an option to mark them as done.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: Codeforces API for fetching contest and problem data

## Installation

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```
## How to Run

To start the frontend server, run:
```bash
cd client
npm run dev
``` 

To start the backend server, run:
```bash
cd server
nodemon index.js
```

## Usage
- **UserAuthentication**: Sign up for a new account or sign in with your existing credentials.
- **Search Handle**: Use the search handle option in the navbar to search for Codeforces user profiles.
- **Upcoming Contests**: View upcoming contests in the sidebar and click on the links to go to the contest page.
- **Codeforces Problems**:Browse Codeforces problems on the homepage, with the ability to mark them as done.
