import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const FavoriteItem = ({ image, title, link, buttonText }) => {
    return (
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', margin: '1rem', maxWidth: 225 }}>
            <CardMedia
                component="img"
                height="100"
                image={image}
                alt={title}
            />
            <CardContent>

                <p style={{ margin: "0", fontSize: "1rem", fontWeight:"bold" }}>{title}</p>
                <Button
                    variant="text"
                    sx={{
                        textTransform: 'none',
                        color: '#f09300',
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        fontWeight: 'bold'
                    }}
                    onClick={() => window.location.href = link} // Redirect to the link
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
};
const favoritesData = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி',
        link: '',
        buttonText: 'Read More',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி',
        link: ' ',
        buttonText: 'Read More',
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி',
        link: ' ',
        buttonText: 'Read More',
    },
    // More items can be added here
];
export default function Favorite() {
    return (
        <div style={{}}>

            <Card variant="outlined">
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Favorite (E-Magazine)</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {favoritesData.map((item, index) => (
                            <FavoriteItem
                                key={index}
                                image={item.image}
                                title={item.title}
                                link={item.link}
                                buttonText={item.buttonText}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <br />
            <Card variant="outlined">
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Favorite (Video)</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {favoritesData.map((item, index) => (
                            <FavoriteItem
                                key={index}
                                image={item.image}
                                title={item.title}
                                link={item.link}
                                buttonText={item.buttonText}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
            <br />

            <Card variant="outlined">
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Favorite (Audio)</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {favoritesData.map((item, index) => (
                            <FavoriteItem
                                key={index}
                                image={item.image}
                                title={item.title}
                                link={item.link}
                                buttonText={item.buttonText}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
