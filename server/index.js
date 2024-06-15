const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { Problem } = require('./models/User');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

app.get('/api/codeforces/:handle', async (req, res) => {
    const { handle } = req.params;
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        const profileUrl = `https://codeforces.com/profile/${handle}`;
        res.status(200).json({ profileUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Codeforces profile', error: error.message });
    }
});

app.get('/api/upcoming-contests', async (req, res) => {
    try {
      const response = await axios.get('https://codeforces.com/api/contest.list');
      const data = response.data;
  
      if (data.status === 'OK') {
        // Filter upcoming contests
        const upcomingContests = data.result
          .filter(contest => contest.phase === 'BEFORE')
          .map(contest => ({
            name: contest.name,
            start: new Date(contest.startTimeSeconds * 1000),
            url: `https://codeforces.com/contest/${contest.id}`
          }));
  
        // Sort by start time (optional)
        upcomingContests.sort((a, b) => a.start - b.start);
  
        // Send the list of upcoming contests as JSON response
        res.status(200).json(upcomingContests.slice(0, 3)); // Adjust number of contests as needed
      } else {
        console.error('Error fetching contests:', data.comment);
        res.status(500).json({ error: 'Error fetching contests' });
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
      res.status(500).json({ error: 'Error fetching contests' });
    }
  });

  app.get('/api/codeforces/problems', async (req, res) => {
    try {
      // Make a request to Codeforces API
      const response = await axios.get('https://codeforces.com/api/problemset.problems');
      
      // Extract relevant data from the response
      const problems = response.data.result.problems.map(problem => ({
        name: problem.name,
        link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`,
        rating: problem.rating
      }));
      
      res.json(problems);
    } catch (error) {
      console.error('Error fetching problems from Codeforces:', error);
      res.status(500).json({ error: 'Failed to fetch problems from Codeforces' });
    }
  });

  // Endpoint to fetch and save problems
app.post('/api/saveProblems', async (req, res) => {
    try {
        const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
        let savedProblems = [];

        const response = await axios.get('https://codeforces.com/api/problemset.problems');
        const problems = response.data.result.problems;

        for (const rating of ratings) {
            const filteredProblems = problems.filter(problem => problem.rating === rating).slice(0, 5);

            for (const problem of filteredProblems) {
                const problemData = {
                    name: problem.name,
                    contestId: problem.contestId,
                    index: problem.index,
                    rating: problem.rating,
                    tags: problem.tags,
                };

                const newProblem = new Problem(problemData);
                await newProblem.save();
                savedProblems.push(newProblem);
            }
        }

        res.status(200).json(savedProblems);
    } catch (error) {
        console.error('Error fetching or saving problems:', error);
        res.status(500).json({ message: 'Error fetching or saving problems', error });
    }
});

// New endpoint to fetch problems from the database
app.get('/api/fetchProblems', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems from the database:', error);
        res.status(500).json({ message: 'Error fetching problems', error });
    }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
