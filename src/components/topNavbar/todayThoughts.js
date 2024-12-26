// import React from 'react'
// import { Container } from '@mui/material'
// import Chip from '@mui/material/Chip';
// export default function TodayThoughts() {
//   return (
//     <div style={{ background: "#FCCC4D" }}>
//       <Container maxWidth="lg" sx={{padding:"8px 0"}}>
//         <div style={{ display: "flex", gap: "1rem", alignItems: "center", background: "#FFFAEB", padding:"0 0.8rem", borderRadius:"30px" }}>
//           <Chip label="• Today's Thought" size='small' sx={{ background: "#DC6803", color: "#fff" }} />
//           <p style={{ color: "#B54708", fontSize:"0.78rem", margin:"5px" }}>
//             Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc.
//           </p>
//         </div>
//       </Container>
//     </div>


//   )
// }

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
            sx={{backgroundColor:"#DC6803", color:"#FFFFFF"}}
          />
          <p className="today-thoughts-text">
            Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci, suscipit porttitor velit elementum non. Fusce nec pellentesque erat, id lobortis nunc.
          </p>
        </div>
      </Container>
    </div>
  )
}
