import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import Gif_Loader from "../../components/loader/Gif_Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { showSnackbar } from "../../redux/SnackBarSlice";
import { useDispatch } from "react-redux";

export default function AccountDetails({ formData, setFormData, isLoading, userId, setMissingFields }) {
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
  const [localFormData, setLocalFormData] = useState(formData || {}); // Local state for editing
  const dispatch = useDispatch();

  // Sync local state when formData changes externally
  React.useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
        setMissingFields(true);
        return;
    }

    const requiredFields = ["firstName", "lastName", "gender", "dob", "phone", "email", "doorNo", "streetName", "city", "state", "country", "zipCode"];
    const isValid = requiredFields.every((field) => !!formData[field]);

    setMissingFields(!isValid); // If any field is missing, show alert in Dashboard
}, [formData, setMissingFields]);


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
    // Check if the newValue is a valid dayjs object
    if (newValue && newValue.isValid()) {
      setLocalFormData((prevData) => ({
        ...prevData,
        dob: newValue.toISOString(), // Convert to ISO string only if valid
      }));
    } else {
      // If the date is invalid, set it to null or handle it appropriately
      setLocalFormData((prevData) => ({
        ...prevData,
        dob: null,
      }));
    }
  };

  // Handle the "Edit" button click
  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  // Handle the "Update" button click
  const handleUpdateClick = () => {
    console.log("handleUpdate", { ...localFormData, userId });
    const requiredFields = [
      "firstName", "lastName", "gender", "dob", 
      "phone", "email", "doorNo", "streetName", 
      "city", "state", "country", "zipCode"
    ];
  
    // Find any missing fields
    const missingFields = requiredFields.filter(field => !localFormData[field]?.trim());
  
    if (missingFields.length > 0) {
      dispatch(showSnackbar({ message: "Please fill all required fields", severity: "info" }));

      return;
    }
    // Send the updated form data to the server to update the DB
    axios
      .post(process.env.REACT_APP_URL + "/updateUserDetails", { ...localFormData, userId }) // Replace with actual API URL
      .then((response) => {
        console.log("User details updated:", response.data);
        // setFormData(localFormData); // Update parent state with the new values
        // window.location.reload(); // Reload the page to reflect the changes
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...localFormData, // Merge updated fields
        }));
        setIsEditing(false); // Disable editing after update
      dispatch(showSnackbar({ message: "Account details updated.", severity: "success" }));

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
      <Box display={"flex"} justifyContent={"space-between"} marginBottom={"1.5rem"} alignItems={"center"}>
        <Typography variant="h5" sx={{ fontWeight: "bold", fontSize:{xs:"0.9rem", sm:"1rem", md:"1rem"} }}>
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
              borderRadius: {xs:'10px', sm:'10px', md:'30px'},
              padding: "0.8rem 3rem",
              padding:{xs:"0.5rem 1rem", sm:"0.8rem 2rem", md:"0.8rem 3rem"},
              height:{xs:"30px", sm:"40px", md:"60px"}
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
            size="small"
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
            size="small"
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
            size="small"
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
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker sx={{ width: "100%" }}
              value={localFormData?.dob ? dayjs(localFormData?.dob) : null}
              onChange={handleDateChange}
              disabled={!isEditing}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { '& .MuiOutlinedInput-input': { padding: '8.5px 14px' } }
                }
              }}
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
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
                padding:{xs:"0.5rem 1rem", sm:"0.8rem 2rem", md:"0.8rem 3rem"},

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