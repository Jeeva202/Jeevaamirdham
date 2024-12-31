import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button,Alert, Typography, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import CopyIcon from '@mui/icons-material/FileCopy';
import ClearIcon from '@mui/icons-material/Clear';

const initialThoughts = [
    "Thought 1",
    "Thought 2",
    // Add more thoughts as needed
];

export default function TodaysThought() {
    const [thoughts, setThoughts] = useState(initialThoughts);
    const [currentThought, setCurrentThought] = useState('');
    const [newThoughts, setNewThoughts] = useState(['']);

    useEffect(() => {
        const today = new Date().getDate();
        setCurrentThought(thoughts[today % thoughts.length]);
    }, [thoughts]);

    const handleAddThoughts = () => {
        const filteredThoughts = newThoughts.filter(thought => thought.trim() !== '');
        if (filteredThoughts.length) {
            setThoughts(filteredThoughts);
            setNewThoughts(['']);
        }
    };

    const handleCopyThought = (thought) => {
        navigator.clipboard.writeText(thought);
    };

    const handleThoughtChange = (index, value) => {
        const updatedThoughts = [...newThoughts];
        updatedThoughts[index] = value;
        setNewThoughts(updatedThoughts);
    };

    const handleAddInput = () => {
        setNewThoughts([...newThoughts, '']);
    };

    const handleDeleteThought = (index) => {
        const updatedThoughts = newThoughts.filter((_, i) => i !== index);
        setNewThoughts(updatedThoughts);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Today's Thought
            </Typography>

            <Alert severity="info" sx={{margin:"1rem 0"}}><strong>Todays Thought: </strong>{currentThought}</Alert>

            <Box sx={{ display: 'flex', gap: 2, marginTop: "1rem", flexWrap: 'wrap' }}>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle2" gutterBottom fontWeight={"bold"}>
                            Add New Thoughts
                        </Typography>
                        {newThoughts.map((thought, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, gap: "1rem" }}>
                                <TextField
                                    // label={`Thought ${index + 1}`}
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    margin="dense"
                                    value={thought}
                                    onChange={(e) => handleThoughtChange(index, e.target.value)}
                                />
                                <IconButton onClick={() => handleDeleteThought(index)} color="error">
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button sx={{ marginTop: "1rem", textTransform: "none", border: "1px solid #f09300",color:"#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }} variant="outlined" color="primary" onClick={handleAddInput}>
                            Add More
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button disableElevation sx={{ marginTop: "1rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.3rem 1.5rem" }} variant="contained" color="primary" onClick={handleAddThoughts}>
                                Publish
                            </Button>
                        </Box>
                        </Box>

                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="subtitle2" gutterBottom fontWeight={"bold"}>
                            Thought History
                        </Typography>
                        <List>
                            {thoughts.map((thought, index) => (
                                <React.Fragment key={index}>
                                    <ListItem secondaryAction={
                                        <IconButton edge="end" onClick={() => handleCopyThought(thought)}>
                                            <CopyIcon />
                                        </IconButton>
                                    }>
                                        <ListItemText primary={thought} />
                                    </ListItem>
                                    {index < thoughts.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
