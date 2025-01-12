import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, Container, TextField } from '@mui/material';
import { contactPage } from '../../constants/screenData';
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';
import './contact.css';

export default function Contact() {
    return (
        <div>
            <Container maxWidth="lg">
                <div className="contact-title">Contact</div>
                <div className="contact-content">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8301729415803!2d80.23217087460496!3d13.049016613177185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674d61d3ce11%3A0x62436121c6973052!2sJeevaAmirdham!5e1!3m2!1sen!2sin!4v1730838902257!5m2!1sen!2sin"
                        // width="70%"
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
                        <TextField
                            variant="outlined"
                            placeholder="Name"
                            fullWidth
                            margin="dense"
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
                            rows={4}
                            margin="dense"
                            InputProps={{
                                style: {
                                    borderRadius: "1.5rem",
                                    background: '#fff',
                                },
                            }}
                            placeholder="Message"
                        />
                        <Button disableElevation variant="contained" endIcon={<KeyboardArrowRightIcon />}
                        sx={{padding:"0.8rem 4rem", background: "#F09300", borderRadius:'1.5rem', marginTop:'1rem'}} >
                            Submit
                        </Button>
                    </div>
                </div>

                <div className="dealers-title">Our Trusted Dealers</div>
                <div className="dealers-content">
                    <div className="dealer-card">
                        <img src={contactPage.images.newYork} alt="New York" className="dealer-image" />
                        <div className="dealer-info">
                            <div className="dealer-name">New York</div>
                            <div className="dealer-address">
                                3164 N Delaware Rd Milan, Indiana(IN), 47031
                                <br />Hotline: +(84) 2500 888 33
                                <br />support@example.com
                            </div>
                            <div className="dealer-hours-title">Working Hours</div>
                            <div className="dealer-hours">
                                Open: 8:00AM - Close: 18:00PM
                                <br />Saturday - Sunday: Close
                            </div>
                        </div>
                    </div>
                    <div className="dealer-card">
                        <img src={contactPage.images.lasVegas} alt="Las Vegas" className="dealer-image" />
                        <div className="dealer-info">
                            <div className="dealer-name">Las Vegas</div>
                            <div className="dealer-address">
                                3164 N Delaware Rd Milan, Indiana(IN), 47031
                                <br />Hotline: +(84) 2500 888 33
                                <br />support@example.com
                            </div>
                            <div className="dealer-hours-title">Working Hours</div>
                            <div className="dealer-hours">
                                Open: 8:00AM - Close: 18:00PM
                                <br />Saturday - Sunday: Close
                            </div>
                        </div>
                    </div>
                    <div className="dealer-card">
                        <img src={contactPage.images.losAngeles} alt="Los Angeles" className="dealer-image" />
                        <div className="dealer-info">
                            <div className="dealer-name">Los Angeles</div>
                            <div className="dealer-address">
                                3164 N Delaware Rd Milan, Indiana(IN), 47031
                                <br />Hotline: +(84) 2500 888 33
                                <br />support@example.com
                            </div>
                            <div className="dealer-hours-title">Working Hours</div>
                            <div className="dealer-hours">
                                Open: 8:00AM - Close: 18:00PM
                                <br />Saturday - Sunday: Close
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "4rem" }}></div>
                <NewsLetter />
                <div style={{ marginTop: "4rem" }}></div>
                <KPI />
            </Container>
        </div>
    );
}
