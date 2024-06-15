import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Problemset from './ProblemSet';


export const HomePage = () => {
  const [searchHandle, setSearchHandle] = useState('');
  const [contests, setContests] = useState([]);
  const [problems, setProblems] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/v1/logout');
      localStorage.removeItem('token');
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/codeforces/${searchHandle}`);
      const { profileUrl } = response.data;
      window.location.href = profileUrl;
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('/api/upcoming-contests');
        setContests(response.data);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    fetchContests();
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('/api/codeforces/problems');
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []); // Empty dependency array to fetch problems only once on component mount

  const styles = {
    sidebar: {
      height: '100vh',
      width: '350px',
      padding: '30px',
      backgroundColor: '#343a40',
      color: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '0px',
      position: 'fixed',
      top: '140px',
      left: 0,
    },
    header: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '20px',
    },
    contestList: {
      listStyleType: 'none',
      padding: 0,
      marginTop: '10px',
    },
    contestItem: {
      marginBottom: '10px',
      transition: 'background-color 0.3s ease',
    },
    contestLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '20px',
      transition: 'color 0.3s ease, text-decoration 0.3s ease',
    },
    contestTime: {
      fontSize: '16px',
      color: '#6c757d',
    },
  };

  return (
    <div>
      {/* Appbar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        {/* Left side */}
        <div>
          <h1 className="text-white text-xl font-bold">Zcoder</h1>
        </div>
        {/* Right side */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Handle"
            value={searchHandle}
            onChange={(e) => setSearchHandle(e.target.value)}
            className="bg-gray-700 text-white py-2 px-4 rounded mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
          >
            Search
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Your homepage content here */}
        <h1 className="text-3xl font-bold mb-4">Welcome to Zcoder Platform</h1>

        {/* Display upcoming contests */}
        <div style={styles.sidebar}>
          <h4 style={styles.header}>Upcoming Contests</h4>
          <ul style={styles.contestList}>
            {contests.map((contest, index) => (
              <li
                key={index}
                style={{ ...styles.contestItem, backgroundColor: index % 2 === 0 ? '#454d55' : '#343a40' }}
              >
                <a
                  href={contest.url}
                  style={styles.contestLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {contest.name}
                </a>
                <br />
                <span style={styles.contestTime}>{new Date(contest.start).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Display problems */}
        <div style={{ marginLeft: '400px', marginTop: '-150px' }}>
          <Problemset problems={problems} />
        </div>
      </div>
    </div>
  );
};