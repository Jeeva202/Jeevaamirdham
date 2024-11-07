import BooksSection from "../../components/booksSection/booksSection"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
import PranavamTV from "../../components/pranavam_tv/pranavamtv"
import Footer from "../../components/footer/footer"
import "./homepage.css"
import { Container } from "@mui/material"
import Playstore from "../../components/playstore/playstore"
export default function HomePage() {

    return (
        <Container maxWidth="lg">

            <div className="Container">
                <div className="NavBar">

                </div>
                <div className="PopBooks">
                    <BooksSection />
                </div>
                <div className="YouTube">
                    <PranavamTV/>
                </div>
                <div className="News">

                </div>
                <div className="playStore">
                    <Playstore/>
                </div>

                <NewsLetter />
                <KPI />

            </div>
        </Container>

    )
}