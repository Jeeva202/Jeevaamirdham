import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Chip from '@mui/material/Chip';
import './todayThoughts.css';

export default function TodayThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [currentThought, setCurrentThought] = useState(0);

  // Fetch thoughts from API
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL + '/todays-thoughts'); // Replace with your actual API endpoint
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };

    fetchThoughts();
  }, []);

  // Cycle through thoughts every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 15000); // 15 seconds delay

    return () => clearInterval(timer);
  }, [thoughts.length]);

  const handleThoughtChange = (index) => {
    setCurrentThought(index);
  };

  return (
    <div className="today-thoughts-container">
      <Container maxWidth="lg" sx={{ padding: "8px 0" }}>
        {thoughts.length > 0 ? (
          <div className="today-thoughts-content">
            <Chip
              label="• Today's Thought"
              size="small"
              sx={{
                backgroundColor: "#DC6803",
                color: "#FFFFFF",
                fontSize: { lg: '0.7rem', sm: '0.5rem', md: '0.6rem' },
              }}
            />
            <div className="today-thoughts-text">
              <h4>
                <span className="highlight">{currentThought + 1}.</span>{" "}
                {thoughts[currentThought]?.content}
              </h4>
            </div>
            <div className="thoughts-navigation">
              {thoughts.map((_, index) => (
                <button
                  key={index}
                  className={`nav-dot ${currentThought === index ? 'active' : ''}`}
                  onClick={() => handleThoughtChange(index)}
                  aria-label={`Thought ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading thoughts...</p>
        )}
      </Container>
    </div>
  );
}
