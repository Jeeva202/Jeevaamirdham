import React, {useState} from 'react';
import { Modal, Box, IconButton, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { openLogin, selectUserId } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const plans = [
    {
        name: "basic",
        price: "₹0",
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
export default function SubscriptionModal({open, handleClose, handleOpen}) {
    const [openModal, setOpenModal] = useState(false);
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    const dispatch = useDispatch();

    const handlePurchase = async (planName) => {
        const userData = {
            name: localStorage.getItem('username') || null,
            email: localStorage.getItem('email') || null,
            id: localStorage.getItem('id') || null
        };
    
        try {
            // Fetch the price of the selected plan from the backend
            const response = await fetch(process.env.REACT_APP_URL + `/emagazine-page/get-plan-amount?planName=${planName}`);
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
                        };
    
                        // Send payment data to your backend to store it
                        try {
                            const res = await fetch(process.env.REACT_APP_URL+"/emagazine-page/payment-success", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(paymentData),
                            });
    
                            if (res.ok) {
                                const data = await res.json();
                                console.log("Payment data saved successfully:", data);
                                alert("Payment successful and subscription activated!");
                            } else {
                                console.error("Failed to update backend");
                                alert("Payment was successful but could not update subscription. Please contact support.");
                            }
                        } catch (error) {
                            console.error("Error while updating backend:", error);
                            alert("An error occurred. Please contact support.");
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
                alert('Error fetching plan price');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching plan details');
        }
    };
    const payNow = (plan) => {
    
    if (isUserLoggedIn) {

        if (plan === 'basic') {
            handleClose()
            // setPaid(true)
            // setIsUserLoggedIn()
        }
        else if (plan === 'elite') {
            handlePurchase( plan)
        }
        else {
            handlePurchase(plan)
        }

    }
    else {
        dispatch(openLogin())
        handleOpen()
        // handleLoginOpen();
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
                width: 1000,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '8px',
                p: 4,
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
                    {plans.map((plan, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
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
                                        {plan.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, color: "black" }} variant="h4" color="primary" gutterBottom>
                                        {plan.price}
                                    </Typography>
                                    <List>
                                        {plan.features.map((feature, idx) => (
                                            <ListItem key={idx} disableGutters>
                                                <ListItemIcon>
                                                    <ListItemIcon>
                                                        <CheckCircleIcon sx={{ color: "rgb(34 197 94)" }} />
                                                    </ListItemIcon>
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
                                        {plan.buttonLabel}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    </Modal>
    )
}