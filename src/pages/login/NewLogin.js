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
import { openLogin, selectIsLoginOpen, closeLogin, setUserLoggedIn, setUserId, setAdminLoggedIn, setLoginOtp, clearLoginOtp, selectLoginOtp, selectLoginExpiry } from "../../redux/cartSlice";
import { navBanner } from '../../constants/screenData';
import './NewLogin.css';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showContEmail, setShowContEmail] = useState(true);
    const [showExstingUser, setShowExstingUser] = useState(false);
    const [showCreatePasswd, setShowCreatePasswd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
    const [termsOfServiceOpen, setTermsOfServiceOpen] = useState(false);
    const isOpen = useSelector(selectIsLoginOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginOtpExpiry = useSelector(selectLoginExpiry)
    const loginOtp = useSelector(selectLoginOtp)


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
        setUsername("");
        setMobile("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        setShowOtpScreen(false);
        setShowSignIn(false);
        setShowContEmail(true);
        setShowCreatePasswd(false);
        setShowExstingUser(false);
        setLoading(false);
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };
    const handleBack = () => {
        resetState();
    }

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
        dispatch(clearLoginOtp());
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        console.log(otp, expiry);
        // Store OTP in Redux
        dispatch(setLoginOtp({ otp, expiry }));
        console.log('New OTP sent successfully!', loginOtp);
        // Simulate sending OTP via email
        try {
            await axios.post(`${domain}/login/send-otpToEmail`, { email: email.toLowerCase(), otp });
            setSnackbarMessage('OTP has been sent successfully');
            setSnackbarOpen(true);
            console.log('OTP sent successfully!');
            setShowOtpScreen(true);
        } catch (error) {
            console.error('Failed to send OTP:', error);
            setSnackbarMessage('Failed to send OTP');
            setSnackbarOpen(true);

        }
    };
    console.log('check otp!', loginOtp);

    const handleVerifyOtp = () => {
        console.log("Verify OTP!", otp, loginOtp, loginOtpExpiry);
        const storedOtp = loginOtp
        console.log('verify otppp!', storedOtp)
        const expiry = loginOtpExpiry;
        // Validate OTP and expiry
        if (!storedOtp || !expiry) {
            console.log("OTP or expiry not set.");
            setSnackbarMessage("OTP not set. Please request a new OTP.");
            setSnackbarOpen(true);
            dispatch(clearLoginOtp());
            return;
        }
        // Check if the OTP is expired
        const currentTime = Date.now();
        if (currentTime > expiry) {
            console.log("OTP expired.");
            setSnackbarMessage("OTP expired. Please request a new OTP.");
            setSnackbarOpen(true);
            dispatch(clearLoginOtp());
            return;
        }
        // Compare the input OTP with the stored OTP
        if (otp === storedOtp) {
            console.log("OTP verified successfully!");
            setSnackbarMessage("OTP verified successfully.");
            setSnackbarOpen(true);
            dispatch(clearLoginOtp()); // Clear OTP from Redux after successful verification
            setShowOtpScreen(false); // Hide OTP screen
            setShowCreatePasswd(true); // Show create password fields after OTP is verified
        } else {
            console.log("Invalid OTP.");
            setSnackbarMessage("Invalid OTP. Please try again.");
            setSnackbarOpen(true);
        }
    };

    const handleCreatePassword = async () => {
        if (password !== confirmPassword) {
            setSnackbarMessage("Passwords do not match. Please try again.");
            setSnackbarOpen(true);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${domain}/login/create-password`, { email, password, username });
            if (response.data.success) {
                console.log("User created successfully")
                setSnackbarMessage(`Welcome ${username}.`);
                setSnackbarOpen(true);
                localStorage.setItem("id", response.data.userId);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                window.dispatchEvent(new Event('storage'));
                dispatch(setUserLoggedIn(true));
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
                console.log("User logged in successfully")
                setSnackbarMessage("Login successful.");
                setSnackbarMessage("User logged in")
                setSnackbarOpen(true);
                console.log("Snackbar Open:", snackbarOpen, "Message:", snackbarMessage);
                dispatch(setUserId(response.data.userId));
                localStorage.setItem("id", response.data.userId);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                window.dispatchEvent(new Event('storage'));
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
            setShowExstingUser(false);
            setShowOtpScreen(true);
            handleSendOtp();
            // const response = await axios.post(`${domain}/login/forgot-password`, { email });
            // if (response.data.success) {
            //     setSnackbarMessage("Password reset link sent to your email.");
            //     setSnackbarOpen(true);
            // } else {
            //     setSnackbarMessage("Failed to send reset link. Please try again.");
            //     setSnackbarOpen(true);
            // }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const handleNext = async () => {
        setLoading(true); // Show loading spinner
        try {
            // Check if the user exists
            const response = await axios.post(`${domain}/login/find-user`, { email, username });
            const { isExistingUser, isPasswordAvailable } = response.data;
            console.log("finduser", response.data);
            if (isExistingUser) {
                if (isPasswordAvailable) {
                    // If the user exists and has a password, go to password login
                    setShowContEmail(false);
                    setShowExstingUser(true);
                } else {
                    // User exists but no password; send OTP and prompt to set a password
                    await handleSendOtp();
                    setShowContEmail(false);
                    setShowOtpScreen(true);
                }
            } else {
                // New user; send OTP and prompt to create a new account
                await handleSendOtp();
                setShowContEmail(false);
                setShowOtpScreen(true);
            }
        } catch (error) {
            console.error("Error during user check:", error);
            setSnackbarMessage("An error occurred. Please try again.");
            setSnackbarOpen(true);
        }
        setLoading(false); // Hide loading spinner
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
                                <IconButton sx={{ background: "#fff", color: "#f09300", position: "absolute", top: 16, left: 16 }} onClick={handleBack}>
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
                                        username={username}
                                        setUsername={setUsername}
                                        mobile={mobile}
                                        setMobile={setMobile}
                                        otp={otp}
                                        setOtp={setOtp}
                                        password={password}
                                        setPassword={setPassword}
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}
                                        showOtpScreen={showOtpScreen}
                                        setShowOtpScreen={setShowOtpScreen}
                                        showContEmail={showContEmail}
                                        setShowContEmail={setShowContEmail}
                                        showExstingUser={showExstingUser}
                                        setShowExstingUser={setShowExstingUser}
                                        showCreatePasswd={showCreatePasswd}
                                        setShowCreatePasswd={setShowCreatePasswd}
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
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
    email, setEmail, username, setUsername, mobile, setMobile, otp, setOtp, password, setPassword, confirmPassword, setConfirmPassword,
    showOtpScreen, setShowOtpScreen, showContEmail, setShowContEmail, showExstingUser, setShowExstingUser, handleNext, handleSendOtp, handleVerifyOtp,
    handleCreatePassword, handleEmailLogin, handleForgotPassword, handleAdminLogin, loading, showCreatePasswd, setShowCreatePasswd
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isNextButtonDisabled = !username || !email;

    return (
        <>
            {showContEmail && !showExstingUser && !showOtpScreen && !showCreatePasswd && (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter Email
                    </Typography>
                    <TextField
                        placeholder="Username"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2, margin: '1rem 0' }}
                    />
                    <TextField
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2, marginBottom: '1rem' }}
                    />
                    <Button
                        onClick={handleNext}
                        disableElevation
                        fullWidth
                        variant="contained"
                        sx={{ color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}
                        disabled={isNextButtonDisabled}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Next'}
                    </Button>
                </>
            )}
            {showExstingUser && (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter your password
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                        Please enter password for your registered email <strong style={{ color: "#333" }}>{email}</strong>
                    </Typography>
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>setShowPassword(!showPassword)}
                                            // onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ margin: "1rem 0" }}
                    />
                    <Button onClick={handleForgotPassword} disableElevation fullWidth variant="text" sx={{ color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                        Forgot Password?
                    </Button>
                    <Button onClick={handleEmailLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                    </Button>
                    <Button onClick={handleAdminLogin} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                        Admin Login
                    </Button>

                </>
            )}
            {showOtpScreen && (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Enter OTP
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#999", margin: "1rem 0", textAlign: "center" }}>
                        We have sent an OTP to <strong style={{ color: "#333" }}>{email}</strong>
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
                    <Button onClick={handleSendOtp} disableElevation fullWidth variant="text" sx={{ marginTop: "1rem", color: "#f09300", textTransform: 'none', fontWeight: "bold", borderRadius: "30px", padding: "0.7rem 3rem" }}>
                        Resend OTP
                    </Button>
                </>
            )}
            {showCreatePasswd && (
                <>
                    <Typography sx={{ color: "#F09300", textAlign: "center", fontWeight: 'bold', lineHeight: 'normal', marginBottom: "0.7rem", fontSize: { lg: '1.3rem', xs: '1rem' } }}>
                        Create Password
                    </Typography>
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={password}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>setShowPassword(!showPassword)}
                                            // onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ margin: "1rem 0" }}
                    />
                    <TextField
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={confirmPassword}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                            // onMouseDown={handleMouseDownPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    />
                    <Button onClick={handleCreatePassword} disableElevation fullWidth variant="contained" sx={{ marginTop: "1rem", color: "white", textTransform: 'none', background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: { lg: "0.7rem 3rem", md: "0.5rem 2rem", xs: "0.3rem 0rem" } }}>
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Password'}
                    </Button>
                </>
            )}
        </>
    );
};

export default LoginModal;
