import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectUserId, selectIsUserLoggedIn } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Loader } from '../../components/loader/loader';
import UpgradeNow from './upgradeNow';
import Gif_Loader from '../../components/loader/Gif_Loader';

const plans = [
    {
        name: "basic",
        price: "₹0",
        priceInt: 0,
        features: [
            "Access to one chapter of E-magazine",
            "One audio content",
            "One video content",
            "Ability to shop for books",
        ],
        buttonLabel: "Free",
        buttonStyle: {
            backgroundColor: "#E6E6E6",
            color: "#000",
        },
    },
    {
        name: "elite",
        price: "₹599/year",
        priceInt: 599,
        features: [
            "Access to all E-magazine content",
            "All audio content",
            "All video content",
            "Ability to shop for books",
        ],
        buttonLabel: "Purchase Now",
        buttonStyle: {
            backgroundColor: "#F09300",
            color: "#fff",
        },
    },
    {
        name: "premium",
        price: "₹999/year",
        priceInt: 999,
        features: [
            "Access to all E-magazine content",
            "All audio content",
            "All video content",
            "Ability to shop for books",
            "Hard copy subscription of E-magazine",
        ],
        buttonLabel: "Purchase Now",
        buttonStyle: {
            backgroundColor: "#F09300",
            color: "#fff",
        },
    },
];
export default function Dashboard({showAlert}) {
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const isUserLoggedInFromStore = useSelector(selectIsUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    const [isMounted, setIsMounted] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    useEffect(() => {
        setIsMounted(true);  // Set the flag to true once the component mounts
    }, []);

    const { data: planData, status: planStatus, isLoading: planIsLoading, error: planError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL + `/getPlan`, {
                params: {
                    id: userId ? userId : localStorage.getItem('id')
                }
            });
            console.log("data", plans.filter((e) => e.name === data[0]["plan"])[0]);

            return plans.filter((e) => e.name === data[0]["plan"])[0];
        },
        queryKey: ["plan-detail", isUserLoggedIn],
        enabled: isMounted && !!isUserLoggedIn,
    });

    const { data: expiryData, status: expiryStatus, isLoading: expiryIsLoading, error: expiryError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL + `/getExpiry`, {
                params: {
                    id: userId ? userId : localStorage.getItem('id')
                }
            });

            return data[0];
        },
        queryKey: ["expiry-detail", isUserLoggedIn],
        enabled: isMounted && !!isUserLoggedIn,
    });


    if (planIsLoading) {
        // return <Loader />;
        return <Gif_Loader />;
    }

    if (planError) {
        return <Alert severity="error">Error loading subscription data: {planError.message}</Alert>;
    }

    console.log("planData", planData, expiryData, showAlert);

    return (
        <div>
            
            {showAlert && <Alert severity="info">Please Update your Account details</Alert> }
{showAlert}
            {/* Plan Card */}
            <Card variant="outlined" sx={{ margin: '1rem 0' }}>
                <CardContent>
                    <p style={{ fontSize: "1rem" }}>Current Subscription</p>
                    {planData ? (
                        <>
                            <h3>{planData?.name?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
                                .join(' ')} Plan</h3>

                            <List>
                                {planData?.features?.map((detail, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: 'green' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={detail} />
                                    </ListItem>
                                ))}
                            </List>

                            <br />
                            <Alert severity="info">Your Magazine Subscription starts from <strong>{expiryData?.created_dt?.slice(0, 10)}</strong> Ends on  <strong>{expiryData?.expiry_dt?.slice(0, 10)}.</strong>
                                <a href="#" style={{ textDecoration: "none" }}>
                                    <span style={{ color: "#f09300", fontWeight: "bold", marginLeft: "5px" }} onClick={handleOpen}>
                                        Renew / Upgrade now
                                    </span>
                                </a>
                            </Alert>
                            {/* <Button variant="contained" sx={{ textTransform: "none", background: "#0ABB75" }} disableElevation >Upgrade Now</Button> */}
                            <UpgradeNow open={openModal} planName={planData["name"]} handleClose={handleClose} handleOpen={handleOpen} plans={plans} />
                        </>
                    ) : (
                        <p>Loading your subscription details...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
