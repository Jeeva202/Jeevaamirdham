import React, { useState, useEffect } from 'react';
import { Container, IconButton, Tabs, Tab, Box } from '@mui/material';
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
    const [activeVideo, setActiveVideo] = useState({ tab: null, index: null }); // Track the currently playing video with tab and index
    const [userPlan, setUserPlan] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
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

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setActiveVideo({ tab: newValue, index: 0 });
    }; 

    const filteredVideos = videoData.filter(video => video.category === selectedCategory);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL + `/audio-video-page/all_video_data`);
                setVideoData(response.data);
                const uniqueCategories = [...new Set(response.data.map(video => video.category))];
                setCategories(uniqueCategories);
                setSelectedCategory(uniqueCategories[0]); // Set first category as default
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

    useEffect(() => {
        if (categories.length > 0) {
            setActiveVideo({ tab: categories[0], index: 0 });
        }
    }, [categories]);

    const handleVideoClick = (tab, index) => {
        console.log(`handle`, tab)
        if ((!isUserLoggedIn || userPlan === 'basic') && index !== 0) {
            setOpenModal(true);
            return;
        }
        setActiveVideo({ tab, index });
    };

    return (
        <Container maxWidth="lg" sx={{ background: '#fff', borderRadius: '10px', marginTop:'2rem', padding: '2rem' }}>
            <div className="PranavamTV">
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column",
                    gap: 3,
                    mb: 3
                }}>
                    <div className="text" style={{fontWeight:'bold', color:'#B54708', fontSize:'1.5rem'}}>
                        Videos
                    </div>
                    
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
                        {categories.map((category, tabIndex) => (
                            <Tab 
                                key={category} 
                                label={category} 
                                value={category}
                                sx={{ textTransform: 'none' }}
                            />
                        ))}
                    </Tabs>
                </Box>

                <div className="video-section" style={{ display: 'flex', gap: '16px', flexDirection: { xs: 'column', md: 'row' } }}>
                    <div className="main" style={{ flex: 2 }}>
                        {activeVideo.tab === selectedCategory && activeVideo.index !== null && (
                            <div style={{ position: 'relative' }}>
                                <video key={filteredVideos[activeVideo.index].videofile_url} controls style={{ width: '100%', height: "100%", borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <source src={filteredVideos[activeVideo.index].videofile_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', background: '#fff', padding: '1rem', borderRadius: '8px', flexDirection: { xs: 'column', md: 'row' } }}>
                                    <img className="video-img" src={filteredVideos[activeVideo.index].coverImage_url} alt={filteredVideos[activeVideo.index].title} style={{ width: '100%', borderRadius: '8px' }} />
                                    <div className="video-title" style={{ marginTop: '8px', textAlign: { xs: 'center', md: 'left' } }}>
                                        <div className="text" style={{ fontWeight: 'bold' }}>
                                            {filteredVideos[activeVideo.index].title}
                                        </div>
                                        <div className="sub-text" style={{ color: '#555' }}>
                                            {filteredVideos[activeVideo.index].subtitle}
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
                        {filteredVideos.map((item, index) => (
                            <div
                                className="embed"
                                key={index}
                                onClick={() => handleVideoClick(selectedCategory, index)}
                                style={{
                                    cursor: (!isUserLoggedIn || userPlan === 'basic') && index !== 0 ? 'default' : 'pointer',
                                    marginBottom: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: '#fff',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    border: "1px solid #dee",

                                    // overflow: 'hidden',
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
                                        <IconButton sx={{background:'#44444426'}} onClick={() => handleVideoClick(selectedCategory, index)} >  
                                        <LockIcon style={{ fontSize: '1.5rem' }} />
                                        </IconButton>
                                        
                                    </div>
                                )}

                                {/* Video Thumbnail */}
                                <div
                                    style={{
                                        width: '25%',
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
