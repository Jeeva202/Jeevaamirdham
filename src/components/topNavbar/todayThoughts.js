import React from 'react'
import { Container } from '@mui/material'
import Chip from '@mui/material/Chip';
import './todayThoughts.css';

export default function TodayThoughts() {
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
            <marquee>
            A tiny drop that falls into the ocean becomes the ocean, A small plant that blossoms on the mountain becomes the mountain. A single drop of sound (Nādam) that merges with the body, Shines as life itself, the eternal Pranava... Indeed!
            </marquee>
          </div>
        </div>
      </Container>
    </div>
  )
}
