import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, FormControlLabel } from '@mui/material';

const categories = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'History',
    // Add more categories as needed
];

const existingBooks = [
    { id: 1, title: 'Book 1', subtitle: 'Subtitle 1', author: 'Author 1', pages: 200, cost: '₹500', category: 'Fiction' },
    { id: 2, title: 'Book 2', subtitle: 'Subtitle 2', author: 'Author 2', pages: 300, cost: '₹600', category: 'Non-Fiction' },
    // Add more books as needed
];

export default function AddBook() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [details, setDetails] = useState('');
    const [uploadedDate, setUploadedDate] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [availability, setAvailability] = useState('');
    const [author, setAuthor] = useState('');
    const [id, setId] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const [img, setImg] = useState(null);
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [favorite, setFavorite] = useState(false);

    const handleImageUpload = (event) => {
        setImg(event.target.files[0]);
    };

    const handleSubmit = () => {
        // Implement book submission logic here
        console.log('Book submitted:', { year, month, details, uploadedDate, title, genre, availability, author, id, shortDesc, category, tag, img, cost, description, additionalInfo, favorite });
    };

    return (
        <><Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Add New Book
            </Typography>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <TextField
                        label="Year"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={year}
                        onChange={(e) => setYear(e.target.value)} />
                    <TextField
                        label="Month"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)} />
                    <TextField
                        label="Details"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)} />
                    <TextField
                        label="Uploaded Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={uploadedDate}
                        onChange={(e) => setUploadedDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <TextField
                        label="Genre"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)} />
                    <TextField
                        label="Availability"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)} />
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                    <TextField
                        label="ID"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={id}
                        onChange={(e) => setId(e.target.value)} />
                    <TextField
                        label="Short Description"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)} />
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
                    <TextField
                        label="Tag"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)} />
                    <InputLabel sx={{ marginTop: "1rem" }}>Book Cover</InputLabel>
                    <TextField
                        type="file"
                        fullWidth
                        size='small'
                        margin="normal"
                        onChange={handleImageUpload} />
                    {img && (
                        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                            {img.name}
                        </Typography>
                    )}
                    <TextField
                        label="Cost"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)} />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        size='small'
                        rows={4}
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <TextField
                        label="Additional Info"
                        variant="outlined"
                        fullWidth
                        multiline
                        size='small'
                        rows={4}
                        margin="normal"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={favorite}
                                onChange={(e) => setFavorite(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Favorite"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            sx={{ marginTop: "2rem", textTransform: "none", background: "#f09300", fontWeight: "bold", borderRadius: "30px", padding: "0.8rem 2rem" }}
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={handleSubmit}
                        >
                            Submit Book
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom fontWeight={"bold"} sx={{ marginTop: 4, marginBottom: 2 }}>
                Existing Books
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Subtitle</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Pages</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {existingBooks.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.subtitle}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.pages}</TableCell>
                                <TableCell>{book.cost}</TableCell>
                                <TableCell>{book.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    );
}
