import React, { useState, useEffect } from 'react';
import { 
    Box, Button, Container, Typography, TextField, Grid, 
    Divider, Paper 
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { selectIsUserLoggedIn, setUserLoggedIn, openLogin, selectBooksData, selectCartDetails, selectUserId, setCartDetails } from '../../redux/cartSlice';
import LoginModal from '../../pages/login/NewLogin';
import axios from 'axios';
import { showSnackbar } from '../../redux/SnackBarSlice';

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
  const navigate = useNavigate();
  const cartDetails = useSelector(selectCartDetails)
  let booksDataFromStore = useSelector(selectBooksData)
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const razorpay_payment = async (totalAmount) => {
    const userData = {
      name: localStorage.getItem('username') || null,
      email: localStorage.getItem('email') || null,
      id: localStorage.getItem('id') || null
    };

    try {

      // Fetch the price of the selected plan from the backend
      // const response = await fetch(process.env.REACT_APP_URL + `/ebooks/get-book-amount?id=${userData.id}`);
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
            userDetails: userDetails,
            cartDetails: cartDetails
          };

          // Send payment data to your backend to store it
          try {
            const res = await fetch(process.env.REACT_APP_URL + "/ebooks/payment-success", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentData),
            });

            if (res.ok) {
              const data = await res.json();
              const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/get_cart?id=${userId}`);
              const cartData = response.data.cart_details;
              setCartDetails(cartData)
              console.log("Payment data saved successfully:", cartData);
              // alert("Payment successful.");
              dispatch(showSnackbar({ message: "Payment successful.", severity: "success" }));

              // window.location.reload();
              navigate('/dashboard?tab=2');
              dispatch(setCartDetails(cartData));


            } else {
              console.error("Failed to update backend");
              // alert("Payment was successful but could not update subscription. Please contact support.");
              dispatch(showSnackbar({ message: "Payment was successful but could not update subscription. Please contact support.", severity: "error" }));

            }
          } catch (error) {
            console.error("Error while updating backend:", error);
            // alert("An error occurred. Please contact support.");
            dispatch(showSnackbar({ message: "An error occurred. Please contact support.", severity: "error" }));

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
      // alert('An error occurred while fetching plan details');
      dispatch(showSnackbar({ message: "An error occurred while fetching plan details", severity: "error" }));

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
      // alert('Please fill in all required fields.');
      dispatch(showSnackbar({ message: "Please fill in all required fields.", severity: "warning" }));
      return;
    }
    if (cartDetails == []) {
      if (!userId) {
        userId = localStorage.getItem("id");
      }
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/get_cart?id=${userId}`);
        const cartData = response.data.cart_details; // Assuming cart_details is the array of books in the cart

        dispatch(setCartDetails(cartData))
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    console.log("cart", cartDetails);

    // If all required fields are filled, proceed with the order submission
    if (isUserLoggedIn) {
      razorpay_payment(totalAmount)
    }
    else {
      dispatch(openLogin())
    }
    // console.log('Order submitted', userDetails, totalAmount);
    // Add your logic to handle the order placement (e.g., API call)
  };

  const fetchBookDetails = async (cartData) => {
    try {
      const bookIds = cartData.map(item => item.book_id);
      const bookDetails = await Promise.all(bookIds.map(async (bookId) => {
        const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/book-info?id=${bookId}`);
        return response.data;
      }));

      const updatedRows = cartData.map((item) => {
        const book = bookDetails.find(book => book.id === item.book_id);
        return {
          name: book ? book.title : 'Unknown Title',
          price: book ? parseFloat(book.offPrice) : 0,
          quantity: item.quantity,
          subtotal: (book ? parseFloat(book.offPrice) : 0) * item.quantity,
          id: item.book_id,
        };
      });
      setRows(updatedRows);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (isUserLoggedIn) {
          const response = await axios.get(process.env.REACT_APP_URL + `/ebooks/get_cart?id=${userId}`);
          const cartData = response.data.cart_details;
          await fetchBookDetails(cartData);
        } else {
          const cartFromStore = cartDetails.map(item => {
            const book = booksDataFromStore.find(b => b.id === item.book_id);
            return {
              id: book.id,
              name: book.title,
              price: parseFloat(book.offPrice),
              quantity: item.quantity,
              subtotal: parseFloat(book.offPrice) * item.quantity
            };
          });
          setRows(cartFromStore);
        }
      } catch (err) {
        setError("Failed to load cart items. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [isUserLoggedIn, userId]);

  return (
    <Container maxWidth="lg">
        <Typography variant="h4" sx={{ textAlign: 'center', py: 4, fontWeight: 'bold' }}>
            Checkout
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, marginBottom: 4, flexDirection:{xs: 'column', md:'column', lg:"row"}}}>
            {/* Billing Details Section */}
            <Paper sx={{ flex: 2, p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Billing details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First name"
                            name="firstname"
                            value={userDetails.firstname}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last name"
                            name="lastname"
                            value={userDetails.lastname}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company name (optional)"
                            name="company"
                            value={userDetails.company}
                            onChange={handleInputChange}
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            value={userDetails.country}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={userDetails.state}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Street address"
                            name="street"
                            value={userDetails.street}
                            onChange={handleInputChange}
                            required
                            placeholder="House number and street name"
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Apartment, suite, etc. (optional)"
                            name="street2"
                            value={userDetails.street2}
                            onChange={handleInputChange}
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Town/City"
                            name="city"
                            value={userDetails.city}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Zipcode/Pincode"
                            name="zipcode"
                            value={userDetails.zipcode}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={userDetails.phone}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                            required
                            size="small"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                            Additional information
                        </Typography>
                        <TextField
                            fullWidth
                            label="Order notes (optional)"
                            name="notes"
                            value={userDetails.notes}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            placeholder="Notes about your order, e.g. special delivery instructions"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Order Summary Section */}
            <Paper sx={{ flex: 1, p: 3, borderRadius: 2, alignSelf: 'flex-start' }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Your Order
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                    <Grid container sx={{ fontWeight: 600, mb: 1 }}>
                        <Grid item xs={6}>Product</Grid>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>Price</Grid>
                    </Grid>
                    <Divider />
                    
                    {rows.map((row, index) => (
                        <Box key={index} sx={{ my: 2 }}>
                            <Grid container sx={{ mb: 0.5 }}>
                                <Grid item xs={8}>
                                    <Typography variant="body2">
                                        {row.name} × {row.quantity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" fontWeight={600}>
                                        ₹{row.subtotal.toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="caption" color="text.secondary" display="block" textAlign="right">
                                Each ₹{row.price}
                            </Typography>
                        </Box>
                    ))}
                    
                    <Divider />
                    <Grid container sx={{ my: 2 }}>
                        <Grid item xs={6}>Subtotal</Grid>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>₹{totalAmount}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ my: 2, fontWeight: 600 }}>
                        <Grid item xs={6}>Total</Grid>
                        <Grid item xs={6} sx={{ textAlign: 'right' }}>₹{totalAmount}</Grid>
                    </Grid>
                </Box>

                <Typography variant="caption" display="block" sx={{ my: 2 }}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      borderRadius: "8px",
                      width: "100%",
                      background: "#F09300",
                      color: "White",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      textTransform: "none",
                      marginTop: "1rem",
                      padding: "0.8rem",
                      '&:hover': {
                        background: "#d67e00"
                      }
                    }}
                >
                    Place Order
                </Button>
            </Paper>
        </Box>
        <LoginModal open={showLoginModal} onClose={handleLoginClose} />
    </Container>
  );
}
