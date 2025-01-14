import "./shopByEditionCard.css";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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

    const Cards = [
        { year: 2019, img: "/assets/images/2018.png" },
        { year: 2020, img: "/assets/images/2019.png" },
        { year: 2021, img: "/assets/images/2020.png" },
        { year: 2022, img: "/assets/images/2021.png" },
        { year: 2023, img: "/assets/images/2022.png" },
        { year: 2024, img: "/assets/images/2023.png" }
    ];
;

    const navigate = useNavigate();

    // State for modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Function to handle year selection
    const handleOnClick = (year) => {
        if (year === 2024) {
            navigate("/emagazine");
            setSelectedYear(year);
            setAllYears(false);
        } else {
            setIsModalVisible(true); // Show modal if the year is not 2024
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className={`Cards ${isMobile ? 'mobile' : ''}`}>
            {Cards.map((e) => ( 
                <div className="card" key={e.year}>
                    <div className="card-img">
                        <img style={{ width: "100%", height: "100%" }}  src={e.img} alt="" />
                    </div>
                    <a className="card-text">
                        <p onClick={() => handleOnClick(e.year)}>View {e.year} Edition</p>
                        <KeyboardArrowRightIcon />
                    </a>
                </div>
            ))}

            {/* Modal for non-2024 years */}
            <Modal
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
            </Modal>
        </div>
    );
}
