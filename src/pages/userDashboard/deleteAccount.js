import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';

export default function DeleteAccount() {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleDelete = () => {
        if (input === 'CONFIRM') {
            alert('Account deleted successfully.');
        } else {
            alert('Please type "CONFIRM" correctly to proceed.');
        }
    };

    const handleCancel = () => {
        alert('Account deletion cancelled.');
    };

    return (
        <Card >
            <CardContent>
                <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Delete Account</h4>

                <Box sx={{background:"#D1ECF1", padding:"3rem", display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <Box mb={2}>
                        <Typography variant="body1" mb={1} color='#0C5460'>
                            Are you sure you want to delete your account?
                        </Typography>
                        <Typography variant="body2" color='#0C5460'>
                            Please type <strong>"CONFIRM"</strong> and click "Yes" to proceed.
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Type CONFIRM to proceed"
                        variant="outlined"
                        value={input}
                        onChange={handleInputChange}
                        sx={{ marginBottom: 2, background:"white" }}
                    />
                    <Box display="flex" gap={2}>
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'none', backgroundColor: '#0ABB75' }}
                            onClick={handleDelete}
                            disableElevation
                        >
                            Yes
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'none', backgroundColor: 'red' }}
                            onClick={handleCancel}
                            disableElevation
                        >
                            No
                        </Button>
                    </Box>
                </Box>

            </CardContent>
        </Card>
    );
}
