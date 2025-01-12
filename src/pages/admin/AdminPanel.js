import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminOverview from './AdminOverview';
import FreeMember from './FreeMember';
import PremiumMember from './PremiumMember';
import TodaysThought from './TodaysThought';
import NewsLetter from './NewsLetter';
import AddBlog from './Add product/AddBlog';
import AddBook from './Add product/AddBook';
import AddAudio from './Add product/AddAudio';
import AddVideo from './Add product/AddVideo';
import PushNotification from './PushNotification';
import PackagePlan from './PackagePlan';
import PaymentGateway from './General settings/PaymentGateway';
import ThirdPartyLogin from './General settings/ThirdPartyLogin';
import GoogleAnalytics from './General settings/GoogleAnalytics';
import Smtp from './General settings/Smtp';
import EliteMember from './EliteMember';
import OfflineMember from './OfflineMember';

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
            {value === index && <Box>{children}</Box>}
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

function NestedTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nested-tabpanel-${index}`}
            aria-labelledby={`nested-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

NestedTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function AdminPanel() {
    const [value, setValue] = React.useState(0);
    const [nestedValue, setNestedValue] = React.useState(0);

    const handleChange = (event, newValue) => setValue(newValue);
    const handleNestedChange = (event, newValue) => setNestedValue(newValue);

    const tabs = [
        { label: "Overview", content: <AdminOverview /> },
        {
            label: "Members", content: (
                <Box>
                    <Tabs
                        value={nestedValue}
                        onChange={handleNestedChange}
                        aria-label="Nested tabs example"
                        TabIndicatorProps={{ style: { backgroundColor: "#f09300" } }}
                        sx={{ borderBottom: 1, borderColor: 'divider', margin: "1rem 0 1rem 1rem" }}
                    >
                        {["Basic", "Elite", "Premium", "Offline - CRM"].map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                sx={{
                                    textTransform: "none",
                                    textAlign: "left",
                                    "&.Mui-selected": {
                                        color: "#000",
                                        fontWeight: "bold",
                                    },
                                }}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <NestedTabPanel value={nestedValue} index={0}><FreeMember /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={1}><EliteMember /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={2}><PremiumMember /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={3}><OfflineMember /></NestedTabPanel>
                </Box>
            )
        },
        {
            label: "Add Product", content: (
                <Box>
                    <Tabs
                        value={nestedValue}
                        onChange={handleNestedChange}
                        aria-label="Nested tabs example"
                        TabIndicatorProps={{ style: { backgroundColor: "#f09300" } }}
                        sx={{ borderBottom: 1, borderColor: 'divider', margin: "1rem 0 1rem 1rem" }}
                    >
                        {["Add Book", "Add E-Magazine", "Add Blog", "Add Audio", "Add Video"].map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                sx={{
                                    textTransform: "none",
                                    textAlign: "left",
                                    "&.Mui-selected": {
                                        color: "#000",
                                        fontWeight: "bold",
                                    },
                                }}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <NestedTabPanel value={nestedValue} index={0}><AddBook /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={1}></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={2}><AddBlog /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={3}><AddAudio /></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={4}><AddVideo /></NestedTabPanel>
                </Box>
            )
        },
        { label: "Send News letter", content: <NewsLetter /> },
        { label: "Today's thought", content: <TodaysThought /> },
        { label: "Push Noification", content: <PushNotification /> },
        { label: "Package Plan", content: <PackagePlan /> },
        {
            label: "General Settings", content: (
                <Box>
                    <Tabs
                        value={nestedValue}
                        onChange={handleNestedChange}
                        aria-label="Nested tabs example"
                        TabIndicatorProps={{ style: { backgroundColor: "#f09300" } }}
                        sx={{ borderBottom: 1, borderColor: 'divider', margin: "1rem 0 1rem 1rem" }}
                    >
                        {["Payment Gateway", "Third Party Login", "Google Analytics", "SMTP Settings"].map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                sx={{
                                    textTransform: "none",
                                    textAlign: "left",
                                    "&.Mui-selected": {
                                        color: "#000",
                                        fontWeight: "bold",
                                    },
                                }}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <NestedTabPanel value={nestedValue} index={0}><PaymentGateway/></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={1}><ThirdPartyLogin/></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={2}><GoogleAnalytics/></NestedTabPanel>
                    <NestedTabPanel value={nestedValue} index={3}><Smtp/></NestedTabPanel>
                    {/* <NestedTabPanel value={nestedValue} index={4}><AddVideo /></NestedTabPanel> */}
                </Box>
            )
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', minHeight: '100vh' }}>
            <Box width={"20%"} backgroundColor="white" boxShadow={2} sx={{ padding: 0 }}>
                <div style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "white",
                    paddingTop: "1rem",
                    paddingRight: "1rem",
                }}>
                    <h3>Admin Dashboard</h3>
                </div>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                        background: "white",
                        "& .MuiTabs-indicator": { width: "5px" }
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
                                    backgroundColor: "#FDEAB7",
                                    color: "#000",
                                    fontWeight: "bold",
                                },
                                justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: '3rem'
                            }}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2, width: "80%" }}>
                {tabs.map((tab, index) => (
                    <TabPanel key={index} value={value} index={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </Box>
        </Box>
    );
}
