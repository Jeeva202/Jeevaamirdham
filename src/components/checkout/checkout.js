import { Button, Container } from '@mui/material'
import React from 'react'

export default function Checkout() {
    return (
        <Container maxWidth="lg">
            <div>
                <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "4rem", paddingBottom: "2rem" }}>Checkout</div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ marginBottom: "3rem" }}>
                        <div style={{ fontSize: "1.5rem", textAlign: "left", paddingTop: "2rem", paddingBottom: "2rem" }}>Billing details</div>
                                <label>Firstname</label>
                                <input type="text" name="" id="" style={{
                                    borderRadius: "50px",
                                    padding: "1rem 2rem",
                                    width: "100%",
                                    border: "1px solid #E6E6E6",
                                    marginTop: "1rem"
                                }} />
                                <label>Lastname</label>
                                <input type="text" name="" id="" style={{
                                    borderRadius: "50px",
                                    padding: "1rem 2rem",
                                    width: "100%",
                                    border: "1px solid #E6E6E6",
                                    marginTop: "1rem"
                                }} />
                        <br />
                        <br />
                        <label style={{ marginTop: "1rem" }}>Company name (Optional)</label>
                        <input type="text" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Country</label>
                        <input type="text" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>State</label>
                        <input type="text" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Street address</label>
                        <input type="text" name="" id="" placeholder="House number and street name" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <input type="text" name="" id="" placeholder="Apartment, suite, unit, etc (optional)" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Town/City</label>
                        <input type="text" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Zipcode</label>
                        <input type="text" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Phone</label>
                        <input type="tel" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <br />
                        <br />
                        <label>Email</label>
                        <input type="email" name="" id="" style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} />
                        <div style={{ fontSize: "1.5rem", textAlign: "left", paddingTop: "2rem", paddingBottom: "2rem" }}>Additional information</div>
                        <div style={{ fontSize: "1rem", textAlign: "left" }}>Order notes (optional)</div>
                        <textarea style={{
                            borderRadius: "50px",
                            padding: "1rem 2rem",
                            width: "100%",
                            border: "1px solid #E6E6E6",
                            marginTop: "1rem"
                        }} placeholder='Any special notes for delivery' />

                    </div>








                    {/* ======================================= */}
                    <div style={{ background: "#fff", padding: "1.5rem", border: "1px solid #e6e6e6", borderRadius: "5px", width: "30%" }}>
                        <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>Your Order</p>
                        <div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Product</p>
                            <p>Subtotal</p>
                        </div>
                        <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Subtotal</p>
                            <p>₹ 500</p>
                        </div>
                        <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Total</p>
                            <p>₹ 500</p>
                        </div>
                        <br />
                        <div>
                            <li>Payment method: Razor Pay</li>
                        </div>
                        <div style={{marginTop:"2rem", fontSize:"0.8rem"}}>
                        Make your payment directly into our bank account. Please use your
Order ID as the payment reference. Your order will not be shipped until
the funds have cleared in our account.
                        </div>
                        <div style={{margin:"1rem 0", fontSize:"0.8rem"}}>
                        Your personal data will be used to process your order, support your
experience throughout this website, and for other purposes
described in our privacy policy
                        </div>

                        <Button variant="text" sx={{
                            borderRadius: "40px",
                            width: "100%",
                            background: "#F09300",
                            color: "White",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            textTransform: "none",
                            marginTop: "0.5rem",
                            padding: "0.8rem 2rem",
                        }}>
                            Place Order
                        </Button>
                    </div>

                </div>

            </div>
        </Container>

    )
}
