import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsUserLoggedIn, setUserLoggedIn, openLogin, selectCartDetails, selectUserId, setCartDetails } from '../../redux/cartSlice';
import LoginModal from '../../pages/login/NewLogin';
import axios from 'axios';
export default function Checkout() {
  // Get totalAmount passed via location
  // const [openModal, setOpenModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
  let userId = useSelector(selectUserId);
  // const isUserLoggedIn = useSelector(selectIsUserLoggedIn)? useSelector(selectIsUserLoggedIn) : localStorage.getItem('username') && localStorage.getItem('email') ? true : false
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(0); // Use state to store totalAmount
  const dispatch = useDispatch();
  const cartDetails = useSelector(selectCartDetails)
  // const handleOpen = () => setOpenModal(true);
  // const handleClose = () => setOpenModal(false);
  const handleLoginOpen = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false)

  useEffect(() => {
    if (location.state && location.state.totalAmount) {
      setTotalAmount(location.state.totalAmount);
    }
  }, [location.state]);

  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    company: '',
    country: '',
    state: '',
    street: '',
    street2: '',
    city: '',
    zipcode: '',
    phone: '',
    email: '',
    notes: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const razorpay_payment = async (totalAmount)=>{
    const userData = {
      name: localStorage.getItem('username') || null,
      email: localStorage.getItem('email') || null,
      id: localStorage.getItem('id') || null
  };

  try {

      // Fetch the price of the selected plan from the backend
      // const response = await fetch(`http://localhost:3001/ebooks/get-book-amount?id=${userData.id}`);
      // const data = await response.json();

      // if (response.ok) {
      //     const amount = data.price;

          const options = {
              key: "rzp_live_tjwWB1t6xxjHG1", // Your Razorpay key
              amount: totalAmount * 100, // Amount in paise
              currency: "INR",
              name: "Jeevaamirdham",
              description: "Subscription Payment",
              handler: async function (response) {
                  console.log("Payment successful:", response);

                  // Prepare payment data to send to the backend
                  const paymentData = {
                      razorpay_payment_id: response.razorpay_payment_id,
                      amount: totalAmount,
                      user_id: userData?.id || null,
                      userDetails:userDetails,
                      cartDetails:cartDetails 
                  };

                  // Send payment data to your backend to store it
                  try {
                      const res = await fetch(process.env.REACT_APP_URL+"/ebooks/payment-success", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify(paymentData),
                      });

                      if (res.ok) {
                          const data = await res.json();
                          console.log("Payment data saved successfully:", data);
                          alert("Payment successful and subscription activated!");
                      } else {
                          console.error("Failed to update backend");
                          alert("Payment was successful but could not update subscription. Please contact support.");
                      }
                  } catch (error) {
                      console.error("Error while updating backend:", error);
                      alert("An error occurred. Please contact support.");
                  }
              },
              prefill: {
                  name: userData?.name || "",
                  email: userData?.email || "",
                  contact: userData?.contact || "",
                  id: userData?.id || "",
              },
              theme: {
                  color: "#7C3AED",
              },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
      // } else {
      //     console.error('Error fetching plan price');
      //     alert('Error fetching plan price');
      // }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching plan details');
  }
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      'firstname',
      'lastname',
      'country',
      'state',
      'street',
      'city',
      'zipcode',
      'phone',
      'email',
    ];

    const missingFields = requiredFields.filter((field) => !userDetails[field]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }
    if(cartDetails == []){
      if (!userId) {
        userId = localStorage.getItem("id");
      }
      try {
        const response = await axios.get(`http://localhost:3001/ebooks/get_cart?id=${userId}`);
        const cartData = response.data.cart_details; // Assuming cart_details is the array of books in the cart
  
        setCartDetails(cartData)
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    console.log("cart", cartDetails);
    
    // If all required fields are filled, proceed with the order submission
      if(isUserLoggedIn){
        razorpay_payment(totalAmount)
      }
      else{
        dispatch(openLogin())
      }
    // console.log('Order submitted', userDetails, totalAmount);
    // Add your logic to handle the order placement (e.g., API call)
  };

  return (
    <Container maxWidth="lg">
      <div>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: '4rem',
            paddingBottom: '2rem',
          }}
        >
          Checkout
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '5rem',
          }}
        >
          {/* Billing Details Section */}
          <div style={{ marginBottom: '3rem', width: '65%' }}>
            <div
              style={{
                fontSize: '1.5rem',
                textAlign: 'left',
                paddingTop: '2rem',
                paddingBottom: '2rem',
              }}
            >
              Billing details
            </div>

            <label>Firstname <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="firstname"
              value={userDetails.firstname}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Lastname <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="lastname"
              value={userDetails.lastname}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Company name (Optional)</label>
            <input
              type="text"
              name="company"
              value={userDetails.company}
              onChange={handleInputChange}
              style={inputStyle}
            />

            <label>Country <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="country"
              value={userDetails.country}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>State <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Street address <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="street"
              value={userDetails.street}
              onChange={handleInputChange}
              placeholder="House number and street name"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="street2"
              value={userDetails.street2}
              onChange={handleInputChange}
              placeholder="Apartment, suite, unit, etc (optional)"
              style={inputStyle}
            />

            <label>Town/City <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Zipcode <span style={requiredStyle}>*</span></label>
            <input
              type="text"
              name="zipcode"
              value={userDetails.zipcode}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Phone <span style={requiredStyle}>*</span></label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            <label>Email <span style={requiredStyle}>*</span></label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />

            {/* Additional Information */}
            <div
              style={{
                fontSize: '1.5rem',
                textAlign: 'left',
                paddingTop: '2rem',
                paddingBottom: '2rem',
              }}
            >
              Additional information
            </div>
            <div style={{ fontSize: '1rem', textAlign: 'left' }}>
              Order notes (optional)
            </div>
            <textarea
              name="notes"
              value={userDetails.notes}
              onChange={handleInputChange}
              style={textareaStyle}
              placeholder="Any special notes for delivery"
            />
          </div>

          {/* Order Summary Section */}
          <div
            style={{
              background: '#fff',
              padding: '1.5rem',
              border: '1px solid #e6e6e6',
              borderRadius: '5px',
              width: '30%',
            }}
          >
            <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>Your Order</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Product</p>
              <p>Subtotal</p>
            </div>
            <hr color="#d5d5d5" style={{ margin: '0.8rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Subtotal</p>
              <p>₹ {totalAmount}</p>
            </div>
            <hr color="#d5d5d5" style={{ margin: '0.8rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Total</p>
              <p>₹ {totalAmount}</p>
            </div>
            <br />
            <div style={{ margin: '1rem 0', fontSize: '0.8rem' }}>
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </div>

            <Button
              variant="text"
              sx={{
                borderRadius: '40px',
                width: '100%',
                background: '#F09300',
                color: 'White',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                textTransform: 'none',
                marginTop: '0.5rem',
                padding: '0.8rem 2rem',
              }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </div>
        </div>
        <LoginModal open={showLoginModal} onClose={handleLoginClose} />
      </div>
    </Container>
  );
}

// Input style for consistency
const inputStyle = {
  borderRadius: '50px',
  padding: '1rem 2rem',
  width: '100%',
  border: '1px solid #E6E6E6',
  marginTop: '1rem',
};

// Textarea style for consistency
const textareaStyle = {
  borderRadius: '50px',
  padding: '1rem 2rem',
  width: '100%',
  border: '1px solid #E6E6E6',
  marginTop: '1rem',
};

// Style for the red asterisk (*) for required fields
const requiredStyle = {
  color: 'red',
  marginLeft: '4px',
};
