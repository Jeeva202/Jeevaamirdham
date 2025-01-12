import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, IconButton, Typography, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const premiumMember = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', gender: 'Male', joined: '2023-01-01', subscriptionEnd: '2023-12-31', booksOrdered: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', gender: 'Female', joined: '2023-02-15', subscriptionEnd: '2023-11-30', booksOrdered: 3 },
    // Add more members as needed
];

export default function EliteMember() {
    const [searchTerm, setSearchTerm] = useState('');
    const [members, setMembers] = useState(premiumMember);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMenuOpen = (event, member) => {
        setAnchorEl(event.currentTarget);
        setSelectedMember(member);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMember(null);
    };

    const handleDelete = () => {
        setMembers(members.filter(member => member.id !== selectedMember.id));
        setOpenDeleteDialog(false);
        handleMenuClose();
    };

    const handleMove = () => {
        // Implement the logic to move the user to a different membership
        console.log(`Move ${selectedMember.name} to ${selectedMembership}`);
        setOpenMoveDialog(false);
        handleMenuClose();
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Elite Members
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem" }}>
                <TextField
                    label="Search Members"
                    variant="outlined"
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
                                    <IconButton onClick={(event) => handleMenuOpen(event, member)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                                            <ListItemIcon>
                                                <DeleteIcon />
                                            </ListItemIcon>
                                            Delete
                                        </MenuItem>
                                        <MenuItem onClick={() => setOpenMoveDialog(true)}>
                                            <ListItemIcon>
                                                <SwapHorizIcon />
                                            </ListItemIcon>
                                            Move to Membership
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedMember?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} variant='outlined'
                        sx={{ textTransform: "none", border: "1px solid #f09300", color: "#f09300", fontWeight: "bold" }}
                    >Cancel</Button>
                    <Button onClick={handleDelete} sx={{ textTransform: "none", background: "#f09300", fontWeight: "bold" }} variant='contained'>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openMoveDialog}
                onClose={() => setOpenMoveDialog(false)}
            >
                <DialogTitle>Move to Membership</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select the membership to move {selectedMember?.name} to:
                    </DialogContentText>
                    <RadioGroup
                        sx={{ marginTop: 2 }}
                        value={selectedMembership}
                        onChange={(e) => setSelectedMembership(e.target.value)}
                    >
                        <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                        <FormControlLabel value="Elite" control={<Radio />} label="Elite" />
                        <FormControlLabel value="Basic" control={<Radio />} label="Free" />
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenMoveDialog(false)} variant='outlined'
                        sx={{ textTransform: "none", border: "1px solid #f09300", color: "#f09300", fontWeight: "bold" }}
                    >Cancel</Button>
                    <Button onClick={handleMove} sx={{ textTransform: "none", background: "#f09300", fontWeight: "bold" }} variant='contained'>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
