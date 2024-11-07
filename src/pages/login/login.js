import React from 'react'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    return (

        <div >
            <Container maxWidth="sm">

                <div>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "left", paddingTop: "6rem", paddingBottom: "2rem" }}>Login</div>
                    <label style={{ fontWeight: "600" }}>Username or Email Address</label>
                    <input type="text" name="" id="" placeholder="Enter your email address" style={{
                        borderRadius: "50px",
                        padding: "1rem 2rem",
                        width: "89%",
                        border: "none",
                        marginTop: "1rem"
                    }} />
                    <br />
                    <br />
                    <label style={{ fontWeight: "600" }}>Password</label>
                    <input type="password" name="" id="" placeholder="Enter your password" style={{
                        borderRadius: "50px",
                        padding: "1rem 2rem",
                        width: "89%",
                        border: "none",
                        marginTop: "1rem"
                    }} />
                    <br />
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex" }}>
                            <input type="checkbox" id="Remember" name="Remember" value="Remember" />
                            <label for="Remember">Remember Me</label>
                        </div>
                        <a href=''>Forget Password?</a>
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
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
                                marginTop: "2rem"
                            }}>Log In</Button>

                        <Button
                            disableElevation
                            variant="contained"
                            sx={{
                                borderRadius: "40px",
                                p: "0.8rem",
                                width: "100%",
                                background: "#fff",
                                color: "#000",
                                fontWeight: "bold",
                                textTransform: "none",
                                marginTop: "2rem"
                            }}
                            onClick={() => { navigate('/login/loginWithOtp') }}>Log In with OTP</Button>
                    </div>
                    <div style={{ color: "#444", textAlign: "center", padding: "2rem 0" }}>Don't have an account?<a href='' onClick={() => { navigate('/createNewUser') }} style={{ color: "#F09300", fontWeight: "600" }}> Create an account</a></div>
                </div>
            </Container>
        </div>
    )
}
