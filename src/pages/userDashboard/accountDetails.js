import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import Gif_Loader from "../../components/loader/Gif_Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function AccountDetails({ formData, setFormData, isLoading, userId }) {
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
  const [localFormData, setLocalFormData] = useState(formData || {}); // Local state for editing

  // Sync local state when formData changes externally
  React.useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes in DatePicker
  const handleDateChange = (newValue) => {
    setLocalFormData((prevData) => ({
      ...prevData,
      dob: newValue ? newValue.toISOString() : null,
    }));
  };

  // Handle the "Edit" button click
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  // Handle the "Update" button click
  const handleUpdateClick = () => {
    console.log("handleUpdate", { ...localFormData, userId });

    // Send the updated form data to the server to update the DB
    axios
      .post(process.env.REACT_APP_URL + "/updateUserDetails", { ...localFormData, userId }) // Replace with actual API URL
      .then((response) => {
        console.log("User details updated:", response.data);
        setIsEditing(false); // Disable editing after update
        setFormData(localFormData); // Update parent state with the new values
        window.location.reload(); // Reload the page to reflect the changes
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  // If the user data is not yet loaded, show a loading state
  if (isLoading) {
    return <Gif_Loader />;
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",
        padding: "2rem",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5" sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}>
          Basic Information
        </Typography>
        {!isEditing && (
          <Button
            disableElevation
            variant="contained"
            color="black"
            sx={{
              textTransform: "none",
              background: "#f09300",
              fontWeight: "bold",
              borderRadius: "30px",
              padding: "0.8rem 3rem",
            }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            First Name *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter First Name"
            variant="outlined"
            value={localFormData?.firstName || ""}
            onChange={handleInputChange}
            name="firstName"
            disabled={!isEditing}
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
            value={localFormData?.lastName || ""}
            onChange={handleInputChange}
            name="lastName"
            disabled={!isEditing}
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
            value={localFormData?.gender || ""}
            onChange={handleInputChange}
            name="gender"
            disabled={!isEditing}
          />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Date of Birth *
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{ width: "100%" }}
              value={localFormData?.dob ? dayjs(localFormData?.dob) : null}
              onChange={handleDateChange}
              disabled={!isEditing}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
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
            value={localFormData?.phone || ""}
            onChange={handleInputChange}
            name="phone"
            disabled={!isEditing}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>
            Email ID *
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Email Address"
            variant="outlined"
            value={localFormData?.email || ""}
            onChange={handleInputChange}
            name="email"
            disabled={!isEditing}
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
            value={localFormData?.doorNo || ""}
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
            value={localFormData?.streetName || ""}
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
            value={localFormData?.city || ""}
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
            value={localFormData?.state || ""}
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
            value={localFormData?.country || ""}
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
            value={localFormData?.zipCode || ""}
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