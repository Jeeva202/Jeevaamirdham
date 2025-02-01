import React, { useState, useRef, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Modal, Container, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ebooks } from '../../constants/screenData';
import Playstore from '../../components/playstore/playstore';
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';
import { showSnackbar } from '../../redux/SnackBarSlice';
import { useSelector, useDispatch } from 'react-redux';


const no_image = "/assets/images/no_image_available.jpeg"
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
const monthMapping = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
};

export default function AudioPlayer({
    APIBookData,
    audioData,
    backToAllYearPage,
    backToBookBuySection,
    handlePrevNext,
    plan,
    prevMagazine,
    nextMagazine,
    payNow,
    selectedYear,
    selectedMonth,
}) {
    const audioRefs = useRef([]);
    const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
    const [expandedState, setExpandedState] = useState(null); // Track expanded state for non-basic plans
    const [currentAudioIndex, setCurrentAudioIndex] = useState(null); // Current audio index for autoplay
    const [isPlayingAll, setIsPlayingAll] = useState(false); // Track if "Play All" is activated
    const dispatch = useDispatch();

    const handleChapterClick = (index) => {
        if (plan === 'basic' && index !== 0) {
            // If on basic plan and clicked accordion is not the first one, show the upgrade modal
            setOpenUpgradeModal(true);
        } else {
            if (plan !== 'basic') {
                // For non-basic plans, toggle the expanded state of the clicked accordion
                setExpandedState(prevState => (prevState === index ? null : index));
            } else {
                // For basic plans, allow only the first accordion to expand and collapse
                setExpandedState(index === 0 ? index : null);
            }
            // setCurrentAudioIndex(index);  // Update the current audio index when clicked
        }
    };


    const handleCloseUpgradeModal = () => {
        setOpenUpgradeModal(false);
    };

    // const handleUpgradeClick = () => {
    //     setOpenUpgradeModal(false);
    //     // upgrade logic here
    // };

    const handleAudioEnded = () => {
        // If playing all, move to the next audio
        if (isPlayingAll && currentAudioIndex < audioData.length - 1) {
            const nextAudioIndex = currentAudioIndex + 1;
            setCurrentAudioIndex(nextAudioIndex);
            setExpandedState(nextAudioIndex);  // Expand the accordion of the next audio
        }
    };

    // Handle Play All click
    const handlePlayAll = () => {
        setIsPlayingAll(true);
        setCurrentAudioIndex(0); // Start playing from the first audio
        setExpandedState(0); // Expand the first accordion
    };
    const handleUpgradeClick = (planName) => {
        if (planName === 'basic') {
            // Handle basic plan logic (if any)
            // alert('You are already on the basic plan!');
      dispatch(showSnackbar({ message: "You are already on the basic plan!", severity: "info" }));

        } else {
            // Call the payNow function for elite and premium plans
            payNow(planName);
            setOpenUpgradeModal(false);

        }
    };

    const handleAudioPlay = (index) => {
        // Pause any other audio that is currently playing
        audioRefs.current.forEach((audio, i) => {
            if (i !== index && audio) {
                audio.pause();
            }
        });
        setCurrentAudioIndex(index); // Update current audio index
    };

    // Auto-play logic: if `currentAudioIndex` changes, update the audio element and play it
    useEffect(() => {
        // Only attempt to play if audioRefs.current[currentAudioIndex] exists
        if (isPlayingAll && audioRefs.current[currentAudioIndex]) {
            const audio = audioRefs.current[currentAudioIndex];
            audio.src = audioData[currentAudioIndex].audio;
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }, [currentAudioIndex, isPlayingAll]);

    return (
        <>
            <div className="home-navigation">
                <a className="back" onClick={() => backToAllYearPage()}>
                    Home
                </a>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-buy-book" onClick={() => backToBookBuySection()}>
                    {selectedYear} / {selectedMonth}
                </div>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-title">
                    {APIBookData.title}
                </div>
            </div>

            <div className="img-details-section">
                <img src={APIBookData.imgUrl} alt="" />
                <div className="details">
                    {APIBookData.description}
                </div>
            </div>

            <div className="audio-section">
                <div className="audio-cat">
                    {APIBookData.category}
                </div>
                <div className="audio-subtext">
                    <div className="audio-date">
                        {APIBookData.created_dt} / {APIBookData.by}
                    </div>
                </div>
                <div className="audio-title-section">
                    <div className="audio-title">
                        {APIBookData.title}
                    </div>
                    <button
                        className="audio-playall"
                        disabled={plan === 'basic'}
                        style={{
                            backgroundColor: plan === 'basic' ? '#E6E6E6' : '#F09300',
                        }}
                        onClick={handlePlayAll}
                    >
                        Play All
                    </button>
                </div>
                <div className="audio-play-section">
                    {audioData.map((audio, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                boxShadow: "none",
                                background: index === 0 ? "#f8f8f8" : plan === 'basic' ? "#E6E6E6" : "#f8f8f8",
                                borderRadius: "10px",
                                border: "1px solid #E6E6E6",
                                "&::before": {
                                    height: 0, // Fixed the pseudo-element syntax
                                },
                            }}
                            expanded={plan === 'basic' ? index === 0 && expandedState === 0 : expandedState === index}  // First accordion expandable for basic users
                            onClick={() => handleChapterClick(index)}  // Handle click to toggle expansion
                            disabled={plan === 'basic' && index !== 0}  // Disable non-first accordion for basic users
                        >
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <div className="audio-play-title">
                                    <div className="index">Chapter {index + 1}</div>
                                    <Typography className="audio-play-title">{audio.title}</Typography>
                                    {/* {currentAudioIndex === index && (
                                        <Typography variant="body2" sx={{ ml: 2, color: 'green' }}>
                                            Currently Playing
                                        </Typography>
                                    )} */}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    background: index === 0
                                        ? "#f8f8f8"
                                        : plan === 'basic'
                                            ? "#E6E6E6"
                                            : "#f8f8f8",
                                }}
                            >
                                <div className="player-transcript-section">
                                    <div className="player">
                                        <div className="audio-header">
                                            <img
                                                src={audio.img || no_image}
                                                alt={"thumbnail image"}
                                                className="audio-image"
                                            />
                                            <div className="audio-details">
                                                <h3 className="audio-title">{APIBookData.title}</h3>
                                                <p className="audio-author">{APIBookData.author}</p>
                                                {(plan != 'basic' || (plan === 'basic' && index == 0)) && (
                                                    <audio
                                                        ref={(el) => (audioRefs.current[index] = el)}
                                                        controls
                                                        disablepictureinpicture
                                                        controlslist="nodownload noplaybackrate"
                                                        className="audio-element"
                                                        onPlay={() => handleAudioPlay(index)}
                                                        onEnded={handleAudioEnded}  // Listen for audio ending
                                                    >
                                                        <source src={audio.audio} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}
                                            </div>
                                        </div>

                                        <div className="audio-transcript">
                                            <div dangerouslySetInnerHTML={{ __html: audio.transcript }} />
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>



                {/* <div className="audio-prev-nxt">
                    <div className="audio-prev" onClick={() => handlePrevNext('previous')}>
                        {prevMagazine && (
                            <>
                                <img src={prevMagazine.imgUrl} alt="" />
                                <div className="audio-prev-text">
                                    <div className="prev">PREV</div>
                                    <div className="prev-title">{prevMagazine.title}</div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="audio-nxt" onClick={() => handlePrevNext("next")}>
                        {nextMagazine && (
                            <>
                                <div className="audio-nxt-text">
                                    <div className="nxt">NEXT</div>
                                    <div className="nxt-title">{nextMagazine.title}</div>
                                </div>
                                <img src={nextMagazine.imgUrl} alt="" />
                            </>
                        )}
                    </div>
                </div> */}
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
                                                onClick={() => plan.name !== "basic" && handleUpgradeClick(plan.name)} // Only trigger on "elite" and "premium"
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
            {/* <div className="other-ebooks">
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
                                </div> */}
            <Playstore />
            <NewsLetter />
            <KPI />
        </>
    );
}
