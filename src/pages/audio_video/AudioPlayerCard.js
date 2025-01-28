import React, { useState, useEffect } from "react";
import { Button, IconButton, Container, Select, MenuItem } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
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
    const [selectedCategory, setSelectedCategory] = useState("All");
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

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredAudios =
        selectedCategory === "All"
            ? audioData
            : audioData.filter((audio) => audio.category === selectedCategory);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                const response = await axios.get(
                    process.env.REACT_APP_URL + `/audio-video-page/all_audio_data`
                );
                setAudioData(response.data);
                const uniqueCategories = [
                    "All",
                    ...new Set(response.data.map((audio) => audio.category)),
                ];
                setCategories(uniqueCategories);
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
        <Container
            maxWidth="lg"
            sx={{
                background: "#fff",
                borderRadius: "10px",
                padding: "1rem 0",
                marginTop: "2rem",
                marginBottom: "2rem"
            }}
        >
            <div
                style={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    marginBottom: "1rem"
                }}
            >
                <div className="text">
                    <h3 style={{ margin: 0, color:'#B54708', fontSize:'1.5rem' }}>Audios</h3>
                </div>
                <div>
                    <div
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "16px",
                            display: "flex",
                        }}
                    >
                        Category
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            displayEmpty
                            size="small"
                            sx={{ backgroundColor: "#fff", width: "25rem" }}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
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
                            borderRadius: "50%",
                            width: "20rem",
                            height: "20rem",
                            overflow: "hidden",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: `url(${item.coverImage_url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* Blur Layer */}
                        {((!isUserLoggedIn || userPlan === "basic") && index !== 0) && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    filter: "blur(2px)",
                                    zIndex: 1,
                                }}
                            ></div>
                        )}

                        {/* Play Button */}
                        {activeIndex !== index ? (
                            <IconButton
                                onClick={() => handlePlay(index)}
                                sx={{
                                    position: "relative",
                                    zIndex: 10,
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    borderRadius: "50%",
                                    padding: "1rem",
                                    display:
                                        (!isUserLoggedIn || userPlan === "basic") && index !== 0
                                            ? "none"
                                            : "content",
                                }}
                            >
                                <PlayArrowIcon fontSize="large" />
                            </IconButton>
                        ) : (
                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    background: "rgb(0 0 0 / 70%)",
                                    padding: "8px",
                                    zIndex: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    zoom: "0.8",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <div style={{display:'flex', flexDirection:'column', width:"80%", alignItems:'center', gap:"1rem"}}>
                                <div
                                    style={{ fontWeight: "bold", color:'#fff', textAlign: 'center'}}
                                >{item.title}</div>
                                <div style={{fontWeight: "bold", color:'#fff', textAlign: 'center', fontSize:"0.95rem" }}>{item.subtitle}</div>
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
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleStop}
                                    sx={{
                                        background: "#f09300",
                                        color: "#fff",
                                        borderColor: "#f09300",
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        borderRadius: "40px",
                                        width:'2rem'
                                    }}
                                >
                                    Stop
                                </Button>
                            </div>
                            </div>
                        )}

                        {/* Lock Icon */}
                        {((!isUserLoggedIn || userPlan === "basic") && index !== 0) && (
                            <IconButton
                                style={{
                                    position: "static",
                                    right: "8px",
                                    top: "8px",
                                    zIndex: 20,
                                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                                    borderRadius: "50%",
                                    fontSize: "2rem",
                                }}
                                onClick={handleOpen}
                            >
                                <LockIcon />
                            </IconButton>
                        )}
                    </div>
                ))}
            </div>

            <SubscriptionModal
                open={openModal}
                handleClose={handleClose}
                handleOpen={handleOpen}
            />
        </Container>
    );
};

export default AudioPlayerCard;
