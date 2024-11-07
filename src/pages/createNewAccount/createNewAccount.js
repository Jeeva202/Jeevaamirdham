import { Button, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateNewAccount() {
    const navigate = useNavigate();
    return (
        <div>
            <Container maxWidth="sm">
                <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "left", paddingTop: "6rem", paddingBottom: "2rem" }}>Register</div>
                <label style={{ fontWeight: "600" }}>First Name</label>
                <input type="text" name="" id="" placeholder="Enter your first name" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Last Name</label>
                <input type="text" name="" id="" placeholder="Enter your last name" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Email</label>
                <input type="email" name="" id="" placeholder="Enter your email" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Password</label>
                <input type="password" name="" id="" placeholder="Enter your Password" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Confirm Password</label>
                <input type="password" name="" id="" placeholder="Confirm Password" style={{
                    borderRadius: "50px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} />
                <br />
                <br />
                <label style={{ fontWeight: "600" }}>Address</label>
                <textarea style={{
                    resize: "none",
                    borderRadius: "30px",
                    padding: "1rem 2rem",
                    width: "89%",
                    border: "none",
                    marginTop: "1rem"
                }} id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter your address'>
                </textarea>
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
                    }}>Register Now</Button>
                <div style={{ color: "#444", textAlign: "center", padding: "2rem 0" }}>Already have an account?<a href='' onClick={() => { navigate('/login') }} style={{ color: "#F09300", fontWeight: "600" }}> Login</a></div>

            </Container>
        </div>
    )
}
