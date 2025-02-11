import React, { useState, useEffect } from 'react'
import { 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    CircularProgress, 
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions 
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const FavoriteItem = ({ image, title, link, buttonText, onDelete, bookId, isDeleting }) => {
    return (
        <Card variant="outlined" sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            margin: '1rem', 
            maxWidth: 225,
            position: 'relative' 
        }}>
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: '#f0930029',
                    }
                }}
                disabled={isDeleting}
                onClick={(e) => {
                    e.preventDefault();
                    onDelete(bookId);
                }}
            >
                {isDeleting ? (
                    <CircularProgress size={20} />
                ) : (
                    <FavoriteIcon sx={{ color: '#f09300' }} />
                )}
            </IconButton>
            <CardMedia
                component="img"
                height="100"
                image={image}
                alt={title}
                sx={{padding:'1.5rem 0'}}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p style={{ margin: "0", fontSize: "1rem", fontWeight: "bold" }}>{title}</p>
                <Button
                    variant="text"
                    sx={{
                        textTransform: 'none',
                        color: '#f09300',
                        fontWeight: 'bold',
                        marginTop: '0.5rem'
                    }}
                    onClick={() => window.location.href = link}
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
};

export default function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingIds, setDeletingIds] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('id'); // Assuming you store userId in localStorage
            console.log('userId', userId);
            const response = await axios.get(`${process.env.REACT_APP_URL}/favorites`, { params: { userId } });
            console.log('response', response)
            const bookDetails = await fetchBookDetails(response.data.favorites);
            setFavorites(bookDetails);
            setError(null);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            setError("Failed to load favorites");
        } finally {
            setLoading(false);
        }
    };

    const fetchBookDetails = async (favData) => {
        // const bookIds = favData.map(item => item.book_id);
        const bookDetails = await Promise.all(
            favData.map(async (bookId) => {
                const response = await axios.get(`${process.env.REACT_APP_URL}/ebooks/book-info?id=${bookId}`);
                return {
                    ...response.data,
                    type: 'book', // Add type for future filtering
                    favoriteId: bookId
                };
            })
        );
        return bookDetails;
    };

    const handleDeleteClick = (bookId) => {
        const book = favorites.find(item => item.id === bookId);
        setSelectedBook(book);
        setConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedBook) return;
        
        try {
            setDeletingIds(prev => [...prev, selectedBook.id]);
            const userId = localStorage.getItem('id');
            await axios.post(`${process.env.REACT_APP_URL}/deleteFavorites`, { 
                userId, 
                bookId: selectedBook.id 
            });
            setFavorites(prev => prev.filter(item => item.id !== selectedBook.id));
        } catch (error) {
            console.error("Error removing from favorites:", error);
        } finally {
            setDeletingIds(prev => prev.filter(id => id !== selectedBook.id));
            setConfirmDialog(false);
            setSelectedBook(null);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                {error}
            </div>
        );
    }

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Favorite Books</h4>
                    {favorites.length === 0 ? (
                        <Typography variant="body1" color="textSecondary" style={{ padding: '1rem' }}>
                            No favorite books found
                        </Typography>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {favorites.map((item) => (
                                <FavoriteItem
                                    key={item.id}
                                    image={item.imgUrl}
                                    title={item.title}
                                    link={`/emagazine`}
                                    buttonText="Read More"
                                    bookId={item.id}
                                    onDelete={handleDeleteClick}
                                    isDeleting={deletingIds.includes(item.id)}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog
                open={confirmDialog}
                onClose={() => setConfirmDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        padding: '1rem',
        },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Remove from Favorites?
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove "{selectedBook?.title}" from your favorites?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setConfirmDialog(false)} 
                        color="primary"
                        sx={{ textTransform: 'none', color:'#f09300' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        variant="contained"
                        autoFocus
                        disableElevation
                        size='small'
                        sx={{
                            background: '#f09300',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}  
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
