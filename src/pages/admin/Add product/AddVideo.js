import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const existingVideos = [
    { id: 1, title: 'Video 1', subtitle: 'Subtitle 1', cover: 'cover1.jpg', videoUrl: 'video1.mp4' },
    { id: 2, title: 'Video 2', subtitle: 'Subtitle 2', cover: 'cover2.jpg', videoUrl: 'video2.mp4' },
    // Add more videos as needed
];

export default function AddVideo() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [cover, setCover] = useState(null);
    const [video, setVideo] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [currentCover, setCurrentCover] = useState('');
    const [category, setCategory] = useState('');

    const handleCoverUpload = (event) => {
        setCover(event.target.files[0]);
    };

    const handleVideoUpload = (event) => {
        setVideo(event.target.files[0]);
    };

    const handleSubmit = () => {
        // Implement video submission logic here
        console.log('Video submitted:', { title, subtitle, cover, video });
    };

    const handlePlay = (video) => {
        setCurrentVideo(video.videoUrl);
        setCurrentTitle(video.title);
        setCurrentSubtitle(video.subtitle);
        setCurrentCover(video.cover);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentVideo(null);
        setCurrentTitle('');
        setCurrentSubtitle('');
        setCurrentCover('');
        setCategory('');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Add New Video
            </Typography>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <TextField
                        label="Video Title"
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
                        label="Category"
                        variant="outlined"
                        fullWidth
                        size='small'
                        margin="normal"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <InputLabel sx={{ marginTop: "1rem" }}>Video Cover</InputLabel>
                    <TextField
                        type="file"
                        fullWidth
                        size='small'
                        margin="normal"
                        onChange={handleCoverUpload}
                    />
                    {cover && (
                        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                            {cover.name}
                        </Typography>
                    )}
                    <InputLabel sx={{ marginTop: "1rem" }}>Video File</InputLabel>
                    <TextField
                        type="file"
                        fullWidth
                        size='small'
                        margin="normal"
                        onChange={handleVideoUpload}
                    />
                    {video && (
                        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                            {video.name}
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
                            Submit Video
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom fontWeight={"bold"} sx={{ marginTop: 4, marginBottom: 2 }}>
                Existing Videos
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Subtitle</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Cover</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {existingVideos.map((video) => (
                            <TableRow key={video.id}>
                                <TableCell>{video.id}</TableCell>
                                <TableCell>{video.title}</TableCell>
                                <TableCell>{video.subtitle}</TableCell>
                                <TableCell>{video.cover}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handlePlay(video)} color="primary">
                                        <PlayArrowIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {currentCover && (
                            <img src={currentCover} alt="Cover" style={{ width: 60, height: 60, marginRight: 16 }} />
                        )}
                        <Box>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {currentTitle}
                            </Typography>
                            <Typography id="modal-modal-subtitle" variant="subtitle1" component="h3">
                                {currentSubtitle}
                            </Typography>
                        </Box>
                    </Box>
                    {currentVideo && (
                        <video controls autoPlay style={{ width: '100%', marginTop: '1rem' }}>
                            <source src={currentVideo} type="video/mp4" />
                            Your browser does not support the video element.
                        </video>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
