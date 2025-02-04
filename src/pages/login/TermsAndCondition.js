import React from 'react';
import { Box, Typography, Card, CardContent, Container, List, ListItem, ListItemText, Link } from '@mui/material';

const TermsAndCondition = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ margin: '2rem 0' }}>
                <Card elevation={3}>
                    <CardContent sx={{ padding: '3rem' }}>
                        <Typography variant="h4" gutterBottom>
                            Terms and Conditions
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Welcome to Jeevaamirdham. By accessing or using our website
                            <strong>[https://www.Jeevaamirdham.org]</strong>
                            (the "Website") and App (Android/IOS) [Jeevaamirdham] (the "Mobile App"), you agree to comply with and be bound by
                            the following Terms and Conditions ("Terms"). If you do not agree with these Terms, you are not authorized to use the Website.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            1. Use of the Website
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText primary="1.1 Eligibility" secondary="To use the Website, you must be at least 13 years old or have the legal capacity to form a binding contract under applicable law." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1.2 License to Use" secondary="We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website for personal, non-commercial use." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="1.3 Prohibited Uses" secondary="You agree not to use the Website for any illegal or unauthorized purposes." />
                            </ListItem>
                        </List>

                        <Typography variant="h5" gutterBottom>
                            2. Content and Intellectual Property
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText primary="2.1 Ownership of Content" secondary="All content published on the Website, including articles, images, videos, designs, trademarks, and logos, is the property of Jeevaamirdham." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="2.2 User-Generated Content" secondary="By submitting content, you grant Jeevaamirdham a non-exclusive, royalty-free, worldwide license to use, display, and distribute it." />
                            </ListItem>
                        </List>

                        <Typography variant="h5" gutterBottom>
                            3. Subscriptions and Payments
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Access to certain features of the Website may require a paid subscription. Fees are subject to change, and payments are processed through secure third-party providers.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            4. Privacy and Data Collection
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Please review our <Link href="/privacyPolicy">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
                        </Typography>

                        <Typography variant="h5" gutterBottom>
                            5. Contact for Refunds
                        </Typography>
                        <Typography variant="body1" paragraph>
                            For refund requests or inquiries, please reach out to us at:
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            Email: <a href="mailto:admin@jeevaamirdham.org">admin@jeevaamirdham.org</a>

                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            Phone: <a href="tel:+9176564723">+91 9176564723</a>
                        </Typography>

                        <Typography variant="body1" paragraph>
                            By using the Website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default TermsAndCondition;
