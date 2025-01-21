import React, { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import './todayThoughts.css';

const thoughts = [
  {
    id: 1,
    text: "A tiny drop that falls into the ocean becomes the ocean, A small plant that blossoms on the mountain becomes the mountain. A single drop of sound (Nādam) that merges with the body, Shines as life itself, the eternal Pranava... Indeed!"
  },
  {
    id: 2,
    text: "Just as the fragrance naturally spreads from a flower, good thoughts emanate from a pure mind, bringing peace and harmony to all beings."
  },
  {
    id: 3,
    text: "Like a lotus that blooms untouched by the mud, let your consciousness rise above worldly attachments while fulfilling your duties with divine awareness."
  }
];

export default function TodayThoughts() {
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 15000); // 15 seconds delay

    return () => clearInterval(timer);
  }, []);

  const handleThoughtChange = (index) => {
    setCurrentThought(index);
  };

  return (
    <div className="today-thoughts-container">
      <Container maxWidth="lg" sx={{ padding: "8px 0" }}>
        <div className="today-thoughts-content">
          <Chip 
            label="• Today's Thought" 
            size="small" 
            sx={{backgroundColor:"#DC6803", color:"#FFFFFF", fontSize:{lg:'0.7rem', sm:'0.5rem', md:'0.6rem'}}}
          />
          <div className="today-thoughts-text">
            <h4>
              <span className="highlight">{currentThought + 1}.</span>{" "}
              {thoughts[currentThought].text}
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
      </Container>
    </div>
  )
}
