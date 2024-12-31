import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const existingAudios = [
    { id: 1, title: 'Audio 1', subtitle: 'Subtitle 1', cover: 'cover1.jpg', audioUrl: 'audio1.mp3' },
    { id: 2, title: 'Audio 2', subtitle: 'Subtitle 2', cover: 'cover2.jpg', audioUrl: 'audio2.mp3' },
    // Add more audios as needed
];

export default function AddAudio() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [cover, setCover] = useState(null);
    const [audio, setAudio] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [currentCover, setCurrentCover] = useState('');

    const handleCoverUpload = (event) => {
        setCover(event.target.files[0]);
    };

    const handleAudioUpload = (event) => {
        setAudio(event.target.files[0]);
    };

    const handleSubmit = () => {
        // Implement audio submission logic here
        console.log('Audio submitted:', { title, subtitle, cover, audio });
    };

    const handlePlay = (audio) => {
        setCurrentAudio(audio.audioUrl);
        setCurrentTitle(audio.title);
        setCurrentSubtitle(audio.subtitle);
        setCurrentCover(audio.cover);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentAudio(null);
        setCurrentTitle('');
        setCurrentSubtitle('');
        setCurrentCover('');
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Add New Audio
            </Typography>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <TextField
                        label="Audio Title"
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
                    <InputLabel sx={{ marginTop: "1rem" }}>Audio Cover</InputLabel>
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
                    <InputLabel sx={{ marginTop: "1rem" }}>Audio File</InputLabel>
                    <TextField
                        type="file"
                        fullWidth
                        size='small'
                        margin="normal"
                        onChange={handleAudioUpload}
                    />
                    {audio && (
                        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
                            {audio.name}
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
                            Submit Audio
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom fontWeight={"bold"} sx={{ marginTop: 4, marginBottom: 2 }}>
                Existing Audios
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
                        {existingAudios.map((audio) => (
                            <TableRow key={audio.id}>
                                <TableCell>{audio.id}</TableCell>
                                <TableCell>{audio.title}</TableCell>
                                <TableCell>{audio.subtitle}</TableCell>
                                <TableCell>{audio.cover}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handlePlay(audio)} color="primary">
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
                    {currentAudio && (
                        <audio controls autoPlay style={{ width: '100%', marginTop: '1rem' }}>
                            <source src={currentAudio} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
