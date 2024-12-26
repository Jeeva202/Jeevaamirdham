import React from 'react';
import Alert from '@mui/material/Alert';
import { Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Dashboard() {
    const planDetails = [
        "Access one free chapter from the E-magazine",
        "Listen to one song",
        "Watch one video",
        "Option to order books",
    ];

    return (
        <div>
            {/* Info Alert */}
            <Alert severity="info">Please Update your Account details</Alert>

            {/* Plan Card */}
            <Card variant="outlined" sx={{ margin: '1rem 0' }}>
                <CardContent>
                    <p style={{fontSize:"1rem"}}>Current Subscription</p>
                    <h3>Free Plan</h3>
                    
                    {/* Plan Details */}
                    <List>
                        {planDetails.map((detail, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckCircleIcon sx={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary={detail} />
                            </ListItem>
                        ))}
                    </List>
                    <br/>
                    <Button variant='contained' sx={{textTransform:"none", background:"#0ABB75"}} disableElevation >Subscribe Now</Button>
                </CardContent>
            </Card>
        </div>
    );
}
