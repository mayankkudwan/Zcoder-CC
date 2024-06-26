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
## Sign Up and Sign In
1. **Sign up for a new account**:

- Navigate to the sign-up page and enter your details (username, email, password).
- Click on the sign-up button to create a new account.
- Upon successful registration, you'll be redirected to the homepage.
- Sign in with existing credentials:
2. **Sign in with existing credentials**
- If you already have an account, navigate to the sign-in page.
- Enter your registered email and password.
- Click on the sign-in button to access your account.
- Upon successful sign-in, you'll be redirected to the homepage.
## Search Handle
1. **Search for Codeforces user profiles**:
- On the homepage, locate the search handle option in the navbar.
- Enter the Codeforces handle (username) of the user you want to search for.
- Click on the search button to initiate the search.
- The application will fetch and display the Codeforces profile information of the specified user.
- You can click on the profile link to visit the Codeforces profile directly.
## Upcoming Contests
1. **View upcoming contests**:
- Navigate to the sidebar on the homepage.
- The sidebar contains a list of upcoming contests fetched from Codeforces.
- Each contest entry includes the contest name and start time.
- Click on any contest link to go to the Codeforces contest page for more details.
- The contests are sorted by their start time, with the nearest contests appearing first.
## Codeforces Problems
1. **Browse Codeforces problems**:
- On the homepage, scroll through the list of Codeforces problems.
- Problems are categorized by their rating (difficulty level).
- Each rating category displays 5 problems.
- Click on the problem name or link to view the problem statement on the Codeforces website.
- You can mark a problem as "done" if you have completed it, providing a visual indication of your progress.
- This usage guide provides step-by-step instructions for utilizing the main features of the Zcoder application, ensuring users can efficiently navigate, search for Codeforces profiles, explore upcoming contests, and manage their problem-solving activities.
This usage guide provides step-by-step instructions for utilizing the main features of the Zcoder application, ensuring users can efficiently navigate, search for Codeforces profiles, explore upcoming contests, and manage their problem-solving activities.
