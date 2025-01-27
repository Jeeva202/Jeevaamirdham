import { Box, Divider, Typography, Button, Badge, Container, Menu, MenuItem, ListItemIcon, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { navBanner } from '../../constants/screenData'
import "./topNavbar.css"
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import TodayThoughts from './todayThoughts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import { openLogin, setUserLoggedIn, setUserId, selectCartDetails, selectUserId, setCartDetails, selectIsLoginOpen, selectIsUserLoggedIn } from '../../redux/cartSlice';
import axios from 'axios';

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))
    ({
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .css-1qltlow-MuiTabs-indicator': {
            height: 8,
            bottom: "5px"
        },
        '& .MuiTabs-indicatorSpan': {
            borderRadius: "50%",
            width: 8,
            backgroundColor: '#F09300',
        },
    });

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: 600,
        fontSize: "0.8rem",
        marginRight: theme.spacing(1),
        color: '#000',
        '&.Mui-selected': {
            color: '#F09300',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: "-3px",
        top: "-3px",
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        background: "#F09300",
        color: "white",
    },
}));
export default function TopNavbar() {
    const [value, setValue] = React.useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart_details = useSelector(selectCartDetails)
    const userIdfromstore = useSelector(selectUserId) 
    const userId = userIdfromstore ? userIdfromstore : localStorage.getItem('id')
    const badgeNumber = cart_details && Array.isArray(cart_details) ? cart_details.length : 0;
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storeId = localStorage.getItem("id")
        if(storedEmail || storedUsername || storeId){
            dispatch(setUserLoggedIn(true));
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if(storeId){
            dispatch(setUserId(storeId))
        }

console.log("cart", cart_details)
        const handleStorageChange = () => {
            const updatedUsername = localStorage.getItem('username');
            const updatedEmail = localStorage.getItem('email');
            const updateId = localStorage.getItem('id')
            dispatch(setUserId(updateId))
            setUsername(updatedUsername);
            setEmail(updatedEmail);

        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const routes = ['/', '/emagazine', '/audio_video', '/blog', '/about', '/contact'];
        const currentPath = window.location.pathname;
        const currentIndex = routes.indexOf(currentPath);
        if (currentIndex !== -1) {
            setValue(currentIndex);
        } else {
            setValue(false);
        }
    }, []);


    useEffect(async ()=>{
        if(isUserLoggedIn == true){
            const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/get_cart?id=${userId}`);
            const cartData = response.data.cart_details;
            setCartDetails(cartData)
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const routes = ['/', '/emagazine', '/audio_video', '/blog', '/about', '/contact'];
        navigate(routes[newValue]);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('id')
        setUsername(null);
        setEmail(null);
        dispatch(setUserLoggedIn(false));
        handleMenuClose();
        navigate('/home')
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const drawer = (
        <Box onClick={handleDrawerClose} sx={{ width: 250, background: '#fbf1e6', height: '-webkit-fill-available' }}>
            <Box sx={{ display: "flex", justifyContent: 'center', padding: '2rem 0' }}>
                <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor: "pointer" }} onClick={() => { navigate('/home') }} />
            </Box>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', paddingLeft: '1rem', paddingBottom: '1rem' }}>Menu</Typography>
            <Divider />
            <List>
                {['Homepage', 'E-Magazine', 'Audio & Video', 'Blog', 'About Us', 'Contact'].map((text, index) => (
                    <><ListItem button key={text} onClick={() => handleChange(null, index)}>
                        <ListItemText primary={text}
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: 'bold',
                                },
                            }} />
                        <ListItemIcon>
                            <ChevronRightIcon />
                        </ListItemIcon>
                    </ListItem>
                        <Divider variant="middle" />
                    </>

                ))}
                <ListItem button onClick={() => navigate('/cart')}>
                    <ListItemText primary="Cart" sx={{
                        "& .MuiTypography-root": {
                            fontWeight: 'bold',
                        },
                    }} />
                    <ListItemIcon>
                        <ChevronRightIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
        </Box>
    );

    useEffect(() => {
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
            script.async = true;
            script.onerror = () => {
                console.error("Failed to load Google Translate script");
            };
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,ta',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false
                    },
                    'google_translate_element'
                );
            } else {
                console.error("Google Translate is not available");
            }
        };

        addGoogleTranslateScript();
    }, []);
    useEffect(() => {
        const customizeGoogleTranslate = () => {
            const translateElement = document.querySelector('#google_translate_element select');
            if (translateElement) {
                translateElement.style.backgroundColor = '#25D366';
                translateElement.style.color = 'white';
                translateElement.style.border = 'none';
                translateElement.style.padding = '5px';
                translateElement.style.borderRadius = '5px';
            }
        };

        const observer = new MutationObserver(customizeGoogleTranslate);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);
    return (
        // boxShadow: "0px 5px 14px 0px rgba(0, 0, 0, 0.16)",
        <><div style={{ background: "#FFF", zIndex: "1", position: "relative" }}>
            <Container maxWidth="lg">
                {/* <div className="topContainer">
                    <div className="topLeft">
                        <bold className="text">Helpline</bold>
                        <img src={navBanner.icons.phone} />
                        <bold className='text'>+91 9176564723</bold>
                    </div>
                    <div className="topRight">
                        <div style={{ display: "flex" }} >

                        </div>
                    </div>
                </div> */}
            </Container>
            <div style={{ borderBottom: "1px solid #E6E6E6" }}></div>
            <Container maxWidth="lg">
                <div className='navContainer'>
                    <div className="mobileMenu">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={handleDrawerClose}
                        >
                            {drawer}
                        </Drawer>
                    </div>

                    <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor: "pointer" }} onClick={() => { navigate('/home') }} />

                    <div className="desktopMenu">
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example"
                        >
                            <StyledTab label="Homepage" />
                            <StyledTab label="E-Magazine" />
                            <StyledTab label="Audio & Video" />
                            <StyledTab label="Blog" />
                            <StyledTab label="About Us" />
                            <StyledTab label="Contact" />
                            {/* <StyledTab label="Dashboard" /> */}
                        </StyledTabs>
                        <div sx={{ p: 2 }} />
                    </div>

                    <div style={{ display: "flex", gap: "0rem" }}>
                        {username ? (
                            <>
                                <Button disableRipple onClick={handleMenuOpen} variant="text" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#444" }} endIcon={<KeyboardArrowDownIcon />}>
                                    {username.charAt(0).toUpperCase() + username.slice(1)}
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem sx={{ fontSize: "14px", padding: "1rem 1rem", pointerEvents: "none" }}>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        {email}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem sx={{ fontSize: "14px" }} onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                        My Profile
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: "14px" }} onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button disableRipple onClick={() => dispatch(openLogin())} variant="text" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#444" }} startIcon={<img src={navBanner.icons.user} style={{ width: "0.9rem" }} />} >
                                Login
                            </Button>
                        )}
                        <Button disableRipple variant="text" sx={{ textTransform: "none", gap: "0.8rem", fontWeight: 600, fontSize: "0.75rem", color: "#444" }}
                            onClick={() => { navigate('/cart') }}>
                            {/* <StyledBadge badgeContent={
                                cart_details != []? cart_details.length : cart_details
                                }> */}
                                <StyledBadge badgeContent={badgeNumber}>
                                <img src={navBanner.icons.cart} style={{ width: "1rem" }} />
                            </StyledBadge>
                            {/* Items */}
                        </Button>
                    </div>
                </div>
            </Container>
            <TodayThoughts />

        </div>

        </>
    )
}
