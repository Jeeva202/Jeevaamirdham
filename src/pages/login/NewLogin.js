import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    IconButton,
    Snackbar,
    Alert,
    Typography,
    Divider,
    Button,
    TextField,
    CircularProgress
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivacyPolicyModal from './PrivacyPolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';
import { openLogin, selectIsLoginOpen, closeLogin, setUserLoggedIn, setUserId, setAdminLoggedIn } from "../../redux/cartSlice";
import { navBanner } from '../../constants/screenData';
import './NewLogin.css';

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

const domain = process.env.REACT_APP_URL + '';

const LoginModal = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
    const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
    const isOpen = useSelector(selectIsLoginOpen);
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
        setConfirmPassword("");
        setOtpSent(false);
        setShowSignIn(false);
        setIsEmail(false);
        setIsNewUser(false);
        setLoading(false);
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);
        let { name, email } = decoded;
        localStorage.setItem('username', decoded.name);
        localStorage.setItem('email', decoded.email);
        window.dispatchEvent(new Event('storage'));
        setSnackbarMessage(`Welcome, ${decoded.name}!`);
        setSnackbarOpen(true);
        dispatch(closeLogin());
        try {
            const checkUserResponse = await axios.post(`${domain}/check-user`, { email });
            if (checkUserResponse.data.userExists) {
                dispatch(setUserId(checkUserResponse.data.id));
                localStorage.setItem("id", checkUserResponse.data.id);
            } else {
                const createUserResponse = await axios.post(domain + '/create-user', { email, name });
                if (createUserResponse.data.user) {
                    dispatch(setUserId(createUserResponse.data.user.id));
                    localStorage.setItem('id', createUserResponse.data.user.id);
                    alert(`Welcome, ${name}!`);
                } else {
                    alert("There was an error while creating your account.");
                }
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
        dispatch(setUserLoggedIn(true));
    };

    const handleGoogleLoginError = () => {
        alert("Google login failed. Please try again.");
    };

    const handleFacebookLogin = () => {
        alert("Facebook login is not yet implemented.");
    };

    const responseFacebook = (response) => {
        console.log(response);
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
            navigate("/admin/overview");
            dispatch(closeLogin());
        } else {
            alert("Invalid admin credentials");
        }
    };

    const handleSendOtp = async () => {

        setLoading(true);

        try {
            const response = await axios.post(`${domain}/login/send-otp`, { email });
            console.log("send otp",response, email);
            if (response.data.success) {
                setOtpSent(true);
                setSnackbarMessage("OTP sent to your email.");
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Failed to send OTP. Please try again.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/verify-otp`, { email, otp });
            if (response.data.success) {
                setSnackbarMessage("OTP verified successfully.");
                setSnackbarOpen(true);
                setIsEmail(true);
            } else {
                setSnackbarMessage("Invalid OTP. Please try again.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleCreatePassword = async () => {
        if (password !== confirmPassword) {
            setSnackbarMessage("Passwords do not match. Please try again.");
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/create-password`, { email, password });
            if (response.data.success) {
                setSnackbarMessage("Password created successfully.");
                setSnackbarOpen(true);
                dispatch(closeLogin());
            } else {
                setSnackbarMessage("Failed to create password. Please try again.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleEmailLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/login`, { email, password });
            if (response.data.success) {
                setSnackbarMessage("Login successful.");
                setSnackbarOpen(true);
                dispatch(setUserId(response.data.userId));
                localStorage.setItem("id", response.data.userId);
                dispatch(setUserLoggedIn(true));
                dispatch(closeLogin());
            } else {
                setSnackbarMessage("Invalid email or password. Please try again.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/forgot-password`, { email });
            if (response.data.success) {
                setSnackbarMessage("Password reset link sent to your email.");
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Failed to send reset link. Please try again.");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleNext = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/find-user`, { email });
            console.log("check user",response.data);
            if (response.data.userExists) {
                if (response.data.hasPassword) {
                    setIsEmail(true);
                } else {
                    setIsNewUser(true);
                    handleSendOtp();
                }
            } else {
                setIsNewUser(true);
                handleSendOtp();
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
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
                                <IconButton sx={{ background: "#fff", color: "#f09300", position: "absolute", top: 16, left: 16 }} onClick={() => setShowSignIn(false)}>
                                    <ArrowBackIcon />
                                </IconButton>
                            )}
                            <img src={navBanner.logo} alt='logo' style={{ width: "10rem" }} />
                            <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', margin: '2rem 0', fontSize: { lg: '2rem', xs: '1.3rem' } }}>
                                Welcome To Jeevaamirdham
                            </Typography>
                            <Box mt={3} className="login-box">
                                {!showSignIn ? (
                                    <LoginOptions
                                        setShowSignIn={setShowSignIn}
                                        handleGoogleLoginSuccess={handleGoogleLoginSuccess}
                                        handleGoogleLoginError={handleGoogleLoginError}
                                        handleFacebookLogin={handleFacebookLogin}
                                        responseFacebook={responseFacebook}
                                        handlePrivacyPolicyOpen={handlePrivacyPolicyOpen}
                                        handleTermsOfServiceOpen={handleTermsOfServiceOpen}
                                    />
                                ) : (
                                    <SignInForm
                                        email={email}
                                        setEmail={setEmail}
                                        mobile={mobile}
                                        setMobile={setMobile}
                                        otp={otp}
                                        setOtp={setOtp}
                                        password={password}
                                        setPassword={setPassword}
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}
                                        otpSent={otpSent}
                                        setOtpSent={setOtpSent}
                                        isEmail={isEmail}
                                        setIsEmail={setIsEmail}
                                        isNewUser={isNewUser}
                                        setIsNewUser={setIsNewUser}
                                        handleNext={handleNext}
                                        handleSendOtp={handleSendOtp}
                                        handleVerifyOtp={handleVerifyOtp}
                                        handleCreatePassword={handleCreatePassword}
                                        handleEmailLogin={handleEmailLogin}
                                        handleForgotPassword={handleForgotPassword}
                                        handleAdminLogin={handleAdminLogin}
                                        loading={loading}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <PrivacyPolicyModal open={privacyPolicyOpen} onClose={handlePrivacyPolicyClose} />
            <TermsOfServiceModal open={termsOfServiceOpen} onClose={handleTermsOfServiceClose} />
        </>
    );
};

const LoginOptions = ({ setShowSignIn, handleGoogleLoginSuccess, handleGoogleLoginError, handleFacebookLogin, responseFacebook, handlePrivacyPolicyOpen, handleTermsOfServiceOpen }) => (
    <>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
        <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            fields="name,email,picture"
            render={renderProps => (
                <Box onClick={renderProps.onClick} sx={{ p: 1, margin: "1rem 0", display: "flex", alignItems: "center", border: "1px solid #dadce0", borderRadius: "4px", cursor: "pointer" }}>
                    <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Typography sx={{ fontSize: "14px", color: "#3c4043" }}>Sign in with Facebook</Typography>
                    </Box>
                </Box>
            )}
            callback={responseFacebook}
        />
        <Divider sx={{ margin: "1rem 0" }}><Typography variant="caption" color="#999">Or sign in with</Typography></Divider>
        <Button onClick={() => setShowSignIn(true)} disableElevation fullWidth variant="contained" sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
            Continue with Email ID
        </Button>
        <div style={{ fontSize: "12px", textAlign: "center", marginTop: "20px", color: "#999" }}>
            By proceeding, you agree to our{" "}
            <span style={{ color: "#f09300", cursor: "pointer" }} onClick={handlePrivacyPolicyOpen}>Privacy Policy</span>{" "}
            and{" "}
            <span style={{ color: "#f09300", cursor: "pointer" }} onClick={handleTermsOfServiceOpen}>Terms of Services</span>.
        </div>
    </>
);

const SignInForm = ({
    email, setEmail, mobile, setMobile, otp, setOtp, password, setPassword, confirmPassword, setConfirmPassword,
    otpSent, setOtpSent, isEmail, setIsEmail, isNewUser, setIsNewUser, handleNext, handleSendOtp, handleVerifyOtp,
    handleCreatePassword, handleEmailLogin, handleForgotPassword, handleAdminLogin, loading
}) => {
    return (
        <>
            {!otpSent && !isEmail ? (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter Email
                    </Typography>
                    <TextField
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2, margin: '1rem 0' }}
                    />
                    <Button onClick={handleNext} disableElevation fullWidth variant="contained" sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Next'}
                    </Button>
                </>
            ) : isEmail ? (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter your password
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                        Please enter password for your registered email <strong style={{ color: "#333" }}>{email}</strong>
                    </Typography>
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
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                    </Button>
                    <Button onClick={handleAdminLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                        Admin Login
                    </Button>
                    <Button onClick={handleForgotPassword} disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                        Forgot Password?
                    </Button>
                </>
            ) : (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter OTP
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                        We have sent an OTP to <strong style={{ color: "#333" }}>{mobile}</strong>
                    </Typography>
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
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify OTP'}
                    </Button>
                    <Button disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                        Resend OTP
                    </Button>
                </>
            )}
        </>
    );
};

export default LoginModal;
