import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import "./newsLetter.css";
import { selectUserId } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import axios
 from "axios";
import { showSnackbar } from "../../redux/SnackBarSlice";
export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    let userId = useSelector(selectUserId);
    const dispatch = useDispatch();

    if (!userId) {
        userId = localStorage.getItem("id");
      }
    const handleSubscribe = async () => {

        try {
            const response = await axios.post(process.env.REACT_APP_URL + "/subscribe", { userId })
              console.log("json",response);

            if (response.data.message == 'Subscribed successfully!') {
                // setSnackbarMessage('Subscribed successfully!');
                // setSnackbarSeverity('success');
                dispatch(showSnackbar({ message: "Subscribed successfully!", severity: "success" }));

            } else if(response.data.message == 'User is already subscribed'){
                dispatch(showSnackbar({ message: "Already subscribed.", severity: "info" }));
            }
        } catch (error) {
            if (error.response) {
                // Handle known API errors
                if (error.response.status === 400 && error.response.data.message === "User is already subscribed") {
                    dispatch(showSnackbar({ message: "Already subscribed.", severity: "info" }));
                } else {
                    dispatch(showSnackbar({ message: error.response.data.message || "An error occurred. Please try again later.", severity: "error" }));
                }
            } else {
                // Handle network errors
                console.error("Error subscribing:", error);
                dispatch(showSnackbar({ message: "An error occurred. Please try again later.", severity: "error" }));
            }
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
                    {/* <TextField
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
                    /> */}
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