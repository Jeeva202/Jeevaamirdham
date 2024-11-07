import { Divider, Typography, Button, Badge, Container } from '@mui/material'
import React from 'react'
import { navBanner } from '../../constants/screenData'
import "./topNavbar.css"
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

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
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);


        const routes = ['/', '/shop', '/pranavam-tv', '/blog', '/about', '/contact'];
        navigate(routes[newValue]);
    };
    return (
        <><div style={{ background: "#FFF", boxShadow: "0px 5px 14px 0px rgba(0, 0, 0, 0.16)", zIndex:"1", position:"relative" }}>
            <Container maxWidth="lg">
                <div className="topContainer">
                    <div className="topLeft">
                        <bold className="text">Helpline</bold>
                        <img src={navBanner.icons.phone} />
                        <bold className='text'>+91 9176564723</bold>
                    </div>
                    <div className="topRight">
                        <div style={{ display: "flex" }} >
                            <img src={navBanner.icons.traslate} />
                            <bold className="text" style={{ marginLeft: "5px" }}>English</bold>
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
                        <img src={navBanner.logo} alt='logo' style={{ width: "10rem", cursor:"pointer" }} onClick={() => { navigate('/home') }}/>
                        <div >
                            <StyledTabs
                                value={value}
                                onChange={handleChange}
                                aria-label="styled tabs example"
                            >
                                <StyledTab label="Home" />
                                <StyledTab label="Shop" />
                                <StyledTab label="Pranavam TV" />
                                <StyledTab label="Blog" />
                                <StyledTab label="About" />
                                <StyledTab label="Contact" />
                            </StyledTabs>
                            <div sx={{ p: 2 }} />
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button variant="test" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem" }} startIcon={<img src={navBanner.icons.search} style={{ width: "0.9rem" }} />}>
                                Search
                            </Button>
                            <Button onClick={() => { navigate('/login') }} variant="test" sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem" }} startIcon={<img src={navBanner.icons.user} style={{ width: "0.9rem" }} />}>
                                Login
                            </Button>
                            <Button variant="test" sx={{ textTransform: "none", gap: "0.8rem", fontWeight: 600, fontSize: "0.75rem" }}>
                                <StyledBadge badgeContent={4}>
                                    <img src={navBanner.icons.cart} style={{ width: "1rem" }} />
                                </StyledBadge>
                                Cart
                            </Button>
                        </div>
                    </div>
                </Container>
        </div>

        </>
    )
} 
