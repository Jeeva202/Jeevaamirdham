import "./footer.css"
import logo from "../../assets/images/jeevaamirdhamLogo.svg"
import { Container } from "@mui/material"
import { navBanner } from "../../constants/screenData"
export default function Footer() {
    
    return (
        <div style={{ background: "#282828" }}>
            <Container maxWidth="lg">
            <div className="foot-section">
                <div className="footer">
                    <div className="about">
                        <img src={logo} style={{padding:'1rem 0'}} alt="" srcset="" />
                        <br/>
                        <div className="summary">
                            Who are the Siddhars? What is 
                            ideology? Who are the saints? Who are 
                            the sages? What is Jiva Samadhi? 
                            What is the true spirituality created by the 
                            Siddhas? Every Month more than ten 
                            Siddhas, histories of saints, spiritual 
                            Videos. How can a Guru realize himself 
                            and not wander somewhere in search of 
                            a lost Guru? How to give a clear 
                            ideology in the name of spirituality 
                            without being deceived anywhere?

                        </div>
                    </div>
                    <div className="contact">
                        <div className="title">
                            Need Help
                        </div>
                        <div className="phNumber">
                            +(91) - 9176564723
                        </div>
                        <div className="address">
                            Address: 11/6, Bharathi 4th street, N Usman Rd, <br />
                            T. Nagar, Chennai, Tamil Nadu 600017
                        </div>
                        <a href="">SHOW ON MAP</a>
                        <div className="time">
                            Monday – Saturday: 9:00 am-10:00 pm <br />
                            Sunday: Closed
                        </div>
                        <div className="email">
                            contact@jeevaamirdham.com
                        </div>
                    </div>
                    <div className="explore">
                        <div className="title">
                            Explore
                        </div>
                        <div className="sections">
                            <a href="">Books</a> <br />
                            <a href="">Subscription Plan</a> <br />
                            <a href="">Edition</a> <br />
                            <a href="">Blogs</a> <br />
                            <a href="">Sitemap</a> <br />
                        </div>

                    </div>
                    <div className="service">
                        <div className="title">
                            Our Service
                        </div>
                        <div className="policies">
                            <a href="">Terms & Conditions</a> <br />
                            <a href="">Returns Policy</a> <br />
                            <a href="">Privacy & Policy</a> <br />
                            <a href="">Cancellation policy</a> <br />
                            <a href="">Careers</a> <br />
                        </div>
                    </div>
                    <div className="categ">
                        <div className="title">
                            Book Categories
                        </div>
                        <div className="book-cat">
                            <a href="">Action</a> <br />
                            <a href="">Comedy</a> <br />
                            <a href="">Drama</a> <br />
                            <a href="">Horror</a> <br />
                            <a href="">Kids</a> <br />
                        </div>
                    </div>
                </div>
                <div className="copyright">
            <div className="text">
            Copyright © 2024 <span> Jeevaamirdham </span> . All rights reserved.
            </div>
            <div className="socialmedia">
                <navBanner.icons.facebook sx={{ fontSize: "1rem", fill:"#999999" }} />
                <navBanner.icons.twitter sx={{ fontSize: "1rem", fill:"#999999"  }} />
                <navBanner.icons.instagram sx={{ fontSize: "1rem", fill:"#999999"  }} />
                <img src={navBanner.icons.pinterest} alt="" srcset=""/>
            </div>
        </div>
    </div>
            </Container>
        </div>

    )
}