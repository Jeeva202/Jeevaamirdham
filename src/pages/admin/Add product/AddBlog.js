import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const categories = [
    'Technology',
    'Health',
    'Lifestyle',
    'Education',
    // Add more categories as needed
];

export default function AddBlog() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        // Implement blog submission logic here
        console.log('Blog submitted:', { title, subtitle, content, author, category, image });
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Add New Blog
            </Typography>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <TextField
                        label="Blog Title"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Subtitle"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        size='small'
                        rows={6}
                        margin="normal"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal" size='small'>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Category"
                        >
                            {categories.map((cat, index) => (
                                <MenuItem key={index} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <InputLabel sx={{ marginTop: "1rem" }}>Blog cover</InputLabel>
                    <TextField
                        type="file"
                        fullWidth
                        size='small'
                        margin="normal"
                        onChange={handleImageUpload}
                    />
                    {image && (
                        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                            {image.name}
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            sx={{ marginTop: "2rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.8rem 2rem" }}
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={handleSubmit}
                        >
                            Submit Blog
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </Box>
    );
}
