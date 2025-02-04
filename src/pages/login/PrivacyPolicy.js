import React from 'react';
import { Box, Typography, Card, CardContent, Container, List, ListItem, ListItemText } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ margin: '2rem auto' }}>
                <Card elevation={3}>
                    <CardContent sx={{ padding: '3rem' }}>
                        <Typography variant="h4" gutterBottom align="center">
                            Privacy Policy
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Your privacy is important to us. This Privacy Policy explains the types of personal information that are collected and recorded by Jeeva Amirdham and how we use it.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By using our website <strong>[https://www.Jeevaamirdham.org]</strong> (the "Site"), you agree to the collection and use of information in accordance with this policy.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            1. Information We Collect
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We collect various types of information to improve our services:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Personal Information (Name, Email, Address, Payment Details)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Non-Personal Information (IP Address, Browser Type, Device Type, Site Usage)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Cookies and Tracking Technologies to enhance user experience" />
                            </ListItem>
                        </List>

                        <Typography variant="h5" gutterBottom>
                            2. How We Use Your Information
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="To provide, operate, and maintain our website and services" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="To process your subscriptions and send updates" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="To improve, personalize, and analyze user experience" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="To comply with legal obligations" />
                            </ListItem>
                        </List>

                        <Typography variant="h5" gutterBottom>
                            3. Data Security
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We take reasonable measures to protect your data from unauthorized access, but no method of transmission is 100% secure.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            4. Your Rights & Choices
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Access: Request access to personal data we hold about you." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Correction: Update or correct your personal information." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Deletion: Request the deletion of your personal data." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Opt-out: Unsubscribe from our communications at any time." />
                            </ListItem>
                        </List>

                        <Typography variant="h5" gutterBottom>
                            5. Changes to This Privacy Policy
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We may update our Privacy Policy from time to time. Changes will be posted on this page.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            6. Contact Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you have any questions, please contact us at:
                        </Typography>
                        <Typography variant="body1">
                            <strong>Jeeva Amirdham</strong>
                            <br />Email: <a href="mailto:thiruwriter4u@gmail.com">thiruwriter4u@gmail.com</a>
                            <br />Phone: <a href="tel:+919176564723">+91 9176564723</a>
                            <br />Address: 11/6, Bharathi 4th street, N Usman Rd, T. Nagar, Chennai, Tamil Nadu 600017
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default PrivacyPolicy;