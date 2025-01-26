import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
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
                <Box sx={{ marginLeft: "3rem" }}>
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

    const [value, setValue] = React.useState(0);
    const [userName, setUserName] = React.useState("Username");
    const [formData, setFormData] = useState({});  // Store editable form data
    const userId = useSelector(selectUserId) || localStorage.getItem("id");  // Get the user ID from Redux
  
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
    const handleChange = (event, newValue) => {
        setValue(newValue); // Update tab value
    };
    React.useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUserName(storedUsername);
        }
    }, []);

    const tabs = [
        { label: "Dashboard", content: <Dashboard /> },
        { label: "Account Details", content: <AccountDetails formData={formData[0]} setFormData={setFormData} userData={userData} isLoading={userDataLoading} userId={userId} /> },
        // { label: "Magazine Subscription", content: <MagazineSubsricption /> },
        { label: "Your Order", content: <YourOrder /> },
        // { label: "E-Magazine last read", content: <LastRead /> },
        // { label: "Favorite", content: <Favorite/> },
        { label: "Delete Account", content: <DeleteAccount userId={userId}/> },
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1, display: 'flex', padding: "4rem 0" }}>
                {/* /* User Info Section */}
                                <Box width={"18rem"}>
                                    <div style={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        background: "white",
                                        paddingTop: "1rem",
                                        
                                    }}>
                                        <Avatar alt="User Avatar" sx={{ width: "5rem", height: "5rem" }} src="/static/images/avatar/1.jpg" />
                                        <h3>{userName}</h3>
                                    </div>

                                    <Tabs
                                        orientation="vertical"
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        sx={{
                                            background: "white",
                                            "& .MuiTabs-indicator": { left: 0, width: "5px" }
                                        }}
                                        TabIndicatorProps={{ style: { backgroundColor: "#f09300", width: "5px" } }}
                                    >
                                        {tabs.map((tab, index) => (
                                            <Tab
                                                key={index}
                                                label={tab.label}
                                                sx={{
                                                    textTransform: "none",
                                                    textAlign: "left",
                                                    "&.Mui-selected": {
                                                        backgroundColor: "#f0930094",
                                                        color: "#000",
                                                        fontWeight: "bold",
                                                    }
                                                }}
                                                {...a11yProps(index)}
                                            />
                                        ))}
                                    </Tabs>
                                    <br/>
                                    <Button disableElevation variant="contained" color="black" sx={{ float: "center", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", width:"100%" , padding: "1rem 3rem" }}  
                                    onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </Button>
                                </Box>

                                {/* Tab Content */}
                <Box sx={{ flexGrow: 1 }}>
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
