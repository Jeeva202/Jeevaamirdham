import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // Google logo icon
import FacebookIcon from "@mui/icons-material/Facebook";
import { GoogleLogin } from "@react-oauth/google"; // Google OAuth
import { jwtDecode } from 'jwt-decode';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const LoginModal = () => {
  const [open, setOpen] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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
    alert(`Welcome, ${decoded.name}!`);
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login Clicked");
    alert("Facebook login is not yet implemented.");
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Email" />
          <Tab label="Mobile" />
        </Tabs>

        {/* Email Login Tab */}
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h6" mt={2}>
              Welcome Back
            </Typography>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleEmailLogin}
            >
              Send Verification Link
            </Button>
          </Box>
        )}

        {/* Mobile Login Tab */}
        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6" mt={2}>
              Verify Mobile
            </Typography>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={otpSent}
            />
            {!otpSent ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Social Login Buttons */}
        <Box mt={3}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />

          <Button
            fullWidth
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
            onClick={handleFacebookLogin}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            Continue with Facebook
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
