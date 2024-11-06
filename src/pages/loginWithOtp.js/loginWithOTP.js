import { Button, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginWithOTP() {
    const navigate = useNavigate();

    return (
        <div>
            <Container maxWidth="sm">
                <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "left", paddingTop: "6rem", paddingBottom: "2rem" }}>Verify OTP</div>
                <label style={{ fontWeight: "600" }}>Mobile Number</label>
                <input type="tel" name="" id="" placeholder="Enter your phone number" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Verify OTP</label>
                <input type="number" name="" id="" placeholder="Enter OTP" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <div style={{ textAlign: "right", color: "#444" }}>Resend OTP?</div>
                <Button
                    disableElevation
                    variant="contained"
                    sx={{
                        borderRadius: "40px",
                        p: "0.8rem",
                        width: "100%",
                        background: "#F09300",
                        color: "#000",
                        fontWeight: "bold",
                        textTransform: "none",
                        marginTop: "1.5rem"
                    }}>Log In</Button>
                <div style={{ color: "#444", textAlign: "center", padding: "2rem 0" }}>Don't have an account?<a href='' onClick={() => { navigate('/createNewUser') }} style={{ color: "#F09300", fontWeight: "600" }}> Create an account</a></div>
            </Container>

        </div>
    )
}
