import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import Dashboard from './dashboard';
import Avatar from '@mui/material/Avatar';
import AccountDetails from './accountDetails';
import Button from '@mui/material/Button';
import MagazineSubsricption from './magazineSubscription';
import DeleteAccount from './deleteAccount';
import Favorite from './favorite';
import LastRead from './lastRead';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/cartSlice';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import YourOrder from './YourOrder';
import {useNavigate, useLocation} from 'react-router-dom'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ 
                    marginLeft: { xs: 0, md: "3rem" },
                    mt: { xs: 2, md: 0 }
                }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function UserDashboard() {

    localStorage.getItem('username')
    // const [value, setValue] = React.useState(0);
    const [userName, setUserName] = React.useState(localStorage.getItem('username') || localStorage.getItem('email'));
    const [formData, setFormData] = useState({});  // Store editable form data
    const userId = useSelector(selectUserId) || localStorage.getItem("id");  // Get the user ID from Redux
    const [missingFields, setMissingFields] = useState(false);

    // Fetch user data on component mount
    const { data: userData, isLoading:userDataLoading, isError, error } = useQuery(
      ["userDetails", userId],  // Query key (this is how react-query knows about the query)
      async () =>{
        const response = await axios.get(process.env.REACT_APP_URL + "/getUserDetails", {
          params: { userId: userId },
        })
        return response.data;
    });
    
    const handleLogout = ()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');

        window.location.href = '/home'
    }
    // Populate the form fields with the fetched user data
    useEffect(() => {
      if (userData) {
        setFormData(userData);
      }
    }, [userData]);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get tab index from query parameter, default to 0 (Dashboard)
    const queryParams = new URLSearchParams(location.search);
    const defaultTab = parseInt(queryParams.get("tab")) || 0;

    const [value, setValue] = React.useState(defaultTab);

    const handleChange = (event, newValue) => {
        setValue(newValue); // Update tab value
        
        // Update URL with selected tab
        navigate(`/dashboard?tab=${newValue}`);
    };
    React.useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUserName(storedUsername);
        }
    }, []);

    const validateFields = (data) => {
        console.log("Validating formData:", data);
    
        if (!data || Object.keys(data).length === 0) return true; // If no data, assume fields are missing
    
        const requiredFields = ["firstName", "lastName", "gender", "dob", "phone", "email", "doorNo", "streetName", "city", "state", "country", "zipCode"];
        
        return !requiredFields.every((field) => !!data[field]); // Returns `true` if any field is missing
    };
    
    // Validate fields when the component first renders and when `formData` changes
    useEffect(() => {
        console.log("formData updated:", formData); // Debugging output
        setMissingFields(validateFields(formData)); 
    }, [formData]);
    

    const tabs = [
        { label: "Dashboard", content: <Dashboard showAlert={missingFields} /> },
        { label: "Account Details", content: <AccountDetails formData={formData[0]} 
            setFormData={setFormData} userData={userData} isLoading={userDataLoading} userId={userId} setMissingFields={setMissingFields}  /> },
        // { label: "Magazine Subscription", content: <MagazineSubsricption /> },
        { label: "Your Order", content: <YourOrder /> },
        // { label: "E-Magazine last read", content: <LastRead /> },
        // { label: "Favorite", content: <Favorite/> },
        { label: "Delete Account", content: <DeleteAccount userId={userId}/> },
    ];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                padding: { xs: "2rem 0", md: "4rem 0" },
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                {/* User Info Section */}
                <Box sx={{
                    width: { xs: '100%', md: '18rem' },
                    mb: { xs: 3, md: 0 }
                }}>
                    <div style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: isMobile ? "transparent" : "white",
                        paddingTop: "1rem",
                    }}>
                        <Avatar 
                            alt="User Avatar" 
                            sx={{ 
                                width: { xs: "4rem", md: "5rem" }, 
                                height: { xs: "4rem", md: "5rem" }, 
                                backgroundColor: "#DC6803", 
                                fontSize: { xs: "1.5rem", md: "2rem" }, 
                                fontWeight: "bold" 
                            }}
                        >
                            {userName?.slice(0,1).toUpperCase()}
                        </Avatar>
                        <h3>{userName}</h3>
                    </div>

                    <Tabs
                        orientation={isMobile ? "horizontal" : "vertical"}
                        value={value}
                        onChange={handleChange}
                        aria-label="Dashboard tabs"
                        variant={isMobile ? "scrollable" : "standard"}
                        scrollButtons={isMobile ? "auto" : false}
                        sx={{
                            backgroundColor: isMobile ? "transparent" : "white",
                            
                            "& .MuiTabs-indicator": { 
                                [isMobile ? 'bottom' : 'left']: 0,
                                width: isMobile ? "100%" : "5px",
                                height: isMobile ? "2px" : "auto"
                            },
                            ...(isMobile && {
                                borderBottom: 1,
                                borderColor: 'divider',
                            })
                        }}
                        TabIndicatorProps={{ 
                            style: { 
                                backgroundColor: "#f09300",
                                width: isMobile ? "100%" : "5px"
                            } 
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                sx={{
                                    textTransform: "none",
                                    textAlign: "left",
                                    minWidth: { xs: 'auto', md: '100%' },
                                    "&.Mui-selected": {
                                        backgroundColor: isMobile ? "transparent" : "#f0930094",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }
                                }}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <Box sx={{ 
                        mt: 2,
                        px: { xs: 2, md: 0 }
                    }}>
                        <Button 
                            disableElevation 
                            variant="contained" 
                            color="black" 
                            onClick={() => handleLogout()}
                            sx={{ 
                                float: "center", 
                                textTransform: 'none', 
                                background: "#f09300", 
                                fontWeight: "bold", 
                                borderRadius: "30px", 
                                width: "100%",
                                padding: { xs: "0.4rem 2rem", md: "1rem 3rem" }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>

                {/* Tab Content */}
                <Box sx={{ 
                    flexGrow: 1,
                    mt: { xs: 3, md: 0 }
                }}>
                    {tabs.map((tab, index) => (
                        <TabPanel key={index} value={value} index={index}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
