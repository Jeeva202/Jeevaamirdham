import React, { useState, useEffect } from "react";
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
import { openLogin, selectIsLoginOpen } from "../../redux/cartSlice";
import { closeLogin } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoggedIn, setAdminLoggedIn } from "../../redux/cartSlice";
import axios from "axios";
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';
import './NewLogin.css';
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "70rem",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,

};
const domain = 'http://localhost:3001'
const LoginModal = ({handleLogin}) => {
    const [open, setOpen] = useState(openLogin);
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
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
    const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
    const isOpen = useSelector(selectIsLoginOpen)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(closeLogin());
    };

    useEffect(() => {
        if (!isOpen) {
            resetState();
        }
    }, [isOpen]);

    const resetState = () => {
        setTabIndex(0);
        setEmail("");
        setMobile("");
        setOtp("");
        setPassword("");
        setOtpSent(false);
        setShowSignIn(false);
        setIsEmail(false);
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        setOtpSent(false); // Reset OTP state when switching tabs
    };

    const handleEmailLogin = () => {
        console.log("Send Verification Link to:", email);
        alert("Verification link sent to " + email);
        handleLogin(email, password)
    };

    const handleSendOtp = () => {
        console.log("Send OTP to:", mobile);
        setOtpSent(true);
    };

    const handleVerifyOtp = () => {
        console.log("Verify OTP:", otp);
        alert("OTP Verified!");
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token); // Decode token to get user info (optional)
        console.log("Google User Info:", decoded);
        let { name, email } = decoded
        localStorage.setItem('username', decoded.name); // Store username in local storage
        localStorage.setItem('email', decoded.email); // Store email in local storage
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        setSnackbarMessage(`Welcome, ${decoded.name}!`);
        setSnackbarOpen(true);
        dispatch(closeLogin());
        try {
            // Check if the user exists
            console.log(domain + '/check-user');

            const checkUserResponse = await axios.post(`${domain}/check-user`, {
                email: email // Directly send email in the body
            });

            if (checkUserResponse.data.userExists) {
                console.log("User already exists");
            } else {
                // User doesn't exist, create a new user
                console.log("User does not exist. Creating user...");

                const createUserResponse = await axios.post(domain + '/create-user', {
                    email: email,
                    name: name,
                });

                if (createUserResponse.data.user) {
                    console.log("User created successfully!");
                    alert(`Welcome, ${name}!`);
                } else {
                    console.error("Error creating user:", createUserResponse.data.message);
                    alert("There was an error while creating your account.");
                }
            }
        } catch (error) {
            console.error("Error during API request:", error);
            alert("An error occurred. Please try again.");
        }
        dispatch(setUserLoggedIn(true));
        // Close the modal after successful login
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

    const handlePrivacyPolicyOpen = () => {
        setPrivacyPolicyOpen(true);
    };

    const handlePrivacyPolicyClose = () => {
        setPrivacyPolicyOpen(false);
    };

    const handleTermsOfServiceOpen = () => {
        setTermsOfServiceOpen(true);
    };

    const handleTermsOfServiceClose = () => {
        setTermsOfServiceOpen(false);
    };

    const handleAdminLogin = () => {
        if (email === "jeevaamirdhamweb@gmail.com" && password === "JAmirdham@30") {
            alert("Admin login successful!");
            dispatch(setAdminLoggedIn(true));
            navigate("/admin/overview"); // Redirect to admin panel
            dispatch(closeLogin());
            // dispatch(setAdminLoggedIn(false));
        } else {
            alert("Invalid admin credentials");
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={style} className="login-modal">

                    <Box className="login-modal-content">
                        <Box className="login-modal-left">
                            {/* Left side content */}
                        </Box>
                        <Box className="login-modal-right">
                            <IconButton sx={{ color: "#f09300", position: "absolute", top: 16, right: 16 }} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            {showSignIn && (
                                // <Button onClick={handleBack} sx={{ alignSelf: "flex-start", position: "absolute", top: 16, left: 16 }}>Back</Button>
                                <IconButton sx={{ background: "#fff", color: "#f09300", position: "absolute", top: 16, left: 16 }} onClick={handleBack}>
                                    <ArrowBackIcon />
                                </IconButton>
                            )}
                            <img src={navBanner.logo} alt='logo' style={{
                                width: "10rem"

                            }} />
                            <Typography
                                sx={{
                                    color: "#F09300",
                                    textAlign: "center",
                                    fontWeight: 'bold',
                                    lineHeight: 'normal',
                                    margin: '2rem 0',
                                    fontSize: { lg: '2rem', xs: '1.3rem' }
                                }}>
                                Welcome To Jeevaamirdham
                            </Typography>

                            <Box mt={3} className="login-box">
                                {!showSignIn ? (
                                    <>
                                        <GoogleLogin
                                            onSuccess={handleGoogleLoginSuccess}
                                            onError={handleGoogleLoginError}
                                        />

                                        <FacebookLogin
                                            appId="1088597931155576"
                                            autoLoad={false}
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
                                        <Button onClick={handleContinueWithPhoneEmail} disableElevation fullWidth variant="contained" sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                                            Continue with Phone/Email ID
                                        </Button>


                                        <div style={{ fontSize: "12px", textAlign: "center", marginTop: "20px", color: "#999" }}>
                                            By proceeding, you agree to our{" "}
                                            <span style={{ color: "#f09300", cursor: "pointer" }} onClick={handlePrivacyPolicyOpen}>Privacy Policy</span>{" "}
                                            and{" "}
                                            <span style={{ color: "#f09300", cursor: "pointer" }} onClick={handleTermsOfServiceOpen}>Terms of Services</span>.
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {!otpSent && !isEmail ? (
                                            <>
                                                <Typography
                                                    sx={{
                                                        color: "#F09300",
                                                        textAlign: "center",
                                                        fontWeight: 'bold',
                                                        lineHeight: 'normal',
                                                        marginBottom: "0.7rem",
                                                        fontSize: { lg: '1.3rem', xs: '1rem' }
                                                    }}>
                                                    Enter Email or Mobile Number
                                                </Typography>
                                                <TextField
                                                    placeholder="Email or Phone Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
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
                                                    sx={{ mb: 2, margin: '1rem 0' }}
                                                />
                                                <Button onClick={handleNext} disableElevation fullWidth variant="contained" sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                                                    Next
                                                </Button>
                                                <Divider sx={{ margin: "1rem 0" }}><Typography variant="caption" color="#999">Or sign in with</Typography></Divider>
                                                <GoogleLogin
                                                    onSuccess={handleGoogleLoginSuccess}
                                                    onError={handleGoogleLoginError}
                                                />
                                                <FacebookLogin
                                                    // appId="1088597931155576"
                                                    autoLoad={false}
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
                                                <Typography
                                                    sx={{
                                                        color: "#F09300",
                                                        textAlign: "center",
                                                        fontWeight: 'bold',
                                                        lineHeight: 'normal',
                                                        marginBottom: "0.7rem",
                                                        fontSize: { lg: '1.3rem', xs: '1rem' }
                                                    }}>
                                                    Enter your password
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>Please enter password for your registered
                                                    email <strong style={{ color: "#333" }}>{email}</strong> </Typography>
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    sx={{ margin: "1rem 0" }}
                                                />
                                                <Button onClick={handleEmailLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                                                    Sign In
                                                </Button>
                                                <Button onClick={handleAdminLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                                                    Admin Login
                                                </Button>
                                                <Button disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                                                    Forgot Password?
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Typography
                                                    sx={{
                                                        color: "#F09300",
                                                        textAlign: "center",
                                                        fontWeight: 'bold',
                                                        lineHeight: 'normal',
                                                        marginBottom: "0.7rem",
                                                        fontSize: { lg: '1.3rem', xs: '1rem' }
                                                    }}>
                                                    Enter OTP
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                                                    We have sent an OTP to <strong style={{ color: "#333" }}>{mobile}</strong> </Typography>
                                                <TextField
                                                    label="Enter OTP"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    sx={{ mb: 2 }}
                                                />
                                                <Button onClick={handleVerifyOtp} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
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
            <PrivacyPolicyModal open={privacyPolicyOpen} onClose={handlePrivacyPolicyClose} />
            <TermsOfServiceModal open={termsOfServiceOpen} onClose={handleTermsOfServiceClose} />
        </>
    );
};

export default LoginModal;
