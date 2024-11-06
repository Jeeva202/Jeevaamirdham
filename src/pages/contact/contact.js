import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button } from '@mui/material';
import { contactPage } from '../../constants/screenData';
import NewsLetter from '../../components/newsLetter/newsletter'
import KPI from '../../components/kpi/kpi'

export default function Contact() {
    return (
        <div style={{ background: "#F9E2BE" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "6rem", paddingBottom: "3rem" }}>Contact</div>
            <div style={{
                display: "flex", flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "center",
                gap:"3rem"
            }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8301729415803!2d80.23217087460496!3d13.049016613177185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674d61d3ce11%3A0x62436121c6973052!2sJeevaAmirdham!5e1!3m2!1sen!2sin!4v1730838902257!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Map"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "left" }}>We Would Love To Hear From You</div>
                    <div style={{ fontSize: "0.8rem", textAlign: "left" }}>Your email address will not be published. Required fields are marked *</div>
                    <input type="text" name="" id="" placeholder="Name*" style={{
                        borderRadius: "50px",
                        padding: "1rem 2rem",
                        width: "95%",
                        border: "none",
                        marginTop: "1rem"
                    }} />
                    <input type="text" name="" id="" placeholder="Email*" style={{
                        borderRadius: "50px",
                        padding: "1rem 2rem",
                        width: "95%",
                        border: "none",
                        marginTop: "1rem"
                    }} />
                    <textarea rows={5} type="text" name="" id="" placeholder="Message*" style={{
                        borderRadius: "30px",
                        padding: "1rem 2rem",
                        width: "95%",
                        border: "none",
                        marginTop: "1rem"
                    }} />

                    <Button disableElevation variant="contained" endIcon={<KeyboardArrowRightIcon />} sx={{ borderRadius: "40px", p: "0.8rem 4rem", width: "7rem", background: "#F09300", textTransform: "none", marginTop: "2rem" }}>Submit</Button>
                </div>
            </div>

            <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", paddingTop: "6rem", paddingBottom: "3rem" }}>Our Trusted Dealers</div>
            <div style={{ display: "flex", justifyContent:"space-between" }}>
                <div>
                    <img src={contactPage.images.newYork} alt="las vegas" style={{ borderRadius: "8px", width: "20rem", height: "10rem" }} />
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ fontSize: "1.2rem", marginTop: "2rem", fontWeight: "bold", color: "#000" }}>New York</div>
                        <div style={{ fontSize: "0.8rem", marginTop: "2rem", color: "#444", lineHeight: "1.5rem" }}>
                            3164 N Delaware Rd Milan, Indiana(IN), 47031
                            <br />Hotline: +(84) 2500 888 33
                            <br />support@example.com
                        </div>
                        <div style={{ fontSize: "1.2rem", margin: "2rem 0", fontWeight: "bold", color: "#000" }}>
                            Working Hours
                        </div>
                        <div style={{ fontSize: "0.8rem", margin: "2rem 0", color: "#444", lineHeight: "1.5rem" }}>
                            Open: 8:00AM - Close: 18:00PM
                            <br />Saturday - Sunday: Close
                        </div>
                    </div>
                </div>
                <div>
                    <img src={contactPage.images.lasVegas} alt="las vegas" style={{ borderRadius: "8px", width: "20rem", height: "10rem" }} />
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ fontSize: "1.2rem", marginTop: "2rem", fontWeight: "bold", color: "#000" }}>New York</div>
                        <div style={{ fontSize: "0.8rem", marginTop: "2rem", color: "#444", lineHeight: "1.5rem" }}>
                            3164 N Delaware Rd Milan, Indiana(IN), 47031
                            <br />Hotline: +(84) 2500 888 33
                            <br />support@example.com
                        </div>
                        <div style={{ fontSize: "1.2rem", margin: "2rem 0", fontWeight: "bold", color: "#000" }}>
                            Working Hours
                        </div>
                        <div style={{ fontSize: "0.8rem", margin: "2rem 0", color: "#444", lineHeight: "1.5rem" }}>
                            Open: 8:00AM - Close: 18:00PM
                            <br />Saturday - Sunday: Close
                        </div>
                    </div>
                </div>
                <div>
                    <img src={contactPage.images.losAngeles} alt="las vegas" style={{ borderRadius: "8px", width: "20rem", height: "10rem" }} />
                    <div style={{ marginTop: "1rem" }}>
                        <div style={{ fontSize: "1.2rem", marginTop: "2rem", fontWeight: "bold", color: "#000" }}>New York</div>
                        <div style={{ fontSize: "0.8rem", marginTop: "2rem", color: "#444", lineHeight: "1.5rem" }}>
                            3164 N Delaware Rd Milan, Indiana(IN), 47031
                            <br />Hotline: +(84) 2500 888 33
                            <br />support@example.com
                        </div>
                        <div style={{ fontSize: "1.2rem", margin: "2rem 0", fontWeight: "bold", color: "#000" }}>
                            Working Hours
                        </div>
                        <div style={{ fontSize: "0.8rem", margin: "2rem 0", color: "#444", lineHeight: "1.5rem" }}>
                            Open: 8:00AM - Close: 18:00PM
                            <br />Saturday - Sunday: Close
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop:"4rem"}}></div>
            <NewsLetter/>
            <div style={{marginTop:"4rem"}}></div>
            <KPI/>
        </div>

    )
}
