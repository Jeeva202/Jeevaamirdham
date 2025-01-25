import "./shopByEditionCard.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery } from "react-query";
import { Loader } from "../loader/loader";
import Gif_Loader from "../loader/Gif_Loader";
// import { useState } from "react";
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';


export default function ShopByEditionCard({ selectedYear, setSelectedYear, allYears, setAllYears }) {
    const [isMobile, setIsMobile] = useState(false);

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
            navigate("/emagazine");
            setSelectedYear(year);
            setAllYears(false);
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

            {/* Modal for non-2024 years */}
            {/* <Modal
                open={isModalVisible}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}>
                    <h2 id="modal-title">Updating Soon...</h2>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={closeModal}
                        sx={{ marginTop: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal> */}
        </div>
    );
}
