import { Divider, Typography, Button, Badge, Container, Menu, MenuItem, ListItemIcon } from '@mui/material'
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
import { useDispatch } from "react-redux";
import { openLogin, setUserLoggedIn, setUserId } from '../../redux/cartSlice';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        const routes = ['/', '/ebooks', '/audio_video', '/blog', '/about', '/contact'];
        const currentPath = window.location.pathname;
        const currentIndex = routes.indexOf(currentPath);
        if (currentIndex !== -1) {
            setValue(currentIndex);
        } else {
            setValue(false);
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const routes = ['/', '/ebooks', '/audio_video', '/blog', '/about', '/contact'];
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
        setUsername(null);
        setEmail(null);
        dispatch(setUserLoggedIn(false));
        handleMenuClose();
        // navigate('/home')
    };
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
                <div className="topContainer">
                    <div className="topLeft">
                        <bold className="text">Helpline</bold>
                        <img src={navBanner.icons.phone} />
                        <bold className='text'>+91 9176564723</bold>
                    </div>
                    <div className="topRight">
                        <div style={{ display: "flex" }} >
                            {/* <img src={navBanner.icons.traslate} /> */}
                            {/* <bold className="text" style={{ marginLeft: "5px" }}>English</bold> */}
                            <div id="google_translate_element" ></div>

                        </div>
                        <navBanner.icons.facebook sx={{ fontSize: "1rem" }} />
                        <navBanner.icons.twitter sx={{ fontSize: "1rem" }} />
                        <navBanner.icons.instagram sx={{ fontSize: "1rem" }} />
                    </div>
                </div>
            </Container>
            <div style={{ borderBottom: "1px solid #E6E6E6" }}></div>
            <Container maxWidth="lg">
                <div className='navContainer'>
                    <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor: "pointer" }} onClick={() => { navigate('/home') }} />
                    <div >
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
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {username ? (
                            <>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }} onClick={handleMenuOpen}>
                                    <img src={navBanner.icons.user} style={{ width: "0.9rem" }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "0.75rem", color: "#444" }}>
                                        {username.charAt(0).toUpperCase() + username.slice(1)}
                                    </Typography>
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem sx={{fontSize:"14px", padding:"1rem 1rem", pointerEvents:"none"}}>
                                        <ListItemIcon>
                                            <EmailIcon />
                                        </ListItemIcon>
                                        {email}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem sx={{fontSize:"14px"}} onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                        My Profile
                                    </MenuItem>
                                    <MenuItem sx={{fontSize:"14px"}} onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button disableRipple onClick={() => dispatch(openLogin()) } variant="text" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#444" }} startIcon={<img src={navBanner.icons.user} style={{ width: "0.9rem" }} />}>
                                Login
                            </Button>
                        )}
                        <Button disableRipple variant="text" sx={{ textTransform: "none", gap: "0.8rem", fontWeight: 600, fontSize: "0.75rem", color: "#444" }}
                            onClick={() => { navigate('/cart') }}>
                            <StyledBadge badgeContent={4}>
                                <img src={navBanner.icons.cart} style={{ width: "1rem" }} />
                            </StyledBadge>
                            Items
                        </Button>
                    </div>
                </div>
            </Container>
            <TodayThoughts />

        </div>

        </>
    )
}
