import BooksSection from "../../components/booksSection/booksSection"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
import Footer from "../../components/footer/footer"
import "./homepage.css"
import PranavamTV from "../../components/pranavam_tv/pranavamtv"
export default function HomePage(){

    return (
        <div className="Container">
            <div className="NavBar">
            
            </div>
            <div className="PopBooks">
                <BooksSection/>
            </div> 
            <div className="YouTube">
            <PranavamTV/>
            </div>
            <div className="News">
            
            </div>
            <div className="playStore">

            </div>  
            <div className="newsletter">
                <NewsLetter/>

            </div>
            <div className="kpi">
            <KPI/>

            </div>
            <div className="ft">
            <Footer/>

            </div>
        </div>

    )
}