import React, { useState, useEffect } from 'react';
import { Container, IconButton, Select, MenuItem } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import SubscriptionModal from '../../components/subscriptionModal/subscriptionModal';
import { useDispatch, useSelector } from "react-redux";
import {
  openLogin,
  setUserLoggedIn,
  selectUserId,
  setCartDetails,
  setBooksData,
  selectCartDetails,
} from "../../redux/cartSlice";

export default function VideoPlayerCard() {
    const [videoData, setVideoData] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [userPlan, setUserPlan] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();
    const isUserLoggedInFromStore = useSelector(
      (state) => state.cart.isUserLoggedIn
    );
    const isUserLoggedIn =
      isUserLoggedInFromStore !== undefined
        ? isUserLoggedInFromStore
        : !!localStorage.getItem("id");

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredVideos = selectedCategory === 'All' ? videoData : videoData.filter(video => video.category === selectedCategory);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL + `/audio-video-page/all_video_data`);
                setVideoData(response.data);
                setCurrentVideo(response.data[0]); // Set the first video as the current video
                const uniqueCategories = ['All', ...new Set(response.data.map(video => video.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching video data:", error);
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

        fetchVideoData();
        fetchUserPlan();
    }, [dispatch]);

    const handleVideoClick = (video) => {
        if ((!isUserLoggedIn || userPlan === 'basic') && video !== videoData[0]) {
            setOpenModal(true)
        }
        setCurrentVideo(video);
        console.log("video", video);
    };

    return (
        <Container maxWidth="lg" sx={{ background: '#fff', borderRadius: '10px', marginTop:'2rem' }}>
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
                                <video key={currentVideo.videofile_url} controls style={{ width: '100%', height: "100%", borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <source src={currentVideo.videofile_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '8px', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
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
                            Category
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                displayEmpty
                                fullWidth
                                size="small"
                                sx={{ backgroundColor: '#fff' }}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px' }}>
                            Next Videos
                        </div>
                        {filteredVideos.map((item, index) => (
                            <div
                                className="embed"
                                key={index}
                                onClick={() => handleVideoClick(item)}
                                style={{
                                    cursor: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 'default' : 'pointer',
                                    pointerEvents: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 'none' : 'auto',
                                    marginBottom: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#fff',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Grey Overlay for Locked Content */}
                                {(!isUserLoggedIn || userPlan === 'basic') && index !== 0 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent grey
                                            zIndex: 1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IconButton sx={{background:'#44444426'}}>  
                                        <LockIcon style={{ fontSize: '1.5rem' }} />
                                        </IconButton>
                                        
                                    </div>
                                )}

                                {/* Video Thumbnail */}
                                <div
                                    style={{
                                        width: '30%',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <img
                                        src={item.coverImage_url}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            opacity: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 0.5 : 1, // Dim the image if locked
                                        }}
                                    />
                                </div>

                                {/* Video Title */}
                                <div
                                    className="video-title"
                                    style={{
                                        zIndex: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 0 : 2,
                                        opacity: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 0.5 : 1, // Dim the text if locked
                                        padding: '8px',
                                        flex: 1,
                                    }}
                                >
                                    <div
                                        className="text"
                                        style={{
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.8rem',
                                            color: '#555',
                                        }}
                                    >
                                        {item.subtitle}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <SubscriptionModal open={openModal} handleClose={handleClose} handleOpen={handleOpen} />
        </Container>
    );
}
