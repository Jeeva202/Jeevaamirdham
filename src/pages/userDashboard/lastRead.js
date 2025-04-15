import React, { useEffect } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, CircularProgress, Alert } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function LastRead() {
    const userId = localStorage.getItem('id');

    const { 
        data: lastReadData, 
        isLoading, 
        error, 
        refetch 
    } = useQuery(
        ['last-read', userId],
        async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_URL}/emagazine-page/get-last-read`, 
                { params: { uid: userId } }
            );
            return data;
        },
        {
            enabled: !!userId,
            staleTime: 1000 * 60 * 5, // 5 minutes cache
            refetchOnMount: 'always', // Ensures fresh data on component mount
        }
    );

    // Optional: Refetch when component mounts if you need additional control
    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);

    if (isLoading) {
        return (
            <Card variant='outlined'>
                <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <CircularProgress />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card variant='outlined'>
                <CardContent>
                    <Alert severity="error">
                        Failed to load last read magazines. 
                        <Button 
                            onClick={() => refetch()} 
                            color="inherit" 
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            Retry
                        </Button>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    if (!lastReadData || lastReadData.length === 0) {
        return (
            <Card variant='outlined'>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        You haven't read any magazines yet
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Recently Read Magazines
                </Typography>

                {lastReadData.map((magazine) => (
                    <Card
                        variant='outlined'
                        key={`${magazine.year}-${magazine.month}`}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            margin: '1rem 0',
                            '&:hover': {
                                boxShadow: 2,
                            },
                            transition: 'box-shadow 0.3s ease',
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ 
                                width: { xs: '100%', md: 150 }, 
                                height: { xs: 200, md: 150 },
                                objectFit: 'cover',
                                flexShrink: 0
                            }}
                            image={magazine.imgUrl || 'https://via.placeholder.com/150'}
                            alt={magazine.title}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150';
                            }}
                        />

                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography 
                                component="h3" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    color: '#F09300', 
                                    fontSize: "1.1rem",
                                    mb: 1
                                }}
                            >
                                {magazine.title}
                            </Typography>

                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'text.secondary',
                                    mb: 2,
                                    flexGrow: 1
                                }}
                            >
                                {magazine.shortDesc}
                            </Typography>
                            
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: 'text.disabled',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {new Date(magazine.year, magazine.month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </Typography>

                                {/* <Button
                                    variant="text"
                                    size="small"
                                    sx={{ 
                                        textTransform: 'none', 
                                        color: "#f09300", 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(240, 147, 0, 0.08)',
                                        }
                                    }}
                                    onClick={() => {
                                        // Add navigation to magazine logic here
                                    }}
                                >
                                    Continue Reading
                                </Button> */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}