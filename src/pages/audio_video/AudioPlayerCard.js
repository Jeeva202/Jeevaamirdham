import React, { useState, useEffect } from "react";
import { Button, IconButton, Container, Select, MenuItem } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import LockIcon from '@mui/icons-material/Lock';
import SubscriptionModal from "../../components/subscriptionModal/subscriptionModal";

const AudioPlayerCard = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Track the currently playing card
    const [audioData, setAudioData] = useState([]); // State to store audio data
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [userPlan, setUserPlan] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredAudios = selectedCategory === 'All' ? audioData : audioData.filter(audio => audio.category === selectedCategory);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL + `/audio-video-page/all_audio_data`);
                setAudioData(response.data);
                const uniqueCategories = ['All', ...new Set(response.data.map(audio => audio.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching audio data:", error);
            }
        };

        const fetchUserPlan = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL + `/getPlan`, {
                    params: {
                        id: localStorage.getItem('id')
                    }
                });
                console.log(response, "plan");
                setUserPlan(response.data[0].plan);
            } catch (error) {
                console.error("Error fetching user plan:", error);
            }
        };

        fetchAudioData();
        fetchUserPlan();
    }, []);

    const handlePlay = (index) => {
        if (userPlan === 'basic' && index !== 0) {
            setOpenModal(true);
            return;
        }
        setActiveIndex(index);
    };

    const handleStop = () => {
        setActiveIndex(null);
    };

    return (
        <Container maxWidth="lg">
            <div style={{ marginTop: '3rem' }}>
                <div className="text">
                    <h3>Audios</h3>
                </div>
            </div>
            <div >
            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                Category
            </div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty

                    sx={{ backgroundColor: '#fff', width: '30%', }}
                >
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "space-between",
                    marginBottom: "3rem",
                }}
            >
                {filteredAudios.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            position: "relative",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            maxWidth: "370px",
                            width: "100%",
                            height: "400px",
                            overflow: "hidden",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${item.coverImage_url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                zIndex: 1,
                            }}
                        ></div>
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#2f323724", // Light grey with 50% opacity
                                zIndex: 2,
                            }}
                        ></div>
                        {activeIndex !== index ? (
                            <Button
                                disableElevation
                                variant="contained"
                                onClick={() => handlePlay(index)}
                                sx={{
                                    borderRadius: "40px",
                                    p: "0.8rem 4rem",
                                    background: "#F09300",
                                    textTransform: "none",
                                    position: "absolute",
                                    bottom: "2rem",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    zIndex: 10,
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                Play
                            </Button>
                        ) : (
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: "98%",
                                    background: "rgba(255, 255, 255)",
                                    padding: "8px",
                                    zIndex: 10,
                                }}
                            >
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <div>
                                        <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                                            {item.title}
                                        </div>
                                        <div style={{ marginBottom: "8px" }}>
                                            {item.subtitle}
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                paddingRight: "10px",
                                            }}
                                        >
                                            <audio
                                                controls
                                                autoPlay
                                                disablepictureinpicture
                                                controlslist="nodownload noplaybackrate"
                                                style={{ width: "100%" }}
                                            >
                                                <source src={item.audiofile_url} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                            <IconButton
                                                sx={{ border: "1px solid #d9d9d9" }}
                                                onClick={handleStop}
                                            >
                                                <StopIcon fontSize="small" sx={{ color: "black" }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            // </div>
                        )}
                        {userPlan === 'basic' && index !== 0 && (
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '8px',
                                    filter: 'none',
                                    zIndex: 10,
                                }}
                                onClick={handleOpen}
                            >
                                <LockIcon fontSize='large' />
                            </IconButton>
                        )}
                    </div>
                ))}
            </div>
            <SubscriptionModal open={openModal} handleClose={handleClose} handleOpen={handleOpen} />
        </Container >
    );
};

export default AudioPlayerCard;

