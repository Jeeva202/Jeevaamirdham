import React from 'react'
import { Button, Container } from '@mui/material'

export default function Login() {
    return (
        <Container maxWidth="sm">

        <div>
            <div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "6rem", paddingBottom: "2rem" }}>Login</div>
                <label style={{ fontWeight: "600" }}>Username or Email Address</label>
                <input type="text" name="" id="" placeholder="Enter your email address" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "95%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Password</label>
                <input type="password" name="" id="" placeholder="Enter your password" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "95%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br /> 
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    <div style={{ display: "flex" }}>
                        <input type="checkbox" id="Remember" name="Remember" value="Remember" />
                        <label for="Remember">Remember Me</label>
                    </div>

                    <a href=''>Forget Password?</a>

                </div>

                <br />

                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    <Button disableElevation variant="contained" sx={{ borderRadius: "40px", p: "0.8rem", width: "15rem", background: "#F09300", fontWeight: "bold", textTransform: "none", marginTop: "2rem" }}>Log In</Button>
                    <Button disableElevation variant="contained" sx={{ borderRadius: "40px", p: "0.8rem", width: "15rem", background: "#fff", color: "#000", fontWeight: "bold", textTransform: "none", marginTop: "2rem" }}>Log In with OTP</Button>

                </div>
            </div>
        </div>
        </Container>

    )
}
