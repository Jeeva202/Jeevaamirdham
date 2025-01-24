import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import "./newsLetter.css";

export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubscribe = async () => {
        if (!email) {
            setSnackbarMessage('Please enter a valid email address.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
            return;
        }

        const subscriptionData = {
            email,
        };

        try {
            const response = await fetch(process.env.REACT_APP_SUBSCRIBE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriptionData)
            });

            if (response.ok) {
                setSnackbarMessage('Subscribed successfully!');
                setSnackbarSeverity('success');
                setEmail('');
            } else {
                setSnackbarMessage('Failed to subscribe. Please try again later.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="NewsLetter">
            <div className="content-section">
                <div className="title">
                    Subscribe here to get
                    interesting stuff and updates!
                </div>
                <div className="subtitle">
                    Enter your email address to receive regular updates, as well as news on
                    upcoming events and specific offers.
                </div>
                <div className="subscribe">
                    <TextField
                        variant="outlined"
                        placeholder="Your email address"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                height: '40px',
                                borderRadius: "1.2rem",
                                backgroundColor: '#FFFAEB',
                                '&:hover fieldset': {
                                    borderColor: '#FCCC4D',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#DC6803',
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubscribe}
                        disableElevation
                        sx={{ 
                            height: '40px',
                            minWidth: '120px',
                            backgroundColor: "#DC6803",
                            color: "white",
                            padding: "0.5rem 1.5rem",
                            textTransform: 'none',
                            borderRadius: "1.2rem",
                            '&:hover': {
                                backgroundColor: "#B54708"
                            },
                            '@media (max-width: 480px)': {
                                width: '100%'
                            }
                        }}
                    >
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className="img-section">
                <img src="/assets/images/Subscribe.png" alt="Subscribe" />
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}