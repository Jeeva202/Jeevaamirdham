import { Divider, Typography, Button } from '@mui/material'
import React from 'react'
import { navBanner } from '../../constants/screenData'
import "./topNavbar.css"
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
export default function TopNavbar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <><div style={{ boxShadow: "0px 5px 14px 0px rgba(0, 0, 0, 0.16)" }}>
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
            <div>
                <div className='navContainer'>
                    <img src={navBanner.logo} alt='logo' style={{ width: "8rem" }} />
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
                        {/* <div style={{borderRight:"2px solid #d9d9d9"}}>
                            <img src={navBanner.icons.search} />
                        </div>
                        <Divider orientation="vertical" variant="middle"  />
                        <div style={{borderRight:"2px solid #d9d9d9"}}>
                            <img src={navBanner.icons.user} />
                        </div>
                        <Divider orientation="vertical" variant="middle"  />
                        <div>
                            <img src={navBanner.icons.cart} />
                        </div> */}

                        <Button variant="test" startIcon={<img src={navBanner.icons.search} />}>
                            Search
                        </Button>
                        <Button variant="test" startIcon={<img src={navBanner.icons.user} />}>
                            Login
                        </Button>
                        <Button variant="test" startIcon={<img src={navBanner.icons.cart} />}>
                            Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
} 
