import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Container, TextField, Snackbar, Alert } from '@mui/material';
import { contactPage } from '../../constants/screenData';
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';
import './contact.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mailData = {
            to: 'admin@jeevaamirdham.org',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        try {
            const response = await fetch(process.env.REACT_APP_MAIL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mailData)
            });

            if (response.ok) {
                setSnackbarMessage('Message sent successfully!');
                setSnackbarSeverity('success');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setSnackbarMessage('Failed to send message. Please try again later.');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Container maxWidth="lg">
                <div className="contact-title">Contact</div>
                <div className="contact-content">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8301729415803!2d80.23217087460496!3d13.049016613177185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674d61d3ce11%3A0x62436121c6973052!2sJeevaAmirdham!5e1!3m2!1sen!2sin!4v1730838902257!5m2!1sen!2sin"
                        height="450"
                        style={{ border: 0 }}
                        className='contact-iframe'
                        allowFullScreen=""
                        loading="lazy"
                        title="Map"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="contact-form">
                        <div className="form-title">We Would Love To Hear From You</div>
                        <div className="form-subtitle">Your email address will not be published. Required fields are marked *</div>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                placeholder="Name"
                                fullWidth
                                margin="dense"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: "1.5rem",
                                        background: '#fff',
                                    },
                                }}
                            />
                            <TextField
                                variant="outlined"
                                placeholder="Email"
                                fullWidth
                                margin="dense"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: "1.5rem",
                                        background: '#fff',
                                    },
                                }}
                            />
                            <TextField
                                label="Multiline"
                                multiline
                                fullWidth
                                rows={4}
                                margin="dense"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: "1.5rem",
                                        background: '#fff',
                                    },
                                }}
                                placeholder="Message"
                            />
                            <Button
                                type="submit"
                                disableElevation
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                                sx={{ padding: "0.8rem 4rem", background: "#F09300", borderRadius: '1.5rem', marginTop: '1rem' }}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
                <div style={{ marginTop: "4rem" }}></div>
                <NewsLetter />
                <div style={{ marginTop: "4rem" }}></div>
                <KPI />
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
