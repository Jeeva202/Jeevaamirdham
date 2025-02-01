import { Box, Divider, Typography, Button, Badge, Container, Menu, MenuItem, ListItemIcon, IconButton, Drawer, List, ListItem, ListItemText, colors } from '@mui/material'
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
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from "react-i18next";
import Avatar from '@mui/material/Avatar';

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
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const handleLangChange = (event) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
        localStorage.setItem("language", selectedLang);
    };

    const getBadgeCount = () => {
        if (isUserLoggedIn) {
            return cart_details && Array.isArray(cart_details) ? cart_details.length : 0;
        } else {
            return cart_details ? cart_details.length : 0;
        }
    };
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const storeId = localStorage.getItem("id")
        if (storedEmail || storedUsername || storeId) {
            dispatch(setUserLoggedIn(true));
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storeId) {
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
        const updateTabValue = () => {
            const routes = ['/', '/emagazine', '/audio_video', '/blog', '/about', '/contact'];
            const currentPath = window.location.pathname;

            // Handle '/home' route same as '/'
            const pathToCheck = currentPath === '/home' ? '/' : currentPath;
            const currentIndex = routes.indexOf(pathToCheck);

            if (currentIndex !== -1) {
                setValue(currentIndex);
            } else {
                setValue(false);
            }
        };

        updateTabValue();
        // Add event listener for route changes
        window.addEventListener('popstate', updateTabValue);
        return () => window.removeEventListener('popstate', updateTabValue);
    }, [window.location.pathname]); // Add pathname as dependency

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                if (isUserLoggedIn && userId) {
                    const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/get_cart?id=${userId}`);
                    const cartData = response.data.cart_details;
                    dispatch(setCartDetails(cartData));
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [isUserLoggedIn, userId, dispatch]);

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
        window.location.reload();
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleLogoClick = () => {
        setValue(0); // Set to home tab
        navigate('/home');
    };

    const drawer = (
        <Box sx={{ width: 250, background: '#fbf1e6', height: '-webkit-fill-available' }}>
            <Box sx={{ display: "flex", justifyContent: 'center', padding: '2rem 0' }}>
                <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor: "pointer" }} onClick={handleLogoClick} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', paddingRight: '0.8rem' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', paddingLeft: '1rem' }}>Menu</Typography>
                <IconButton onClick={handleDrawerClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {[t('homepage'), t('eMagazine'), t('audioVideo'), t('blog'), t('aboutUs'), t('contact')].map((text, index) => (
                    <><ListItem button key={text} onClick={() => handleChange(null, index)}>
                        <ListItemText primary={text}
                            sx={{
                                "& .MuiTypography-root": {
                                    fontWeight: 'bold',
                                },
                            }} />
                        <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                            <ChevronRightIcon />
                        </ListItemIcon>
                    </ListItem>
                        <Divider variant="middle" />
                    </>

                ))}
                <ListItem button onClick={() => navigate('/cart')}>
                    <ListItemText primary={t('cart')} sx={{
                        "& .MuiTypography-root": {
                            fontWeight: 'bold',
                        },
                    }} />
                    <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                        <ChevronRightIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
        </Box>
    );

    return (
        // boxShadow: "0px 5px 14px 0px rgba(0, 0, 0, 0.16)",
        <><div style={{ background: "#FFF", zIndex: "1", position: "relative" }}>
            <Container maxWidth="lg">
                <div className="topContainer">
                    <div className="topLeft">
                        <bold className="text">For Any Queries:</bold>
                        {/* <img src={navBanner.icons.phone} /> */}
                        <bold className='text' style={{color:'#F09300'}}>admin@jeevaamirdham.org</bold>
                    </div>
                    <div className="topRight">
                        <div style={{ display: "flex" }} >

                        <FormControl sx={{ minWidth: 90, border:'none' }} size="small">
                        {/* <InputLabel id="demo-select-small-label" sx={{fontSize:'0.9rem'}}>Language</InputLabel> */} 
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={currentLanguage} 
                            label="Language"
                            size='small'
                            onChange={handleLangChange}
                            sx={{
                                "&.MuiOutlinedInput-root": { border: "none" },
                                "& fieldset": { border: "none" }, // Removes the default outline
                                "&:hover fieldset": { border: "none" },
                                "&.Mui-focused fieldset": { border: "none" },
                                fontSize:'0.9rem'
                            }}
                        >
                            <MenuItem value="en" sx={{fontSize:'0.9rem'}}>English</MenuItem>
                            <MenuItem value="ta" sx={{fontSize:'0.9rem'}}>தமிழ்</MenuItem>
                        </Select>
                    </FormControl>
                        </div>
                    </div>
                </div>
            </Container>
            <div style={{ borderBottom: "1px solid #E6E6E6" }}></div>
            <Container maxWidth="lg" sx={{zoom:{xs:'80%', sm:'100%', md:'100%', lg:'100%'}}}>
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

                    <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor: "pointer" }} onClick={handleLogoClick} />

                    <div className="desktopMenu">
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example"
                        >
                            <StyledTab label={t('homepage')} />
                            <StyledTab label={t('eMagazine')} />
                            <StyledTab label={t('audioVideo')} />
                            <StyledTab label={t('blog')} />
                            <StyledTab label={t('aboutUs')} />
                            <StyledTab label={t('contact')} />
                            {/* <StyledTab label="Dashboard" /> */}
                        </StyledTabs>
                        <div sx={{ p: 2 }} />
                    </div>

                    <div style={{ display: "flex", gap: "0rem" }}>
                        {username ? (
                            <>
                                {/* <Button disableRipple onClick={handleMenuOpen} variant="text" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#444" }} endIcon={<KeyboardArrowDownIcon />}>
                                    {username.charAt(0).toUpperCase() + username.slice(1)}
                                </Button> */}
                                <Box onClick={handleMenuOpen} sx={{display:'flex', alignItems:'center', gap:'0.3rem', cursor:'pointer'}}>
                                <Avatar  sx={{ background:'#ff5722', width:'2rem', height:'2rem' }}>{username.toUpperCase().slice(0, 1)}</Avatar>
                                <KeyboardArrowDownIcon />
                                </Box>
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
                                        {t('myProfile')}
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: "14px" }} onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        {t('logout')}
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button disableRipple onClick={() => dispatch(openLogin())} variant="text" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", color: "#444" }} startIcon={<img src={navBanner.icons.user} style={{ width: "0.9rem" }} />} >
                                {t('login')}
                            </Button>
                        )}
                        <Button disableRipple variant="text" sx={{ textTransform: "none", gap: "0.8rem", fontWeight: 600, fontSize: "0.75rem", color: "#444" }}
                            onClick={() => { navigate('/cart') }}>
                            <StyledBadge badgeContent={getBadgeCount()} max={99} showZero={false}>
                                <img src={navBanner.icons.cart} style={{ width: "1rem" }} />
                            </StyledBadge>
                        </Button>
                    </div>
                </div>
            </Container>
            <TodayThoughts />

        </div>

        </>
    )
}