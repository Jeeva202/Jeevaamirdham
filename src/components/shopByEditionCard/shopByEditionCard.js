import "./shopByEditionCard.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery } from "react-query";
import { Loader } from "../loader/loader";
import Gif_Loader from "../loader/Gif_Loader";
import React from "react";
// import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function ShopByEditionCard({ selectedYear, setSelectedYear, allYears, setAllYears, setSelectedMonth }) {
    const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const navigate = useNavigate();


    // Function to handle year selection
    const handleOnClick = (year) => {
        if(year != 2022){
            console.log(year)
            navigate("/emagazine");
            setSelectedYear(year);
            setAllYears(false);
            setSelectedMonth(null);
        }
        else{
            setIsModalOpen(true);
        }
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
      };
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

        if (isLoading) {
        //   return <Loader/>;
        return <Gif_Loader />;
        }

    return (
        <div className={`Cards ${isMobile ? 'mobile' : ''}`}>
            {magazines?.slice(0,4).map((e) => ( 
                <div className="card" key={e.year}>
                    <div className="card-img">
                        <img style={{ width: "100%", height: "100%" }}  src={e.imgUrl} alt="" />
                    </div>
                    <a className="card-text">
                        <p >View {e.year} </p>
                        <KeyboardArrowRightIcon onClick={() => handleOnClick(e.year)} style={{ fontSize: '24px', color: '#151515', marginLeft: '8px', background:'#f09103', borderRadius: '50%',cursor:'pointer' }} />

                    </a>
                </div>
            ))}

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
