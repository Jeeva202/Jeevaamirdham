import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

// Sample data for the magazines
const lastReadMagazine = [
    {
        title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
        description: "Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur et ea.",
        lastReadDate: "19 November 2024",
        imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
        title: "Another Magazine Title",
        description: "Detailed description for this magazine, showcasing dynamic content.",
        lastReadDate: "20 November 2024",
        imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
];

export default function LastRead() {
    return (
        <Card variant='outlined'>
            <CardContent>
                <h4 style={{ fontSize: "1rem", marginTop: "0" }}>E-Magazine last read</h4>

                {lastReadMagazine.map((magazine, index) => (
                    <Card
                        variant='outlined'
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
                            margin: '1rem 0',
                        }}
                    >
                        {/* Magazine Image */}
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: '100%', md: 150 }, objectFit: 'cover' }} // Responsive image
                            image={magazine.imageUrl}
                            alt={magazine.title}
                        />

                        {/* Magazine Content */}
                        <CardContent sx={{width:"100%"}}>
                            <Typography component="div" sx={{ fontWeight: 'bold', color: '#F09300', fontSize:"1.1rem" }}>
                                {magazine.title}
                            </Typography>

                            <Typography sx={{ marginTop: '1rem', color: 'text.secondary', fontSize:"0.9rem" }}>
                                {magazine.description}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>

                                <Typography sx={{ color: '#3030830', marginTop: '1rem', fontWeight:"bold" }}>
                                    Last Read on {magazine.lastReadDate}
                                </Typography>

                                <Button
                                    variant="text"
                                    disableElevation
                                    sx={{ textTransform: 'none', marginTop: '1rem', color: "#f09300", background: "none", fontWeight: 'bold' }}
                                >
                                    Continue Reading
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>


    );
}
