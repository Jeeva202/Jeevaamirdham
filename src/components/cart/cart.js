import React, { useEffect, useState } from "react";
import { Container, Button, Typography, Box, Grid } from "@mui/material";
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
import { selectUserId, selectBooksData, selectIsUserLoggedIn, selectCartDetails, setCartDetails } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ReactComponent as EmptyCartIcon } from "../../assets/images/empty_cart.svg"; // Import an empty cart icon
import { closeCart, removeFromCart } from "../../redux/cartSlice";


export default function ViewCart() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  let userId = useSelector(selectUserId);
  let isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  let booksDataFromStore = useSelector(selectBooksData)
  let cartDetails = useSelector(selectCartDetails)
  let totalAmount = rows.reduce((total, row) => total + row.subtotal, 0).toFixed(2);
  const dispatch = useDispatch()
  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  if (!userId) {
    userId = localStorage.getItem("id");
  }

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

  const handleDelete = async (id) => {
    try {
      if (isUserLoggedIn) {
        await axios.post(process.env.REACT_APP_URL + "/ebooks/remove_from_cart", { userId, book_id: id });
        dispatch(removeFromCart({ book_id: id }));

      } else {
        const updatedCart = cartDetails.filter((item) => item.book_id !== id);
        dispatch(removeFromCart({ book_id: id }));
        dispatch(setCartDetails(updatedCart));

      }
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (bookId, newQuantity) => {
    try {
      if (isUserLoggedIn) {
        await axios.post(process.env.REACT_APP_URL + "/ebooks/update_quantity", { userId, book_id: bookId, quantity: newQuantity });
      } else {
        const updatedCart = cartDetails.map((item) => {
          if (item.book_id === bookId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        dispatch(setCartDetails(updatedCart));
      }

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

  const increase = (bookId, quantity) => {
    handleQuantityChange(bookId, quantity + 1);
  };

  const decrease = (bookId, quantity) => {
    if (quantity > 1) {
      handleQuantityChange(bookId, quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ padding: '2rem 2rem' }}>
      <div style={{
        fontSize: isMobile ? "1rem" : "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "2rem"
      }}>
        Shopping Cart
      </div>

      {error && (
        <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>
      )}

      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "2rem"
      }}>
        <div style={{ flex: 1, overflowX: 'auto' }}>
          {rows.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#fff',
              borderRadius: '8px'
            }}>

              <EmptyCartIcon style={{ width: "150px", height: "150px" }} />
              <Typography sx={{ textAlign: "center" }}>Your cart is empty</Typography>
            </div>
          ) : (
            <TableContainer component={Paper} style={{
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <Table aria-label="cart table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{
                      fontWeight: "600",
                    }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="left">Price</TableCell>
                    <TableCell sx={{ fontWeight: "600" }} align="left">Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "600", display: isMobile ? 'none' : 'table-cell' }} align="left">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell style={{ padding: isMobile ? '8px' : '16px' }}>
                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          size={isMobile ? "small" : "medium"}
                        >
                          <ClearIcon fontSize={isMobile ? "0.7rem" : "0.9rem"} />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: isMobile ? 'none' : 'table-cell',
                          fontWeight: '500'
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left" >₹{row.price}</TableCell>
                      <TableCell align="left">
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: '0.5rem'
                        }}>
                          <IconButton
                            size="small"
                            onClick={() => decrease(row.id, row.quantity)}
                            style={{
                              border: '1px solid #ddd',
                              // padding: '4px'
                            }}
                          >
                            <RemoveIcon size="small" sx={{ fontSize: "0.8rem" }} />

                          </IconButton>
                          <span>{row.quantity}</span>
                          <IconButton
                            size="small"
                            onClick={() => increase(row.id, row.quantity)}
                            style={{
                              border: '1px solid #ddd',
                              // padding: '4px'
                            }}
                          >
                            <AddIcon size="small" sx={{ fontSize: "0.8rem" }} />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell align="left">₹{row.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>

        <div style={{
          background: "#fff",
          padding: "1.5rem",
          border: "1px solid #e6e6e6",
          borderRadius: "8px",
          width: isMobile ? 'auto' : '300px',
          alignSelf: isMobile ? 'stretch' : 'flex-start'
        }}>
          <h2 style={{
            fontSize: "1.25rem",
            marginBottom: "1.5rem",
            fontWeight: "600"
          }}>Cart Summary</h2>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem"
          }}>
            {rows.map((row, index) => (
              <Box key={index} >
                <Grid container >
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
                        <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: '0.9rem'
            }}>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <hr style={{ margin: "0.5rem 0", border: "none", borderTop: "1px solid #eee" }} />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "600",
              fontSize: '1rem'
            }}>
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <Button
              variant="contained"
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
              onClick={handleProceedToCheckout}
              disabled={rows.length === 0}
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
