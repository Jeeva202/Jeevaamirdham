import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Google logo icon
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth
import { jwtDecode } from 'jwt-decode';
import { navBanner } from '../../constants/screenData'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70rem",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,

};

const LoginModal = () => {
    const [open, setOpen] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        setOtpSent(false); // Reset OTP state when switching tabs
    };

    const handleEmailLogin = () => {
        console.log("Send Verification Link to:", email);
        alert("Verification link sent to " + email);
    };

    const handleSendOtp = () => {
        console.log("Send OTP to:", mobile);
        setOtpSent(true);
    };

    const handleVerifyOtp = () => {
        console.log("Verify OTP:", otp);
        alert("OTP Verified!");
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token); // Decode token to get user info (optional)
        console.log("Google User Info:", decoded);
        localStorage.setItem('username', decoded.name); // Store username in local storage
        localStorage.setItem('email', decoded.email); // Store email in local storage
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        setSnackbarMessage(`Welcome, ${decoded.name}!`);
        setSnackbarOpen(true);
        setOpen(false); // Close the modal after successful login
    };

    const handleGoogleLoginError = () => {
        console.error("Google Login Failed");
        alert("Google login failed. Please try again.");
    };

    const handleFacebookLogin = () => {
        console.log("Facebook Login Clicked");
        alert("Facebook login is not yet implemented.");
    };
    const responseFacebook = (response) => {
        console.log(response);
    }

    const handleContinueWithPhoneEmail = () => {
        setShowSignIn(true);
    };

    const handleBack = () => {
        if (otpSent) {
            setOtpSent(false);
        } else {
            setShowSignIn(false);
            setEmail("");
            setMobile("");
            setOtp("");
            setPassword("");
            setIsEmail(false);
        }
    };

    const handleNext = () => {
        if (email) {
            setIsEmail(true);
        } else {
            handleSendOtp();
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ width: "50%", backgroundImage: "url('/assets/images/blog_sample1.svg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            {/* Left side content */}
                        </Box>
                        <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 4, margin: "2rem 0" }}>
                            <IconButton sx={{ color: "#f09300", position: "absolute", top: 16, right: 16 }} onClick={() => setOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                            {showSignIn && (
                                // <Button onClick={handleBack} sx={{ alignSelf: "flex-start", position: "absolute", top: 16, left: 16 }}>Back</Button>
                                <IconButton sx={{ background: "#f09300", color: "white", position: "absolute", top: 16, left: 16 }} onClick={handleBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                            )}
                            <img src={navBanner.logo} alt='logo' style={{
                                width: "10rem"

                            }} />
                            <h1 style={{ color: "#F09300" }}>Welcome To Jeevaamirdham</h1>
                            <Box mt={3}>
                                {!showSignIn ? (
                                    <>
                                        <GoogleLogin
                                            onSuccess={handleGoogleLoginSuccess}
                                            onError={handleGoogleLoginError}
                                        />

                                        <FacebookLogin
                                            appId="1088597931155576"
                                            autoLoad={true}
                                            fields="name,email,picture"
                                            // onClick={componentClicked}
                                            render={renderProps => (
                                                <Box onClick={renderProps.onClick} sx={{ p: 1, margin: "1rem 0", display: "flex", alignItems: "center", border: "1px solid #dadce0", borderRadius: "4px", cursor: "pointer" }}>
                                                    <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />
                                                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                        <Typography sx={{ fontSize: "14px", color: "#3c4043" }}>Sign in with Facebook</Typography>
                                                    </Box>
                                                </Box>
                                            )}
                                            callback={responseFacebook} />


                                        <Divider sx={{ margin: "1rem 0" }}><Typography variant="caption" color="#999">Or sign in with</Typography></Divider>
                                        <Button onClick={handleContinueWithPhoneEmail} disableElevation fullWidth variant="contained" sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                            Continue with Phone/Email ID
                                        </Button>


                                        <div style={{ fontSize: "12px", textAlign: "center", marginTop: "20px", color: "#999" }}>
                                            By proceeding, you agree to our{" "}
                                            <span style={{ color: "#f09300", cursor: "pointer" }}>Privacy Policy</span>{" "}
                                            and{" "}
                                            <span style={{ color: "#f09300", cursor: "pointer" }}>Terms of Services</span>.
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {!otpSent && !isEmail ? (
                                            <>
                                                {/* <InputLabel sx={{ marginBottom: "0.7rem" }}>Enter Email or Mobile Number</InputLabel> */}
                                                <h2 style={{ color: "#f09300", textAlign: "center" }}>
                                                Enter Email or Mobile Number
                                                </h2>
                                                <TextField
                                                    placeholder="Email or Phone Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={email || mobile}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value.includes('@')) {
                                                            setEmail(value);
                                                            setMobile("");
                                                        } else {
                                                            setMobile(value);
                                                            setEmail("");
                                                        }
                                                    }}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Button onClick={handleNext} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Next
                                                </Button>
                                                <Divider sx={{ margin: "1rem 0" }}><Typography variant="caption" color="#999">Or sign in with</Typography></Divider>
                                                <GoogleLogin
                                                    onSuccess={handleGoogleLoginSuccess}
                                                    onError={handleGoogleLoginError}
                                                />
                                                <FacebookLogin
                                                    appId="1088597931155576"
                                                    autoLoad={true}
                                                    fields="name,email,picture"
                                                    // onClick={componentClicked}
                                                    render={renderProps => (
                                                        <Box onClick={renderProps.onClick} sx={{ p: 1, margin: "1rem 0", display: "flex", alignItems: "center", border: "1px solid #dadce0", borderRadius: "4px", cursor: "pointer" }}>
                                                            <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />
                                                            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                                                <Typography sx={{ fontSize: "14px", color: "#3c4043" }}>Sign in with Facebook</Typography>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    callback={responseFacebook} />
                                            </>
                                        ) : isEmail ? (
                                            <>
                                                <h2 style={{ color: "#f09300", textAlign: "center" }}>
                                                    Enter your password
                                                </h2>
                                                <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>Please enter password for your registered
                                                    email <strong style={{ color: "#333" }}>{email}</strong> </Typography>
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    sx={{ margin: "1rem 0" }}
                                                />
                                                <Button onClick={handleEmailLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Sign In
                                                </Button>
                                                <Button disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Forgot Password?
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <h2 style={{ color: "#f09300", textAlign: "center" }}>
                                                    Enter OTP
                                                </h2>
                                                <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                                                    We have sent an OTP to <strong style={{ color: "#333" }}>{mobile}</strong> </Typography>
                                                <TextField
                                                    label="Enter OTP"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Button onClick={handleVerifyOtp} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Verify OTP
                                                </Button>
                                                <Button disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Resend OTP
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default LoginModal;
