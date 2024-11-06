import BooksSection from "../../components/booksSection/booksSection"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
import Footer from "../../components/footer/footer"
import "./homepage.css"
export default function HomePage(){

    return (
        <div className="Container">
            <div className="NavBar">
            
            </div>
            <div className="PopBooks">
                <BooksSection/>
            </div> 
            <div className="YouTube">
            
            </div>
            <div className="News">
            
            </div>
            <div className="playStore">

            </div>  

            <NewsLetter/>
            <KPI/>
        </div>

    )
}