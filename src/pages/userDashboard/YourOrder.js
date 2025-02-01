import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Divider,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../redux/cartSlice";
import CartModal from "../../components/cart/cartModal";
import { useQuery } from "react-query"
import { setCartDetails, openCart, selectIsCartOpen, setBooksData } from "../../redux/cartSlice";
// import { Loader } from "../loader/loader";
import { selectIsUserLoggedIn, selectCartDetails } from "../../redux/cartSlice";
// import Gif_Loader from "../loader/Gif_Loader";
import { ReactComponent as EmptyCartIcon } from "../../assets/images/empty_cart.svg"; // Import an empty cart icon

const YourOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector(selectUserId) || localStorage.getItem("id");
    const dispatch = useDispatch()
    const isOpen = useSelector(selectIsCartOpen)
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    const cartDetails = useSelector(selectCartDetails)
    const handleAddToCart_NotUsed = async (bookId, quantity) => {
        console.log("add to cart",bookId, quantity)
        if(isUserLoggedIn){
            console.log("user id", userId);
            // const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
                const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
    
                userId: userId,
                book: bookId,
                quantity: quantity
            });
            const cartDetails = addtocart.data.cart_details;
    
            console.log(addtocart, "Buy Now");
    
            // Dispatch an action to update the Redux store with the updated cart details
            dispatch(setCartDetails(cartDetails)); // This will update the cartDetails in Redux
        }
        else{
            dispatch(setCartDetails([...cartDetails, {book_id:bookId, quantity: quantity || 1}]))
        }
        console.log("cartdetails",cartDetails);

        dispatch(openCart()); // Open the cart modal
    };
    const handleAddToCart = async (bookId, quantity) => {
        if(isUserLoggedIn){
            console.log("user id", userId);
                const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
    
                userId: userId,
                book: bookId,
                quantity: quantity
            });
            const cartDetailsfromAPI = addtocart.data.cart_details;
    
            console.log(addtocart, "Buy Now");
    
            // Dispatch an action to update the Redux store with the updated cart details
            dispatch(setCartDetails(cartDetailsfromAPI)); // This will update the cartDetails in Redux
        }
        else{
            let noLoginCartData = [...cartDetails, {book_id:bookId, quantity: quantity || 1}]
            console.log("no login", noLoginCartData);
            
            dispatch(setCartDetails(noLoginCartData))
        }
        console.log(cartDetails);
        
        dispatch(openCart()); 
    };
    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const response = await axios.get(`${process.env.REACT_APP_URL}/getUserOrders`, {
                    params: { userId },
                });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (orders.length === 0) {
        return (
                <Card>
                    <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column", }}>
                        <Typography>
                         <EmptyCartIcon style={{ width: "150px", height: "150px" }} />
                           <Typography sx={{textAlign:"center"}}>No orders found.</Typography> 
                        </Typography>
                    </CardContent>
                </Card>

        );
    }

    return (
        <Box sx={{ maxWidth: 900 }}>
            <Card variant="outlined" sx={{ borderRadius: "5px", overflow: "hidden" }}>
                <h4 style={{ fontSize: "1rem", margin: "0", padding: "1rem" }}>
                    Your Orders
                </h4>

                {orders.map((order, index) => (
                    <React.Fragment key={index}>
                        <CardContent>
                            {/* Order Header */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#a8dfff",
                                    borderRadius: "8px",
                                    marginBottom: "1rem",
                                }}
                            >
                                <Box sx={{ display: "flex", gap: "2rem" }}>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary">
                                            Order Placed
                                        </Typography>
                                        <Typography variant="body2">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary">
                                            Total
                                        </Typography>
                                        <Typography variant="body2">₹{order.totalPrice}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary">
                                            Ship To
                                        </Typography>
                                        <Typography variant="body2">{order.shipTo}</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="textSecondary">
                                        Transaction ID
                                    </Typography>
                                    <Tooltip title="View Order Details">
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            sx={{ cursor: "pointer" }}
                                        >
                                            {order.orderId}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                {/* <Box>
                                <Button variant="outlined" size="small" sx={{textTransform:"none", background:'#fff'}}>
                                    <a target="_blank" href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx" style={{color:'#000'}}>Track Order</a>
                                    </Button>
                                </Box> */}
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography
                                    sx={{ fontWeight: "bold", fontSize: '0.9rem' }}
                                >
                                    Shipping Address: {order.status}
                                    
                                    <Typography
                                        sx={{ marginTop: "0rem", fontSize: '0.8rem', color: '#333' }}
                                    >
                                        {order.shipAt}
                                    </Typography>
                                </Typography>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Develivered within 5 to 7 working days.
                                    {/* <Typography sx={{ fontSize: '0.8rem' }}>{order.returnWindow}</Typography> */}
                                </Typography>
                            </Box>



                            {/* Order Items */}
                            {order.items.map((item, itemIndex) => (
                                <Box
                                    key={itemIndex}
                                    sx={{
                                        display: "flex",
                                        gap: "1rem",
                                        marginTop: "1rem",
                                        padding: "1rem 1rem",
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "8px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: "1rem" }}>

                                        <img
                                            src={item.bookImage}
                                            alt={item.bookTitle}
                                            style={{
                                                width: "5rem",
                                                height: "auto",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                                // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                                            >
                                                {item.bookTitle}{" "}
                                                {item.quantity > 1 && `x ${item.quantity}`}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "1rem",
                                                    marginTop: "1rem",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    disableElevation
                                                    sx={{
                                                        borderRadius: "15px",
                                                        textTransform: "none",
                                                        backgroundColor: "#f09300",
                                                        fontWeight: "bold",
                                                    }}
                                                    onClick={() => handleAddToCart(item.bookId, 1)}
                                                >
                                                    Buy again
                                                </Button>
                                                {/* <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: "15px",
                                                        textTransform: "none",
                                                        borderColor: "#f09300",
                                                        fontWeight: "bold",
                                                        color: "#f09300",
                                                    }}
                                                >
                                                    View book
                                                </Button> */}

                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ color: "#888", fontSize: "0.9rem" }}>
                                       Price: ₹{item.price*item.quantity}
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                        {index < orders.length - 1 && (
                            <Divider sx={{ margin: "1rem 0" }} />
                        )}
                    </React.Fragment>
                ))}
            <CartModal open={isOpen} />
            </Card>
        </Box>
    );
};

export default YourOrder;
