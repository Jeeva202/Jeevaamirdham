import React, { useState } from "react";
import { Drawer, Button, Box } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { closeCart } from "../../redux/cartSlice"; 

const CartModal = ({open}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

 console.log(open,"redux open")
    return (
        <div>
            <Drawer
                anchor="right" // Sets the drawer to open from the right
                open={open}
                onClose={() => dispatch(closeCart())} // Close drawer on outside click
            >
                <Box
                    sx={{
                        width: 300, // Set drawer width
                        padding: 2,
                        backgroundColor: "#f9f9f9", // Optional: Background color of the drawer
                        height: "100%", // Full-height drawer
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",

                    }}
                >
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom:"0.8rem" }}>
                            <p style={{ fontWeight: "bold", fontSize: "1rem", margin: "0" }}>Shopping cart</p>
                            <ClearIcon onClick={() => dispatch(closeCart())} fontSize="small" sx={{ cursor: "pointer" }} />
                        </div>
                        <hr color="#d5d5d5"/>
                    </div>
                    <div>
                        <hr color="#d5d5d5" />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop:"1rem" }}>
                            <p style={{ fontSize: "0.9rem", margin: "0" }}>Subtotal:</p>
                            <p style={{ fontSize: "0.9rem", margin: "0" }}>Rs. 500</p>
                        </div>

                        <Button variant="text" sx={{
                            borderRadius: "40px",
                            width: "100%",
                            p: "5px",
                            background: "#d9d9d9",
                            marginTop: "1.5rem",
                            color: "black",
                            fontSize: "0.7rem"
                        }} onClick={() => { navigate('/cart') }}>
                            view cart
                        </Button>
                        <Button variant="text" sx={{
                            borderRadius: "40px",
                            width: "100%",
                            p: "5px",
                            background: "#F09300",
                            marginTop: "0.5rem",
                            color: "White",
                            fontSize: "0.7rem"
                        }} onClick={() => { navigate('/checkout') }}>
                           Checkout
                        </Button>
                    </div>


                </Box>
            </Drawer>
        </div>
    );
};

export default CartModal;
