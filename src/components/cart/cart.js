import React, { useEffect, useState } from "react";
import { Container, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed
import { useSelector } from "react-redux";
import { selectUserId, selectBooksData, selectIsUserLoggedIn } from "../../redux/cartSlice";

export default function ViewCart() {
  const [rows, setRows] = useState([]); // Initially empty, will be populated with real cart data
  const navigate = useNavigate();
  let userId = useSelector(selectUserId);
  let isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  // const bookdata = useSelector(selectBooksData);
  let totalAmount = rows.reduce((total, row) => total + row.subtotal, 0).toFixed(2);

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  // Fallback to localStorage if userId is not in Redux
  if (!userId) {
    userId = localStorage.getItem("id");
  }

  // Function to fetch the user's cart data
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/ebooks/get_cart?id=${userId}`);
      const cartData = response.data.cart_details; // Assuming cart_details is the array of books in the cart

      // Always fetch book details from API regardless of Redux data
      await fetchBookDetails(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Function to fetch book details from the API
  const fetchBookDetails = async (cartData) => {
    try {
      const bookIds = cartData.map(item => item.book_id);
      const bookDetails = await Promise.all(bookIds.map(async (bookId) => {
        const response = await axios.get(`http://localhost:3001/ebooks/book-info?id=${bookId}`);
        return response.data; // Ensure response has title and offPrice
      }));
  
      // Mapping cartData with the fetched book details
      const updatedRows = cartData.map((item) => {
        const book = bookDetails.find(book => book.id === item.book_id); // Ensure the structure matches
        return {
          name: book ? book.title : 'Unknown Title',  // Correct field: title
          price: book ? parseFloat(book.offPrice) : 0, // Correct field: offPrice
          quantity: item.quantity,
          subtotal: (book ? parseFloat(book.offPrice) : 0) * item.quantity,
          id: item.book_id,  // Using book_id for the delete and quantity functions
        };
      });
      setRows(updatedRows);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };
  

  // Fetch cart data when the component mounts
  useEffect(() => {
    if(isUserLoggedIn == true){
      fetchCartData();
    }
  }, [isUserLoggedIn]); // Run only on component mount

  // Handle delete from cart
  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:3001/ebooks/remove_from_cart", {
        userId,
        book_id: id,
      });

      // Remove the item from the frontend
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Handle quantity change and update backend
  const handleQuantityChange = async (bookId, newQuantity) => {
    try {
      await axios.post("http://localhost:3001/ebooks/update_quantity", {
        userId,
        book_id: bookId,
        quantity: newQuantity,
      });

      // Update the frontend
      setRows(rows.map((row) => {
        if (row.id === bookId) {
          return { ...row, quantity: newQuantity, subtotal: row.price * newQuantity };
        }
        return row;
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle increase quantity
  const increase = (bookId, quantity) => {
    handleQuantityChange(bookId, quantity + 1);
  };

  // Handle decrease quantity
  const decrease = (bookId, quantity) => {
    if (quantity > 1) {
      handleQuantityChange(bookId, quantity - 1);
    }
  };

  return (
    <Container maxWidth="lg">
      <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "4rem", paddingBottom: "2rem" }}>
        Cart
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "Bold" }}>PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">
                  PRICE
                </TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">
                  QUANTITY
                </TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">
                  SUBTOTAL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    <div className="counter">
                      <span className="decrease" onClick={() => decrease(row.id, row.quantity)}>
                        {" "}
                        -{" "}
                      </span>
                      &nbsp;
                      <span className="quantity"> {row.quantity} </span>
                      &nbsp;
                      <span className="increase" onClick={() => increase(row.id, row.quantity)}>
                        {" "}
                        +{" "}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.subtotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ background: "#fff", padding: "2rem", border: "1px solid #e6e6e6", borderRadius: "5px", width:{lg:'30%', xs: '30%'} }}>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>Cart Total</p>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Subtotal</p>
              <p>₹ {rows.reduce((total, row) => total + row.subtotal, 0).toFixed(2)}</p> {/* Calculate subtotal dynamically */}
            </div>
            <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Total</p>
              <p>₹ {rows.reduce((total, row) => total + row.subtotal, 0).toFixed(2)}</p> {/* Same for the total */}
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
              onClick={handleProceedToCheckout}
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
