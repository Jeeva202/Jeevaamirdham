import * as React from 'react';
import { useState } from "react";
import "./cart.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const initialRows = [
  createData('Gnana Amirtham', "₹ 500", "", "₹ 500"),
  createData('Gnana Amirtham', "₹ 500", "", "₹ 500"),
  createData('Gnana Amirtham', "₹ 500", "", "₹ 500"),
  createData('Gnana Amirtham', "₹ 500", "", "₹ 500"),
  createData('Gnana Amirtham', "₹ 500", "", "₹ 500"),
];

export default function ViewCart() {
  const [rows, setRows] = React.useState(initialRows);
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate();


  const handleDelete = (name) => {
    setRows(rows.filter((row) => row.name !== name));
  };
  const decrease = (x) => {
    if (x != 1) {
      setQuantity(x - 1)
    }
  }
  const increase = (x) => {
    setQuantity(x + 1)
  }

  return (
    <Container maxWidth="lg">
      <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "4rem", paddingBottom: "2rem" }}>Cart</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ fontWeight: "Bold" }}>PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">PRICE</TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">QUNATITY</TableCell>
                <TableCell sx={{ fontWeight: "Bold" }} align="right">SUBTOTAL</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <IconButton onClick={() => handleDelete(row.name)}><ClearIcon fontSize='small' /></IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">
                    <div className="counter">
                      <span className="decrease" onClick={() => { decrease(quantity) }}> - </span>
                      &nbsp;
                      <span className="quantity"> {quantity} </span>
                      &nbsp;
                      <span className="increase" onClick={() => { increase(quantity) }}> + </span>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ background: "#fff", padding: "2rem", border: "1px solid #e6e6e6", borderRadius: "5px", width: "30%" }}>
          <p style={{ fontSize: "1.5rem", margin:"10px 0" }}>Cart Total</p>
          <div>

          </div>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <p>Subtotal</p>
            <p>₹ 500</p>
          </div>
          <hr color="#d5d5d5" style={{ margin: "0.8rem 0" }} />
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <p>Total</p>
            <p>₹ 500</p>
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
        }} onClick={() => { navigate('/checkout') }}>
          Proceed to checkout
        </Button>
        </div>
      </div>




      <hr color="#d5d5d5" style={{ margin: "2rem 0" }} />
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "3rem",
      }}>
        <input type="text" name="" id="" placeholder="Coupon code*" style={{
          borderRadius: "50px",
          padding: "1rem 2rem",
          width: "10rem",
          border: "1px solid #E6E6E6",
        }} />
        <Button variant="text" sx={{
          borderRadius: "40px",
          width: "10rem",
          background: "#F09300",
          color: "White",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "none"
        }} >
          Apply coupon
        </Button>
      </div>

    </Container>

  );
}
