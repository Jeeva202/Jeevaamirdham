import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { openLogin } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar } from '../../redux/SnackBarSlice';

export default function UpgradeNow({ open, planName, handleClose, handleOpen, plans }) {
    const [upgradePlans, setUpgradePlans] = useState([]);
    const [currentPlanPrice, setCurrentPlanPrice] = useState(0);
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    const dispatch = useDispatch();

    useEffect(() => {
        // Filter out the "basic" plan and update the state with only "elite" and "premium" plans
        const filteredPlans = plans.filter(plan => plan.name !== 'basic');
        setUpgradePlans(filteredPlans);

        // Fetch current plan price if available (assuming the current plan data is passed as planName)
        if (planName) {
            const currentPlan = plans.find(plan => plan.name === planName);
            setCurrentPlanPrice(currentPlan ? currentPlan.priceInt : 0); // Assuming priceInt is available
        }
    }, [plans, planName]);

    const handlePurchase = async (planName) => {
        const userData = {
            name: localStorage.getItem('username') || null,
            email: localStorage.getItem('email') || null,
            id: localStorage.getItem('id') || null
        };

        try {
            // Fetch the price of the selected plan from the backend
            const response = await fetch(process.env.REACT_APP_URL + `/emagazine-page/get-plan-upgrade-amount?planName=${planName}&userId=${userData?.id || ''}`);
            const data = await response.json();

            if (response.ok) {
                const amount = data.price;

                const options = {
                    key: "rzp_live_tjwWB1t6xxjHG1", // Your Razorpay key
                    amount: amount * 100, // Amount in paise
                    currency: "INR",
                    name: "Jeevaamirdham",
                    description: "Subscription Payment",
                    handler: async function (response) {
                        console.log("Payment successful:", response);

                        // Prepare payment data to send to the backend
                        const paymentData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            plan: planName,
                            amount: amount,
                            user_id: userData?.id || null,
                            purchaseType:data.purchase_type
                        };

                        // Send payment data to your backend to store it
                        try {
                            const res = await fetch(process.env.REACT_APP_URL + "/emagazine-page/upgrade-renewal-success", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(paymentData),
                            });

                            if (res.ok) {
                                const data = await res.json();
                                console.log("Payment data saved successfully:", data);
                                // alert("Payment successful and subscription activated!");
                                dispatch(showSnackbar({ message: "Payment successful and subscription activated!", severity: "success" }));
                                handleClose();
                                
                            } else {
                                console.error("Failed to update backend");
                                // alert("Payment was successful but could not update subscription. Please contact support.");
                                dispatch(showSnackbar({ message: "Payment was successful but could not update subscription. Please contact support.", severity: "error" }));
                            }
                        } catch (error) {
                            console.error("Error while updating backend:", error);
                            // alert("An error occurred. Please contact support.");
                            dispatch(showSnackbar({ message: "An error occurred. Please contact support.", severity: "error" }));
                        }
                    },
                    prefill: {
                        name: userData?.name || "",
                        email: userData?.email || "",
                        contact: userData?.contact || "",
                        id: userData?.id || "",
                    },
                    theme: {
                        color: "#7C3AED",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                console.error('Error fetching plan price');
                // alert('Error fetching plan price');
                dispatch(showSnackbar({ message: "Error fetching plan price", severity: "error" }));
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred while fetching plan details');
            dispatch(showSnackbar({ message: "An error occurred while fetching plan details", severity: "error" }));
        } 
    };

    const payNow = (plan) => {
        const newPlan = upgradePlans.find(p => p.name === plan);
        if (isUserLoggedIn) {
            handlePurchase(plan);
        } else {
            dispatch(openLogin());
            handleOpen();
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 600, md: 800, lg: 1000 },
                    height: "80vh",
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '8px',
                    padding: { xs: '0.5rem', sm: '1rem' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: 'gray',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Container maxWidth="md">
                    <Box textAlign="center" my={4}>
                        <Typography variant="h4" gutterBottom>
                            Choose Your Plan
                        </Typography>
                        <Typography variant="subtitle1">
                            Select the perfect subscription plan for your needs
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {upgradePlans.map((plan, index) => {
                            // Calculate the upgrade cost by subtracting current plan price
                            const upgradeCost = plan.priceInt - currentPlanPrice;
                            return (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "100%",
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, fontWeight: 600 }}>
                                            <Typography sx={{ fontSize: "1.2rem" }} variant="h6" gutterBottom>
                                                {plan.name.split(' ')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
                                                     .join(' ')}
                                            </Typography>
                                            <Typography sx={{ fontSize: '2rem', fontWeight: 500, color: "black" }} variant="h4" color="primary" gutterBottom>
                                                ₹{upgradeCost > 0 ? upgradeCost : plan.priceInt} {upgradeCost > 0 ? "(Upgrade)" : "(Full)"}
                                            </Typography>
                                            <List>
                                                {plan.features.map((feature, idx) => (
                                                    <ListItem key={idx} disableGutters>
                                                        <ListItemIcon>
                                                            <CheckCircleIcon sx={{ color: "rgb(34 197 94)" }} />
                                                        </ListItemIcon>
                                                        <ListItemText primary={feature} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                        <Box textAlign="center" mb={2} sx={{ px: 2 }}>
                                            <Button
                                                onClick={() => payNow(plan.name)}
                                                variant="contained"
                                                style={{ ...plan.buttonStyle, width: "100%", padding: "10px 0" }}
                                            >
                                                {upgradeCost > 0 ? "Upgrade Now" : "Renew Now"}
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            );
                        })}
                        <Typography variant="caption" display="block" sx={{ my: 2, color:'red',fontWeight:"bold" }}>
                                            * Note : Please do not pay through QR code since we are facing technical issue using that
                                                </Typography>
                    </Grid>
                </Container>
            </Box>
        </Modal>
    );
}
