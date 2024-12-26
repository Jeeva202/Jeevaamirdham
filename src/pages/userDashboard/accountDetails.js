import React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";

export default function AccountDetails() {
  return (
    <Box sx={{ maxWidth: "800px", padding: "2rem", background: "#fff", borderRadius: "8px" }}>
      <Box display={'flex'} justifyContent={'space-between'}>
      <Typography variant="h5" sx={{ marginBottom: "1.5rem", fontWeight: "bold" }}>
        Basic Information
      </Typography>
      <Button disableElevation variant="contained" color="black" sx={{ float: "right", textTransform:'none', background:"#f09300", fontWeight:"bold", borderRadius:"30px", padding:"0rem 3rem" }}>
            Edit
          </Button>
      </Box>


      <Grid container spacing={3}>
        {/* Photo Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Photo (800x800)</Typography>
          <input type="file" style={{ display: "block", marginTop: "0.5rem", width:"-webkit-fill-available", padding:"1rem", border:"1px solid #d9d9d9", borderRadius:"4px", background:"#f5f5f5" }} />
        </Grid>

        {/* First Name */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>First Name *</Typography>
          <TextField fullWidth placeholder="Enter First Name" variant="outlined" />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Last Name *</Typography>
          <TextField fullWidth placeholder="Enter Last Name" variant="outlined" />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Gender *</Typography>
          <TextField fullWidth placeholder="Enter Gender" variant="outlined" />
        </Grid>

        {/* Date of Birth */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Date of Birth *</Typography>
          <TextField fullWidth type="date" placeholder="Enter Date of Birth" InputLabelProps={{ shrink: true }} variant="outlined" />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Phone Number *</Typography>
          <TextField fullWidth placeholder="Enter Phone Number" variant="outlined" />
        </Grid>

        {/* Email ID */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Email ID *</Typography>
          <TextField fullWidth placeholder="Enter Email Address" variant="outlined" />
        </Grid>

        {/* Create Password */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Create Password *</Typography>
          <TextField fullWidth type="password" placeholder="Create Password" variant="outlined" />
        </Grid>

        {/* Confirm Password */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Confirm Password *</Typography>
          <TextField fullWidth type="password" placeholder="Confirm Password" variant="outlined" />
        </Grid>

        {/* Address Fields */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Door No *</Typography>
          <TextField fullWidth placeholder="Enter Door Number" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Street Name *</Typography>
          <TextField fullWidth placeholder="Enter Street Name" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>City/Town *</Typography>
          <TextField fullWidth placeholder="Enter City/Town" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>State/Province *</Typography>
          <TextField fullWidth placeholder="Enter State/Province" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Country *</Typography>
          <TextField fullWidth placeholder="Enter Country" variant="outlined" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ marginBottom: "0.3rem" }}>Postal/Zip Code *</Typography>
          <TextField fullWidth placeholder="Enter Postal/Zip Code" variant="outlined" />
        </Grid>

        {/* Update Button */}
        <Grid item xs={12} marginTop={'1rem'}>
          <Button disableElevation variant="contained" color="black" sx={{ float: "right", textTransform:'none', background:"#f09300", fontWeight:"bold", borderRadius:"30px", padding:"1rem 3rem" }}>
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
