import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more users as needed
];

export default function NewsLetter() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSelectAll = (event) => {
        setSelectAll(event.target.checked);
        setSelectedUsers(event.target.checked ? users.map(user => user.id) : []);
    };

    const handleUserSelect = (event) => {
        const value = event.target.value;
        setSelectedUsers(value);
        setSelectAll(value.length === users.length);
    };

    const handleSendEmail = () => {
        // Implement email sending logic here
        console.log('Sending email to:', selectedUsers);
        console.log('Subject:', subject);
        console.log('Body:', body);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Send News Letter
            </Typography>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <FormControl fullWidth margin="normal" size='small'>
                        <InputLabel>Select Users</InputLabel>
                        <Select
                            multiple
                            value={selectedUsers}
                            label="Select Users"
                            onChange={handleUserSelect}
                            renderValue={(selected) => selected.map(id => users.find(user => user.id === id).name).join(', ')}
                        >
                            <MenuItem value="all">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={selectAll}
                                            onChange={handleSelectAll}
                                        />}
                                    label="Select All"
                                />
                            </MenuItem>
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    <Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <TextField
                        label="Body"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={6}
                        margin="normal"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                        <Button disableElevation sx={{ marginTop: "2rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.8rem 2rem" }} variant="contained" color="primary" onClick={handleSendEmail}>
                            Send Email
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
