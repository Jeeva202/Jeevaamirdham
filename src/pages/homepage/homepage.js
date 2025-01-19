import BooksSection from "../../components/booksSection/booksSection"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
import PranavamTV from "../../components/pranavam_tv/pranavamtv"
import Footer from "../../components/footer/footer"
import "./homepage.css"
import { Container } from "@mui/material"
import Playstore from "../../components/playstore/playstore"
import LatestNews from "../../components/latestnews/latestnews"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, Typography, Button, IconButton, Skeleton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useSelector, useDispatch } from "react-redux"
import { selectUserId, setUserId } from "../../redux/cartSlice"
export default function HomePage({selectedYear, setSelectedYear,allYears, setAllYears}) {
    const carouselImages = [
        "/assets/images/carousel1.svg",
        "/assets/images/carousel2.svg"
    ];
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const numSteps = carouselImages.length;
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (!userId) {
            // If userId is not in Redux store, get it from localStorage and dispatch it
            const idFromLocalStorage = localStorage.getItem('id');
            if (idFromLocalStorage) {
                dispatch(setUserId(idFromLocalStorage));
            }
        }
    }, [userId, dispatch]);
    const handleNextStep = () => {
        setStep(prevStep => (prevStep + 1) % numSteps);
    };

    const handlePreviousStep = () => {
        setStep(prevStep => (prevStep - 1 + numSteps) % numSteps);
    };

    useEffect(() => {
        const timer = setTimeout(handleNextStep, 4000);
        return () => clearTimeout(timer);
    }, [step]);
    return (
        <Container maxWidth="lg">

            <div className="Container">
                <div className="NavBar">

                </div>
                <div className="carousel-container">
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '300px',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            backgroundColor: '#FCEDEC'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                width: `${numSteps * 100}%`,
                                transform: `translateX(-${(step * 100) / numSteps}%)`,
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            {carouselImages.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: `${100 / numSteps}%`,
                                        height: '300px',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`slide-${index}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        onLoad={() => setIsLoading(false)}
                                    />
                                </Box>
                            ))}
                        </Box>

                        {!isLoading && (
                            <>
                                <IconButton
                                    onClick={handlePreviousStep}
                                    sx={{
                                        position: 'absolute',
                                        left: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                                    }}
                                >
                                    <ArrowBackIosNewRoundedIcon />
                                </IconButton>

                                <IconButton
                                    onClick={handleNextStep}
                                    sx={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                                    }}
                                >
                                    <ArrowForwardIosRoundedIcon />
                                </IconButton>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        display: 'flex',
                                        gap: 1,
                                    }}
                                >
                                    {carouselImages.map((_, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => setStep(index)}
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: step === index ? '#F09300' : 'rgba(255, 255, 255, 0.7)',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                </div>

                <div className="PopBooks">
                    <BooksSection userId={userId} selectedYear={selectedYear} setSelectedYear={setSelectedYear}                         
                    allYears={allYears}
                        setAllYears={setAllYears} />
                </div>
                <div className="YouTube">
                    <PranavamTV />
                </div>
                <div className="News">
                    {/* <LatestNews/> */}
                </div>
                <div className="playStore">
                    <Playstore />
                </div>

                <NewsLetter />
                <KPI />

            </div>
        </Container>

    )
}