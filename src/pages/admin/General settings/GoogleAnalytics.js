import { Typography, Box, Card, CardContent, Button, TextField, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

export default function GoogleAnalytics() {
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [facebookClientId, setFacebookClientId] = useState('');
  const [facebookClientSecret, setFacebookClientSecret] = useState('');
  const [googleChecked, setGoogleChecked] = useState(true);
  const [facebookChecked, setFacebookChecked] = useState(true);

  const handleGoogleChange = (event) => setGoogleChecked(event.target.checked);
  const handleFacebookChange = (event) => setFacebookChecked(event.target.checked);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Google Analytics
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: "1rem" }}>
        <Card sx={{ width: "45%" }}>
          <CardContent>
            <Typography fontSize={'1.2rem'} gutterBottom>Google</Typography>
            <Box display={'flex'} alignItems={'center'} marginTop={'1rem'}>
              <InputLabel>Activate: </InputLabel>
              <Switch
                checked={googleChecked}
                onChange={handleGoogleChange}
                color='warning'
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
            <TextField
              label="Tracking ID"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "1rem" }}
              size='small'
              margin="none"
              value={googleClientSecret}
              onChange={(e) => setGoogleClientSecret(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disableElevation sx={{ marginTop: "1rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }} variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>

      </Box>

    </Box>
  );
}
