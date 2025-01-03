import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const AudioPlayerCard = () => {
    const [activeIndex, setActiveIndex] = useState(null); // Track the currently playing card

    const handlePlay = (index) => {
        setActiveIndex(index); // Set the card as playing
    };

    const handleStop = () => {
        setActiveIndex(null); // Stop the audio playback
    };

    const audioData = [
        {
            title: "சித்திவளாகத்தில் கல்பட்டு ஐயா - 1",
            background: "/assets/images/audio.svg",
            thumbnail: "/assets/images/audio.svg",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
            title: "சித்திவளாகத்தில் கல்பட்டு ஐயா - 2",
            background: "/assets/images/audio.svg",
            thumbnail: "/assets/images/audio.svg",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
        {
            title: "சித்திவளாகத்தில் கல்பட்டு ஐயா - 3",
            background: "/assets/images/audio.svg",
            thumbnail: "/assets/images/audio.svg",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
            title: "சித்திவளாகத்தில் கல்பட்டு ஐயா - 4",
            background: "/assets/images/audio.svg",
            thumbnail: "/assets/images/audio.svg",
            audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "space-between",
            }}
        >
            {audioData.map((item, index) => (
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
                            backgroundImage: `url(${item.background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
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
                    {/* <Button>HH</Button> */}
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
                                color:"black",
                                fontWeight:"bold",
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
                                {/* <img
                  src={item.thumbnail}
                  alt="Thumbnail"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "5px",
                  }}
                /> */}
                                <div>
                                    <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                                        {item.title}
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
                                            <source src={item.audio} type="audio/mp3" />
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
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AudioPlayerCard;

