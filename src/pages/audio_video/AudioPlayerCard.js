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
    const [activeAudio, setActiveAudio] = useState({ tab: null, index: null }); // Track the currently playing audio with tab and index
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
                setCategories(uniqueCategories);                
                setSelectedCategory(uniqueCategories[0]); // Set first category as default
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

    const handlePlay = (tab, index) => {
        // Treat not logged-in users or users with a basic plan as restricted
        if ((userPlan === "basic" || !isUserLoggedIn) && index !== 0) {
            setOpenModal(true);
            return;
        }
        setActiveAudio({ tab, index });
    };

    const handleStop = () => {
        setActiveAudio({ tab: null, index: null });
    };

    return (
        // <Container maxWidth="lg" sx={{ 
        //     marginTop: "30px", 
        //     marginBottom: "30px", 
        //     background: "#fff", 
        //     borderRadius: "10px", 
        //     py: 4,
        //     padding: { xs: '1rem', sm: '2rem' }
        // }}>
        //     <Box sx={{ 
        //         display: "flex", 
        //         flexDirection: "column",
        //         gap: 3
        //     }}>
        //         <Typography variant="h4" sx={{ color: '#B54708', fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' } }}>
        //             Audios
        //         </Typography>
                
        //         <Tabs 
        //             value={selectedCategory} 
        //             onChange={handleCategoryChange}
        //             variant="scrollable"
        //             scrollButtons="auto"
        //             sx={{
        //                 '& .MuiTab-root': {
        //                     color: '#666',
        //                     '&.Mui-selected': {
        //                         color: '#DC6803',
        //                     }
        //                 },
        //                 '& .MuiTabs-indicator': {
        //                     backgroundColor: '#DC6803',
        //                 }
        //             }}
        //         >
        //             {categories.map((category, tabIndex) => (
        //                 <Tab 
        //                     key={category} 
        //                     label={category} 
        //                     value={category}
        //                     sx={{ textTransform: 'none' }}
        //                 />
        //             ))}
        //         </Tabs>
        //     </Box>

        //     <List sx={{ 
        //         width: '100%', 
        //         bgcolor: 'background.paper',
        //         maxHeight: '400px',
        //         overflowY: 'auto',
        //         '&::-webkit-scrollbar': {
        //             width: '8px',
        //         },
        //         '&::-webkit-scrollbar-track': {
        //             background: '#f1f1f1',
        //             borderRadius: '4px',
        //         },
        //         '&::-webkit-scrollbar-thumb': {
        //             background: '#666',
        //             borderRadius: '4px',
        //             '&:hover': {
        //                 background: '#666',
        //             },
        //         },
        //         mt: 2
        //     }}>
        //         {filteredAudios.map((item, index) => (
        //             <ListItem
        //                 key={index}
        //                 sx={{
        //                     borderRadius: 2,
        //                     mb: 1,
        //                     '&:hover': {
        //                         bgcolor: 'rgba(252, 204, 77, 0.1)',
        //                     },
        //                     position: 'relative',
        //                     ...((!isUserLoggedIn || userPlan === "basic") && index !== 0 && {
        //                         opacity: 0.7,
        //                         filter: 'blur(0.5px)',
        //                     }),
        //                     flexDirection: { xs: 'column', sm: 'row' },
        //                     alignItems: { xs: 'flex-start', sm: 'center' }
        //                 }}
        //             >
        //                 <ListItemIcon sx={{ minWidth: 'auto', marginBottom: { xs: '10px', sm: '0' } }}>
        //                     <Box
        //                         component="img"
        //                         src={item.coverImage_url}
        //                         sx={{
        //                             width: 60,
        //                             height: 60,
        //                             borderRadius: 2,
        //                             mr: 2
        //                         }}
        //                     />
        //                 </ListItemIcon>
        //                 <ListItemText
        //                     primary={
        //                         <Typography variant="b" color="#161616">
        //                             {item.title}
        //                         </Typography>
        //                     }
        //                     secondary={item.subtitle}
        //                     sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}
        //                 />
                        
        //                 {activeAudio.tab === selectedCategory && activeAudio.index === index ? (
        //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
        //                         <audio
        //                             controls
        //                             autoPlay
        //                             disablepictureinpicture
        //                             controlslist="nodownload noplaybackrate"
        //                             style={{ maxWidth: '300px', width: '100%' }}
        //                         >
        //                             <source src={item.audiofile_url} type="audio/mp3" />
        //                         </audio>
        //                         <Button
        //                             variant="contained"
        //                             onClick={handleStop}
        //                             sx={{
        //                                 bgcolor: '#f09300',
        //                                 '&:hover': { bgcolor: '#DC6803' },
        //                                 borderRadius: 20
        //                             }}
        //                         >
        //                             <PauseIcon />
        //                         </Button>
        //                     </Box>
        //                 ) : (
        //                     <IconButton
        //                         onClick={() => handlePlay(selectedCategory, index)}
        //                         sx={{
        //                             bgcolor: '#FCCC4D',
        //                             '&:hover': { bgcolor: '#f09300' },
        //                             '&.Mui-disabled': {
        //                                 bgcolor: 'rgba(0, 0, 0, 0.12)'
        //                             }
        //                         }}
        //                     >
        //                         {(!isUserLoggedIn || userPlan === "basic") && index !== 0 ? (
        //                             <LockIcon onClick={handleOpen} />
        //                         ) : (
        //                             <PlayArrowIcon />
        //                         )}
        //                     </IconButton>
        //                 )}
        //             </ListItem>
        //         ))}
        //     </List>

        //     <SubscriptionModal
        //         open={openModal}
        //         handleClose={handleClose}
        //         handleOpen={handleOpen}
        //     />
        // </Container>
        <Container 
        maxWidth="lg" 
        sx={{ 
            marginTop: "20px", 
            marginBottom: "20px", 
            background: "#fff", 
            borderRadius: "10px", 
            py: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 4 },
            boxShadow: { xs: "none", sm: "0 2px 8px rgba(0,0,0,0.1)" }
        }}
    >
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column",
            gap: 3,
            alignItems: { xs: "center", sm: "flex-start" }
        }}>
            <Typography 
                variant="h5" 
                sx={{ 
                    color: '#B54708', 
                    fontWeight: 'bold', 
                    textAlign: { xs: 'center', sm: 'left' } 
                }}
            >
                Audios
            </Typography>
            
            <Tabs 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    width: "100%",
                    '& .MuiTab-root': {
                        color: '#666',
                        fontSize: { xs: "0.875rem", sm: "1rem" }, // Adjust font size for mobile
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
            maxHeight: { xs: '300px', sm: '400px' }, 
            overflowY: 'auto',
            mt: 2,
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': { background: '#666', borderRadius: '4px' }
        }}>
            {filteredAudios.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{
                        borderRadius: 2,
                        mb: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-end', sm: 'center' },
                        textAlign: { xs: 'center', sm: 'left' },
                        border: "1px solid #dee",
                        '&:hover': { bgcolor: 'rgba(252, 204, 77, 0.1)' },
                        position: 'relative',
                        ...((!isUserLoggedIn || userPlan === "basic") && index !== 0 && {
                            opacity: 0.7,
                            filter: 'blur(0.5px)',
                        })
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap:'1rem' }}>

                    <ListItemIcon sx={{ minWidth: 'auto', marginBottom: { xs: '10px', sm: '0' } }}>
                        <Box
                            component="img"
                            src={item.coverImage_url}
                            sx={{
                                width: { xs: 50, sm: 60 }, 
                                height: { xs: 50, sm: 60 },
                                borderRadius: 2,
                                mr: { sm: 2 }
                            }}
                        />
                    </ListItemIcon>
                    
                    <ListItemText
                        primary={
                            <Typography variant="body1" fontWeight="bold" color="#161616">
                                {item.title}
                            </Typography>
                        }
                        secondary={item.subtitle}
                        sx={{ flex: 1, textAlign: "left" }}
                    />
                    </Box>
                    
                    {activeAudio.tab === selectedCategory && activeAudio.index === index ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                            <audio
                                controls
                                autoPlay
                                disablepictureinpicture
                                controlslist="nodownload noplaybackrate"
                                style={{ maxWidth: '300px', width: '100%' }}
                            >
                                <source src={item.audiofile_url} type="audio/mp3" />
                            </audio>
                            <Button
                                variant="contained"
                                onClick={handleStop}
                                sx={{
                                    bgcolor: '#f09300',
                                    '&:hover': { bgcolor: '#DC6803' },
                                    borderRadius: 20,
                                    minWidth: { xs: "40px", sm: "auto" },
                                    padding: { xs: "6px", sm: "10px" }
                                }}
                            >
                                <PauseIcon />
                            </Button>
                        </Box>
                    ) : (
                        <IconButton
                            onClick={() => handlePlay(selectedCategory, index)}
                            sx={{
                                bgcolor: '#FCCC4D',
                                '&:hover': { bgcolor: '#f09300' },
                                width: { xs: 40, sm: "auto" },
                                height: { xs: 40, sm: "auto" }
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
