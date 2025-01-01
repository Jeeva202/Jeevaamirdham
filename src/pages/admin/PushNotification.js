import { Typography, Box, Card, CardContent, Button, TextField, Alert } from '@mui/material'
import React, { useState } from 'react'

export default function PushNotification() {

  const [description, setDescription] = useState('');

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Push Notification - Banner
      </Typography>

      <Card sx={{ marginTop: "1rem", width: "50%" }}>
        <CardContent>
          <Alert severity="info">Notification banner that will appear on top of your website. It will inform users about new content, updates, or important information.</Alert>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ marginTop: "1rem" }}
            multiline
            size='small'
            rows={4}
            margin="none"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button disableElevation sx={{ marginTop: "1rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }} variant="contained" color="primary">
              Publish
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
