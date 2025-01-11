import React, { useState, useEffect } from 'react'
import { Button, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function Checkout() {
  // Get totalAmount passed via location
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(0); // Use state to store totalAmount

  useEffect(() => {
    if (location.state && location.state.totalAmount) {
      setTotalAmount(location.state.totalAmount);
    }
  }, [location.state]); 
  console.log(totalAmount);
  
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    company: "",
    country: "",
    state: "",
    street: "",
    city: "",
    zipcode: "",
    phone: "",
    email: "",
    notes: ""
  });

  // Handle input change
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log('Order submitted', userDetails, totalAmount);
    // Add your logic to handle the order placement (e.g., API call)
  };

  return (
    <Container maxWidth="lg">
      <div>
        <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "4rem", paddingBottom: "2rem" }}>
          Checkout
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "5rem" }}>
          {/* Billing Details Section */}
          <div style={{ marginBottom: "3rem", width: "65%" }}>
            <div style={{ fontSize: "1.5rem", textAlign: "left", paddingTop: "2rem", paddingBottom: "2rem" }}>Billing details</div>
            
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              value={userDetails.firstname}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              value={userDetails.lastname}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Company name (Optional)</label>
            <input
              type="text"
              name="company"
              value={userDetails.company}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={userDetails.country}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>State</label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Street address</label>
            <input
              type="text"
              name="street"
              value={userDetails.street}
              onChange={handleInputChange}
              placeholder="House number and street name"
              style={inputStyle}
            />
            <input
              type="text"
              name="street2"
              value={userDetails.street2}
              onChange={handleInputChange}
              placeholder="Apartment, suite, unit, etc (optional)"
              style={inputStyle}
            />
            
            <label>Town/City</label>
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={userDetails.zipcode}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              style={inputStyle}
            />
            
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              style={inputStyle}
            />

            {/* Additional Information */}
            <div style={{ fontSize: "1.5rem", textAlign: "left", paddingTop: "2rem", paddingBottom: "2rem" }}>Additional information</div>
            <div style={{ fontSize: "1rem", textAlign: "left" }}>Order notes (optional)</div>
            <textarea
              name="notes"
              value={userDetails.notes}
              onChange={handleInputChange}
              style={textareaStyle}
              placeholder="Any special notes for delivery"
            />
          </div>

          {/* Order Summary Section */}
          <div style={{ background: "#fff", padding: "1.5rem", border: "1px solid #e6e6e6", borderRadius: "5px", width: "30%" }}>
            <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>Your Order</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Product</p>
              <p>Subtotal</p>
            </div>
            <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Subtotal</p>
              <p>₹ {totalAmount}</p>
            </div>
            <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Total</p>
              <p>₹ {totalAmount}</p>
            </div>
            <br />
            {/* <div>
              <li>Payment method: Razor Pay</li>
            </div>
            <div style={{ marginTop: "2rem", fontSize: "0.8rem" }}>
              Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
            </div> */}
            <div style={{ margin: "1rem 0", fontSize: "0.8rem" }}>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </div>

            <Button
              variant="text"
              sx={{
                borderRadius: "40px",
                width: "100%",
                background: "#F09300",
                color: "White",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "none",
                marginTop: "0.5rem",
                padding: "0.8rem 2rem",
              }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

// Input style for consistency
const inputStyle = {
  borderRadius: "50px",
  padding: "1rem 2rem",
  width: "100%",
  border: "1px solid #E6E6E6",
  marginTop: "1rem"
};

// Textarea style for consistency
const textareaStyle = {
  borderRadius: "50px",
  padding: "1rem 2rem",
  width: "100%",
  border: "1px solid #E6E6E6",
  marginTop: "1rem"
};
