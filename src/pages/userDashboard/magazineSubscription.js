import React from 'react';
import Alert from '@mui/material/Alert';
import { Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function MagazineSubsricption() {
    const planDetails = [
        "Unlimited Access to all E-magazine",
        "Unlimited song",
        "Unlimited video",
        "Option to order books",
    ];

    return (
        <div>
            {/* Plan Card */}
            <Card variant="outlined" sx={{ margin: '1rem 0' }}>
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Premium Subscription</h4>
                    <h3>Lifetime Plan</h3>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
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
                        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
                        <Button variant='contained' sx={{ textTransform: "none", background: "#0ABB75" }} disableElevation >Pay 1000</Button>
                        <h5>Note: This will be one time payment</h5>
                    </div>
                    </div>

                    {/* <br /> */}


                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ margin: '1rem 0' }}>
                <CardContent>
                    <h4 style={{ fontSize: "1rem", marginTop: "0" }}>Magazine Subscription</h4>
                    <Alert severity="info">Your Magazine Subscription start from 24-Nov-2024 End on 24-Nov-2025
                        <a href="#" style={{ textDecoration: "none" }}>
                            <span style={{ color: "#f09300", fontWeight: "bold", marginLeft: "5px" }}>
                                Renew now
                            </span>
                        </a>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    );
}
