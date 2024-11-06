import "./footer.css"
import logo from "../../assets/images/jeevaamirdhamLogo.svg"
import { Container } from "@mui/material"
export default function Footer() {
    return (
        <div style={{ background: "#282828" }}>
            <Container maxWidth="lg">

                <div className="footer">
                    <div className="about">
                        <img src={logo} alt="" srcset="" />
                        <div className="summary">
                            Who are the Siddhars? What is <br />
                            ideology? Who are the saints? Who are <br />
                            the sages? What is Jiva Samadhi? <br />
                            What is the true spirituality created by the <br />
                            Siddhas? Every Month more than ten <br />
                            Siddhas, histories of saints, spiritual <br />
                            Videos. How can a Guru realize himself <br />
                            and not wander somewhere in search of <br />
                            a lost Guru? How to give a clear <br />
                            ideology in the name of spirituality <br />
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
            </Container>
        </div>

    )
}