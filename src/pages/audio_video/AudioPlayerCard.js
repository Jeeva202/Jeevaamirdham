import React, { useState, useEffect } from "react";
import { 
    Button, IconButton, Container, Tabs, Tab,
    List, ListItem, ListItemText, ListItemIcon, Typography, Box 
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import SubscriptionModal from "../../components/subscriptionModal/subscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import {
    openLogin,
    setUserLoggedIn,
    selectUserId,
    setCartDetails,
    setBooksData,
    selectCartDetails,
} from "../../redux/cartSlice";

const AudioPlayerCard = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Track the currently playing card
    const [audioData, setAudioData] = useState([]); // State to store audio data
    const [selectedCategory, setSelectedCategory] = useState("");  // Empty default value
    const [categories, setCategories] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();
    const isUserLoggedInFromStore = useSelector(
        (state) => state.cart.isUserLoggedIn
    );
    const isUserLoggedIn =
        isUserLoggedInFromStore !== undefined
            ? isUserLoggedInFromStore
            : !!localStorage.getItem("id");

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    const filteredAudios = audioData.filter((audio) => audio.category === selectedCategory);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_URL + `/audio-video-page/all_audio_data`
                );
                setAudioData(response.data);
                const uniqueCategories = [...new Set(response.data.map((audio) => audio.category))];
                setCategories(uniqueCategories);                setSelectedCategory(uniqueCategories[0]); // Set first category as default
            } catch (error) {
                console.error("Error fetching audio data:", error);
            }
        };

        const fetchUserPlan = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_URL + `/getPlan`,
                    {
                        params: {
                            id: localStorage.getItem("id"),
                        },
                    }
                );
                setUserPlan(response.data[0]?.plan || null);
            } catch (error) {
                console.error("Error fetching user plan:", error);
            }
        };

        fetchAudioData();
        fetchUserPlan();
    }, [dispatch]);

    const handlePlay = (index) => {
        // Treat not logged-in users or users with a basic plan as restricted
        if ((userPlan === "basic" || !isUserLoggedIn) && index !== 0) {
            setOpenModal(true);
            return;
        }
        setActiveIndex(index);
    };

    const handleStop = () => {
        setActiveIndex(null);
    };

    return (
        <Container maxWidth="lg" sx={{ 
            marginTop: "30px", 
            marginBottom: "30px", 
            background: "#fff", 
            borderRadius: "10px", 
            py: 4 
        }}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column",
                gap: 3
            }}>
                <Typography variant="h4" sx={{ color: '#B54708', fontWeight: 'bold' }}>
                    Audios
                </Typography>
                
                <Tabs 
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTab-root': {
                            color: '#666',
                            '&.Mui-selected': {
                                color: '#DC6803',
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#DC6803',
                        }
                    }}
                >
                    {categories.map((category) => (
                        <Tab 
                            key={category} 
                            label={category} 
                            value={category}
                            sx={{ textTransform: 'none' }}
                        />
                    ))}
                </Tabs>
            </Box>

            <List sx={{ 
                width: '100%', 
                bgcolor: 'background.paper',
                maxHeight: '400px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#666',
                    borderRadius: '4px',
                    '&:hover': {
                        background: '#666',
                    },
                },
                mt: 2
            }}>
                {filteredAudios.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'rgba(252, 204, 77, 0.1)',
                            },
                            position: 'relative',
                            ...((!isUserLoggedIn || userPlan === "basic") && index !== 0 && {
                                opacity: 0.7,
                                filter: 'blur(0.5px)',
                            })
                        }}
                    >
                        <ListItemIcon>
                            <Box
                                component="img"
                                src={item.coverImage_url}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 2,
                                    mr: 2
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="b" color="#161616">
                                    {item.title}
                                </Typography>
                            }
                            secondary={item.subtitle}
                            sx={{ flex: 1 }}
                        />
                        
                        {activeIndex === index ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <audio
                                    controls
                                    autoPlay
                                    disablepictureinpicture
                                    controlslist="nodownload noplaybackrate"
                                    style={{ maxWidth: '300px' }}
                                >
                                    <source src={item.audiofile_url} type="audio/mp3" />
                                </audio>
                                <Button
                                    variant="contained"
                                    onClick={handleStop}
                                    sx={{
                                        bgcolor: '#f09300',
                                        '&:hover': { bgcolor: '#DC6803' },
                                        borderRadius: 20
                                    }}
                                >
                                    <PauseIcon />
                                </Button>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => handlePlay(index)}
                                disabled={(!isUserLoggedIn || userPlan === "basic") && index !== 0}
                                sx={{
                                    bgcolor: '#FCCC4D',
                                    '&:hover': { bgcolor: '#f09300' },
                                    '&.Mui-disabled': {
                                        bgcolor: 'rgba(0, 0, 0, 0.12)'
                                    }
                                }}
                            >
                                {(!isUserLoggedIn || userPlan === "basic") && index !== 0 ? (
                                    <LockIcon onClick={handleOpen} />
                                ) : (
                                    <PlayArrowIcon />
                                )}
                            </IconButton>
                        )}
                    </ListItem>
                ))}
            </List>

            <SubscriptionModal
                open={openModal}
                handleClose={handleClose}
                handleOpen={handleOpen}
            />
        </Container>
    );
};

export default AudioPlayerCard;
