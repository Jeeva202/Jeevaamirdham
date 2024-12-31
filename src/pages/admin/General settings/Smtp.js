import { Typography, Divider, Alert, Box, Card, CardContent, Button, TextField, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import React, { useState } from 'react';

export default function Smtp() {
    const [smtpConfig, setSmtpConfig] = useState({
        host: '',
        port: '',
        username: '',
        password: '',
        encryption: '',
        fromAddress: '',
        fromName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSmtpConfig({ ...smtpConfig, [name]: value });
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('SMTP Configuration:', smtpConfig);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                SMTP Settings
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: "1rem" }}>
                <Card sx={{ width: "45%" }}>
                    <CardContent>
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL HOST</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="host"
                            value={smtpConfig.host}
                            onChange={handleChange}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL PORT</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="port"
                            value={smtpConfig.port}
                            onChange={handleChange}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL USERNAME</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="username"
                            value={smtpConfig.username}
                            onChange={handleChange}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL PASSWORD</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="password"
                            type="password"
                            value={smtpConfig.password}
                            onChange={handleChange}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL ENCRYPTION</InputLabel>
                        <FormControl fullWidth size='small'>
                            <Select
                                name="encryption"
                                value={smtpConfig.encryption}
                                onChange={handleChange}
                            >
                                <MenuItem value="SSL">SSL</MenuItem>
                                <MenuItem value="TLS">TLS</MenuItem>
                            </Select>
                        </FormControl>
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL FROM ADDRESS</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="fromAddress"
                            value={smtpConfig.fromAddress}
                            onChange={handleChange}
                        />
                        <InputLabel sx={{ marginTop: "1rem" }}>MAIL FROM NAME</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            size='small'
                            name="fromName"
                            value={smtpConfig.fromName}
                            onChange={handleChange}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                disableElevation
                                sx={{ marginTop: "1rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }}
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ width: "45%" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Instructions
                        </Typography>
                        <Alert sx={{ margin: "1rem 0" }} severity="info">Please be careful when you are configuring SMTP. For incorrect configuration, you will get an error at the time of order placement, new registration, sending newsletters.</Alert>
                        <Typography variant="subtitle1" gutterBottom>
                            For Non-SSL:
                        </Typography>
                        <Typography variant="body2" component="ul" gutterBottom>
                            <li>Select sendmail for Mail Driver if you face any issue after configuring SMTP as Mail Driver.</li>
                            <li>Set Mail Host according to your server Mail Client Manual Settings.</li>
                            <li>Set Mail port as 587.</li>
                            <li>Set Mail Encryption as SSL if you face issue with TLS.</li>
                        </Typography>
                        <Divider sx={{ margin: "1rem 0" }} />
                        <Typography variant="subtitle1" gutterBottom>
                            For SSL:
                        </Typography>
                        <Typography variant="body2" component="ul" gutterBottom>
                            <li>Select sendmail for Mail Driver if you face any issue after configuring SMTP as Mail Driver.</li>
                            <li>Set Mail Host according to your server Mail Client Manual Settings.</li>
                            <li>Set Mail port as 465.</li>
                            <li>Set Mail Encryption as SSL.</li>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
