import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/cartSlice";
import axios from "axios";
import { useQuery } from "react-query";
import { Loader } from "../../components/loader/loader";
import Gif_Loader from "../../components/loader/Gif_Loader";
export default function AccountDetails({formData, setFormData, userData, setUserData, isLoading, userId}) {
  const [isEditing, setIsEditing] = useState(false);  // Track if the user is editing

  console.log("userData", userData);
  console.log("formData", formData);

  // Handle changes in form inputs (only when editing)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [0]: {
        ...prevData[0],
        [name]: value,
      },
    }));
  };

  // Handle the "Edit" button click
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  // Handle the "Update" button click
  const handleUpdateClick = () => {
    console.log("handleupdate", {...formData[0], userId});
    
    // Send the updated form data to the server to update the DB
    axios
      .post(process.env.REACT_APP_URL + "/updateUserDetails", {...formData[0], userId}) // Replace with actual API URL
      .then((response) => {
        console.log("User details updated:", response.data);
        setIsEditing(false); // Disable editing after update
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  // If the user data is not yet loaded, show a loading state
  if (isLoading) {
    // return <Loader/>;
    return <Gif_Loader />;
  }

  return (
    <Box sx={{ maxWidth: "800px", padding: "2rem", background: "#fff", borderRadius: "8px" }}  key={JSON.stringify(formData)}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h5" sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}>
          Basic Information
        </Typography>
        <Button
          disableElevation
          variant="contained"
          color="black"
          sx={{
            textTransform: 'none',
            background: "#f09300",
            fontWeight: "bold",
            borderRadius: "30px",
            padding: "0.8rem 3rem",
          }}
          onClick={handleEditClick}
        >
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Photo Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Photo (800x800)</Typography>
          <input
            type="file"
            style={{
              display: "block",
              marginTop: "0.5rem",
              width: "-webkit-fill-available",
              padding: "1rem",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "#f5f5f5",
            }}
            disabled={!isEditing}  // Disable the file input if not editing
          />
        </Grid>

        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            First Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter First Name"
            variant="outlined"
            value={formData[0]?.firstName }
            defaultValue={formData[0]?.firstName}
            onChange={handleInputChange}
            name="firstName"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Last Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Last Name"
            variant="outlined"
            value={formData[0]?.lastName }
            onChange={handleInputChange}
            name="lastName"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Gender *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Gender"
            variant="outlined"
            value={formData[0]?.gender }
            onChange={handleInputChange}
            name="gender"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Date of Birth *
          </Typography>
          <TextField
            fullWidth
            type="date"
            placeholder="Enter Date of Birth"
            InputLabelProps={{ shrink: true }}
            value={formData[0]?.dob }
            onChange={handleInputChange}
            name="dob"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Phone Number *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Phone Number"
            variant="outlined"
            value={formData[0]?.phone }
            onChange={handleInputChange}
            name="phone"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Email ID */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Email ID *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Email Address"
            variant="outlined"
            value={formData[0]?.email }
            onChange={handleInputChange}
            name="email"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {/* Address Fields */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Door No *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Door Number"
            variant="outlined"
            value={formData[0]?.doorNo }
            onChange={handleInputChange}
            name="doorNo"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Street Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Street Name"
            variant="outlined"
            value={formData[0]?.streetName }
            onChange={handleInputChange}
            name="streetName"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            City/Town *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter City/Town"
            variant="outlined"
            value={formData[0]?.city }
            onChange={handleInputChange}
            name="city"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            State/Province *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter State/Province"
            variant="outlined"
            value={formData[0]?.state }
            onChange={handleInputChange}
            name="state"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Country *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Country"
            variant="outlined"
            value={formData[0]?.country }
            onChange={handleInputChange}
            name="country"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Postal/Zip Code *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Postal/Zip Code"
            variant="outlined"
            value={formData[0]?.zipCode }
            onChange={handleInputChange}
            name="zipCode"
            disabled={!isEditing}  // Disable if not editing
          />
        </Grid>

        {isEditing && (
          <Grid item xs={12} marginTop={"1rem"}>
            <Button
              disableElevation
              variant="contained"
              color="black"
              sx={{
                textTransform: "none",
                background: "#f09300",
                fontWeight: "bold",
                borderRadius: "30px",
                padding: "1rem 3rem",
              }}
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}