import { useDispatch, useSelector } from "react-redux";
import { closeCart, removeFromCart } from "../../redux/cartSlice";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { IconButton, Drawer, Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
const CartModal = ({ open }) => {
    const dispatch = useDispatch();
    const cartDetails = useSelector(state => state.cart.cartDetails); // Cart details from Redux
    const booksData = useSelector(state => state.cart.booksData); // Books data from Redux
    const userId = useSelector(state => state.cart.userId); // Assuming userId is set in the store
    const navigate = useNavigate();
    const totalAmount = cartDetails?.reduce((total, item) => {
        const book = booksData.find((book) => book.id === item.book_id);
        return book ? total + item.quantity * book.offPrice : total;
    }, 0);
    const handleProceedToCheckout = () => {
        dispatch(closeCart());
        navigate("/checkout", { state: { totalAmount } });
      };
    
    // Handle removing an item from the cart
    const handleRemoveFromCart = async (bookId) => {
        try {
            await axios.post(process.env.REACT_APP_URL+'/ebooks/remove_from_cart', {
                userId,
                book_id: bookId,
            });

            dispatch(removeFromCart({ book_id: bookId }));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    return (
        <div>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => dispatch(closeCart())} // Close drawer on outside click
            >
                <Box
                    sx={{
                        width: 300,
                        padding: 2,
                        backgroundColor: "#f9f9f9",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                            <p style={{ fontWeight: "bold", fontSize: "1rem", margin: "0" }}>Shopping cart</p>
                            <ClearIcon onClick={() => dispatch(closeCart())} fontSize="small" sx={{ cursor: "pointer" }} />
                        </div>
                        <hr color="#d5d5d5" />
                    </div>

                    {/* Cart details rendering */}
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {cartDetails?.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            cartDetails?.map((item) => {
                                // Match book_id from cartDetails to booksData
                                const book = booksData.find((book) => book.id === item.book_id);
                                if (!book) return null; // Skip if book not found

                                return (
                                    <div key={item.book_id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img src={book.imgUrl} alt={book.title} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                                            <div>
                                                <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>{book.title}</div>
                                                <div style={{ fontSize: "0.8rem", color: "#888" }}>Quantity: {item.quantity}</div>
                                            </div>
                                        </div>
                                        <IconButton onClick={() => handleRemoveFromCart(item.book_id)}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Cart summary */}
                    <div>
                        <hr color="#d5d5d5" />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                            <p style={{ fontSize: "0.9rem", margin: "0" }}>Subtotal:</p>
                            <p style={{ fontSize: "0.9rem", margin: "0" }}>
                                Rs. {cartDetails?.reduce((total, item) => {
                                    const book = booksData.find((book) => book.id === item.book_id);
                                    return book ? total + item.quantity * book.offPrice : total;
                                }, 0)}
                            </p>
                        </div>

                        <Button
                            variant="text"
                            sx={{
                                borderRadius: "40px",
                                width: "100%",
                                p: "5px",
                                background: "#d9d9d9",
                                marginTop: "1.5rem",
                                color: "black",
                                fontSize: "0.7rem"
                            }}
                            onClick={() => { 
                                console.log("Navigating to checkout with total amount:", totalAmount);
                                dispatch(closeCart());
                                navigate('/cart'); 
                            }} 
                        >
                            View Cart
                        </Button>

                        <Button
                            variant="text"
                            sx={{
                                borderRadius: "40px",
                                width: "100%",
                                p: "5px",
                                background: "#F09300",
                                marginTop: "0.5rem",
                                color: "White",
                                fontSize: "0.7rem"
                            }}
                            onClick={handleProceedToCheckout} // Use navigate here
                        >
                            Checkout
                        </Button>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};

export default CartModal;