import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import AudioPlayerCard from './audio';
import axios from 'axios';

export default function Audio_video() {
    const [videoData, setVideoData] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL + `/audio-video-page/all_video_data`);
                setVideoData(response.data);
                setCurrentVideo(response.data[0]); // Set the first video as the current video
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        };

        fetchVideoData();
    }, []);

    const handleVideoClick = (video) => {
        setCurrentVideo(video);
    };

    return (
        <Container maxWidth="lg">
            <div className="PranavamTV">
                <div className="title">
                    <div className="text">
                        Videos
                    </div>
                </div>
                <div className="video-section" style={{ display: 'flex', gap: '16px' }}>
                    <div className="main" style={{ flex: 2 }}>
                        {currentVideo && (
                            <div style={{ position: 'relative' }}>
                                <video controls style={{ width: '100%', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <source src={currentVideo.videofile_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '8px' }}>
                                <img src={currentVideo.coverImage_url} alt={currentVideo.title} style={{ width: '8rem', borderRadius: '8px' }} />

                                <div className="video-title" style={{ marginTop: '8px' }}>
                                    <div className="text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {currentVideo.title}
                                    </div>
                                    <div style={{ fontSize: '1rem', color: '#555' }}>
                                        {currentVideo.subtitle}
                                    </div>
                                </div>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="other" style={{ flex: 1, overflowY: 'auto', maxHeight: '500px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px' }}>
                        Next Videos
                    </div>
                        {videoData.map((item, index) => (
                            <div className="embed" key={index} onClick={() => handleVideoClick(item)} style={{ cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={item.coverImage_url} alt={item.title} style={{ width: '30%', borderRadius: '8px' }} />
                                <div className="video-title">
                                    <div className="text" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        {item.title}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#555' }}>
                                        {item.subtitle}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{marginTop:'3rem'}}>
                <div className="text">
                    <h3>Audios</h3>
                </div>
                <AudioPlayerCard />
                <br />
            </div>
        </Container>
    );
}
