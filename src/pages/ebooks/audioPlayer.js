import React, { useState, useRef, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Modal, Container, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ebooks } from '../../constants/screenData';
import Playstore from '../../components/playstore/playstore';
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';

const plans = [
    {
        name: "basic",
        price: "₹0",
        features: [
            "Access to one chapter of E-magazine",
            "One audio content",
            "One video content",
            "Ability to shop for books",
        ],
        buttonLabel: "Free",
        buttonStyle: {
            backgroundColor: "#E6E6E6",
            color: "#000",
        },
    },
    {
        name: "elite",
        price: "₹599/year",
        features: [
            "Access to all E-magazine content",
            "All audio content",
            "All video content",
            "Ability to shop for books",
        ],
        buttonLabel: "Purchase Now",
        buttonStyle: {
            backgroundColor: "#F09300",
            color: "#fff",
        },
    },
    {
        name: "premium",
        price: "₹999/year",
        features: [
            "Access to all E-magazine content",
            "All audio content",
            "All video content",
            "Ability to shop for books",
            "Hard copy subscription of E-magazine",
        ],
        buttonLabel: "Purchase Now",
        buttonStyle: {
            backgroundColor: "#F09300",
            color: "#fff",
        },
    },
];

export default function AudioPlayer({
    audioData,
    whichBook,
    backToAllYearPage,
    backToBookBuySection,
    handleChange,
    expanded,
    openPreviousAudioBook,
    plan
}) {
    const audioRef = useRef(null);
    const [openUpgradeModal, setOpenUpgradeModal] = useState(false); 

    // Function to handle chapter click
    const handleChapterClick = (index) => {
        if (plan === 'basic' && index !== 0) { 
            setOpenUpgradeModal(true); 
        } else {
            handleChange(index)(); 
        }
    };


    const handleCloseUpgradeModal = () => {
        setOpenUpgradeModal(false);
    };

    const handleUpgradeClick = () => {
        setOpenUpgradeModal(false);
        // upgrade logic here
    };


    const handleAudioEnded = () => {
        if (plan === 'basic') {
            setOpenUpgradeModal(true); // Open the modal when audio finishes
        }
    };

    return (
        <>
            <div className="home-navigation">
                <a className="back" onClick={() => backToAllYearPage()}>
                    Home
                </a>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-buy-book" onClick={() => backToBookBuySection()}>
                    {audioData[whichBook].genre}
                </div>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-title">
                    {audioData[whichBook].title}
                </div>
            </div>

            <div className="img-details-section">
                <img src={audioData[whichBook].img} alt="" />
                <div className="details">
                    {audioData[whichBook].details}
                </div>
            </div>

            <div className="audio-section">
                <div className="audio-cat">
                    {audioData[whichBook].genre}
                </div>
                <div className="audio-subtext">
                    <div className="audio-date">
                        {audioData[whichBook].date} / {audioData[whichBook].by}
                    </div>
                </div>
                <div className="audio-title-section">
                    <div className="audio-title">
                        {audioData[whichBook].title}
                    </div>
                    <button
                        className="audio-playall"
                        disabled={plan === 'basic'}
                        style={{
                            backgroundColor: plan === 'basic' ? '#E6E6E6' : '#F09300',
                        }}
                    >
                        Play All
                    </button>
                </div>

                <div className="audio-play-section">
                    {audioData[whichBook].audio_content.map((audio, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                boxShadow: "none",
                                background: index === 0 ? "#FCCC4D" : plan === 'basic' ? "#E6E6E6" : "#FCCC4D",
                                borderRadius: "10px",
                            }}
                            expanded={expanded === index || (index === 0 && plan === 'basic')}
                            onClick={() => handleChapterClick(index)}  // Changed to onClick to handle the disabled accordion click
                            disabled={plan === 'basic' && index !== 0}  // Disable non-first chapters for 'basic' plan
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <div className="audio-play-title">
                                    <div className="index">{index + 1}</div>
                                    <Typography className="audio-play-title">{audio.title}</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    background: index === 0
                                        ? "#FCCC4D"
                                        : plan === 'basic'
                                        ? "#E6E6E6"
                                        : "#FCCC4D",
                                }}
                            >
                                <div className="player-transcript-section">
                                    <div className="player">
                                        <div className="audio-header">
                                            <img
                                                src="/assets/images/audio.svg"
                                                alt="Audio Thumbnail"
                                                className="audio-image"
                                            />
                                            <div className="audio-details">
                                                <h3 className="audio-title">{audioData[whichBook].title}</h3>
                                                <p className="audio-author">{audioData[whichBook].author}</p>
                                                {index === 0 && plan === 'basic' && (
                                                    <audio
                                                        ref={audioRef}
                                                        controls
                                                        disablepictureinpicture
                                                        controlslist="nodownload noplaybackrate"
                                                        className="audio-element"
                                                        onEnded={handleAudioEnded}  // Listen for audio ending
                                                    >
                                                        <source src={audio.audio} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}
                                            </div>
                                        </div>

                                        <div className="audio-transcript">
                                            <p>{audio.transcript}</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>

                <div className="audio-prev-nxt">
                    <div className="audio-prev" onClick={() => openPreviousAudioBook()}>
                        {parseInt(whichBook) !== 0 && (
                            <>
                                <img src={audioData[(parseInt(whichBook) - 1).toString()].img} alt="" />
                                <div className="audio-prev-text">
                                    <div className="prev">
                                        PREV
                                    </div>
                                    <div className="prev-title">
                                        {audioData[(parseInt(whichBook) - 1).toString()].title}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="audio-nxt">
                        {parseInt(whichBook) < audioData.length - 1 && (
                            <>
                                <div className="audio-nxt-text">
                                    <div className="nxt">
                                        NEXT
                                    </div>
                                    <div className="nxt-title">
                                        {audioData[(parseInt(whichBook) + 1).toString()].title}
                                    </div>
                                </div>
                                <img src={audioData[(parseInt(whichBook) + 1).toString()].img} alt="" />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for upgrade */}
            <Modal
                open={openUpgradeModal}
                onClose={handleCloseUpgradeModal}
                aria-labelledby="upgrade-modal-title"
                aria-describedby="upgrade-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1000,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '8px',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <IconButton
                        onClick={handleCloseUpgradeModal}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: 'gray',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Container maxWidth="md">
                        <Box textAlign="center" my={4}>
                            <Typography variant="h4" gutterBottom>
                                Choose Your Plan
                            </Typography>
                            <Typography variant="subtitle1">
                                Upgrade your plan to listen to the remaining chapters
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            {plans.map((plan, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, fontWeight: 600 }}>
                                            <Typography sx={{ fontSize: "1.2rem" }} variant="h6" gutterBottom>
                                                {plan.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: '2rem', fontWeight: 500, color: "black" }} variant="h4" color="primary" gutterBottom>
                                                {plan.price}
                                            </Typography>
                                            <List>
                                                {plan.features.map((feature, idx) => (
                                                    <ListItem key={idx} disableGutters>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon sx={{ color: "rgb(34 197 94)" }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={feature} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                        <Box textAlign="center" mb={2} sx={{ px: 2 }}>
                                            <Button
                                                variant="contained"
                                                sx={plan.buttonStyle}
                                                fullWidth
                                                onClick={handleUpgradeClick}
                                            >
                                                {plan.buttonLabel}
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Modal>
            <div className="other-ebooks">
                                    {[1, 2, 3].map((e, i) => (
                                        <div className="other-book">
                                        <img src="/assets/images/other-ebooks.svg" alt=""/>
                                        <div className="other-ebook-subtext">

                                            November 14, 2022 / BY ADMIN
                                        </div>
                                        <div className="comments-views">
                                            <div className="comments">
                                                <img src={ebooks.icons.comment} alt=""/>
                                                <div className="comment-num">
                                                    200
                                                </div>
                                            </div>
                                            <div className="views">
                                                <img src={ebooks.icons.view} alt=""/>
                                                <div className="view-num">
                                                    800
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="other-book-title">
                                        Bow down to the universe 
                                        </div>
                                        <div className="other-book-desc">
                                        The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos.
                                        </div>
                                        <div className="other-book-cat-read-more">
                                            <div className="other-book-cat">
                                                IN <span>GNANAM</span>
                                            </div>
                                            <div className="other-book-read-more">
                                                Read More
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                <Playstore/>
                                <NewsLetter/>
                                <KPI/>
        </>
    );
}
