import { Typography, Box, Card, CardContent, Button, TextField, Alert, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import Switch from '@mui/material/Switch';

export default function PaymentGateway() {

  const [description, setDescription] = useState('');
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Gateway
      </Typography>

      <Card sx={{ marginTop: "1rem", width: "50%" }}>
        <CardContent>
          <Typography  fontSize={'1.2rem'} gutterBottom>Razorpay</Typography>

          <Box display={'flex'} alignItems={'center'} marginTop={'1rem'}>
            <InputLabel>Activate: </InputLabel>
            <Switch
              checked={checked}
              onChange={handleChange}
              color='warning'
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>

          <TextField
            label="Razorpay Key"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "1rem" }}
            size='small'
            margin="none"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />

          <TextField
            label="Razorpay Secret"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "1rem" }}
            size='small'
            margin="none"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disableElevation sx={{ marginTop: "1rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
