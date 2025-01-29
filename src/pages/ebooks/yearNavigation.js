import React, { useState, useEffect } from "react";
import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
import { Loader } from "../../components/loader/loader";
import { useQuery } from "react-query";
import { Modal, Box, Button } from '@mui/material';
import axios from "axios";
import Gif_Loader from "../../components/loader/Gif_Loader";

export default function YearNavigation({ redirectToYearPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMagazines = async () => {
    const response = await axios.get(process.env.REACT_APP_URL + '/emagazine-page/magazine-yearwise');
    return response.data.reverse(); // Reverse the data here to match your original behavior
  };

  const { data: magazines, isLoading, isError, error } = useQuery(
    ['magazines', 'yearwise'],  
    fetchMagazines, 
    {
      staleTime: 60000, // Optional: cache the data for 1 minute (60000ms) before refetching
      cacheTime: 300000, // Optional: keep the data cached for 5 minutes (300000ms) after it's unused
    }
  );

  const handleYearClick = (year) => {
    if ([2023, 2024, 2025].includes(year)) {
      redirectToYearPage(year);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    // return <Loader/>;
    return <Gif_Loader />;
  }

  return (
    <div className="ebook">
      <div className="title">
        <div className="emagazine">
          E-Magazine by Years
        </div> 
        {/* <div className="hdivider">
          <img src={ebooks.icons.HorizontalDivider} alt="" />
        </div> */}
      </div>
      <div className="year-wise">
        {magazines.map((e) => (
          <div onClick={() => handleYearClick(e.year)} className="year-wrapper" key={e.year} data-year={e.year}>
            <img src={e.imgUrl} alt={e.year} />
            {/* <ViewAll
              // text={e.year}
              width="10rem"
              padding="0.4rem 2rem"
               // Call the new function on year click
            /> */}
          </div>
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="updating-modal"
        aria-describedby="updating-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          p: 4,
          textAlign: 'center',
          outline: 'none',
          backdropFilter: 'blur(5px)',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png" 
              alt="Update Coming Soon"
              style={{ width: '100px', height: '100px' }}
            />
            <h2 style={{ 
              color: '#1a365d',
              margin: '10px 0',
              fontSize: '1.5rem'
            }}>
              Coming Soon!
            </h2>
            <p style={{
              color: '#4a5568',
              marginBottom: '20px',
              fontSize: '1rem'
            }}>
              This content is currently being updated. Please check back later.
            </p>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#F09300',
                color: 'white',
                '&:hover': {
                  bgcolor: '#d68200',
                },
                borderRadius: '8px',
                px: 4,
                py: 1,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Got it
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
