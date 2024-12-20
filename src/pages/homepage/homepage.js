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

export default function HomePage() {
    const carouselImages = [
        "/assets/images/carousel1.svg",
        "/assets/images/carousel2.svg"
    ];
    const [step, setStep] = useState(0);
    const numSteps = carouselImages.length;

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
                <div className="carousel">
                    <Card sx={{
                        background: "#fbf1e6",
                        // backdropFilter: "blur(7.5px)",
                        width: "100%",
                        // maxWidth: "37rem",
                        borderRadius: "10px",
                        border: "1px solid #ccc",
                        boxShadow: "none"
                    }}>
                        <CardContent sx={{ padding: "16px", borderRadius: "5px" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <IconButton onClick={handlePreviousStep} disabled={step === 0}>
                                    <ArrowBackIosNewRoundedIcon sx={{ color: '#F09300', fontSize: "1.5rem" }} />
                                </IconButton>
                                <Box component="img" src={carouselImages[step]} alt="carousel" sx={{ width:"95%",height: "100%", borderRadius: "10px" }} />
                                <IconButton onClick={handleNextStep} disabled={step === numSteps - 1}>
                                    <ArrowForwardIosRoundedIcon sx={{ color: '#F09300', fontSize: "1.5rem" }} />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "1rem" }}>
                                {[...Array(numSteps)].map((_, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: index === step ? '#d9d9d9' : '#F09300',
                                            margin: '0 4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setStep(index)}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </div>

                <div className="PopBooks">
                    <BooksSection />
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