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
            <marquee>Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc.</marquee>
          </div>
        </div>
      </Container>
    </div>
  )
}
