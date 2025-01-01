import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const premiumMember = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', gender: 'Male', joined: '2023-01-01', subscriptionEnd: '2023-12-31', booksOrdered: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', gender: 'Female', joined: '2023-02-15', subscriptionEnd: '2023-11-30', booksOrdered: 3 },
    // Add more members as needed
];

export default function PremiumMember() {
    const [searchTerm, setSearchTerm] = useState('');
    const [members, setMembers] = useState(premiumMember);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Premium Member
            </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem" }}>
                <TextField
                    label="Search Members"
                    variant="outlined"
                    // fullWidth
                    sx={{ float: 'right' }}
                    size='small'
                    margin="dense"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button disableElevation sx={{ textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.8rem 2rem" }} variant="contained" color="primary" onClick={() => alert('Add')}>
                    Add New Member
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Joined Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Subscription End Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Books Ordered</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.id}</TableCell>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.phone}</TableCell>
                                <TableCell>{member.gender}</TableCell>
                                <TableCell>{member.joined}</TableCell>
                                <TableCell>{member.subscriptionEnd}</TableCell>
                                <TableCell>{member.booksOrdered}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(member.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
