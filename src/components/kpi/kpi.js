import "./kpi.css"
import { navBanner } from '../../constants/screenData'
// import navBanner from "../../constants/screenData"

// import phoneIcon from '../../assets/icons/phonecall.svg'
// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import traslateIcon from '../../assets/icons/engToTamil.svg'
// import Cart from "../../assets/icons/cart.svg"
// import Emoji from "../../assets/icons/emoji.svg"
// import Book from "../../assets/icons/book.svg"
// const navBanner = {
//     icons: {
//         phone: phoneIcon,
//         facebook: FacebookOutlinedIcon,
//         instagram: InstagramIcon,
//         twitter: TwitterIcon,
//         traslate: traslateIcon,
//         Cart,
//         Emoji,
//         Book
//     }
// }
export default function KPI() {
    const KPIs = {
        total_books: "15,254",
        books_sold: "7,589",
        happy_customers: "97%"
    }
    return (
        <div className="kpis">
            <div className="total-books">
                <img src={navBanner.Book} alt="" srcset="" />
                <div className="kpi">
                    <div className="number">
                        {KPIs.total_books}
                    </div>
                    <div className="text">
                        TOTAL BOOKS
                    </div>
                </div>
            </div>
            <div className="books-sold">
                <img src={navBanner.Cart} alt="" srcset="" />
                <div className="kpi">
                    <div className="number">
                        {KPIs.books_sold}
                    </div>

                    <div className="text">BOOKS SOLD</div>
                </div>
            </div>
            <div className="happy-customers">
                <img src={navBanner.Emoji} alt="" srcset="" />
                <div className="kpi">
                    <div className="number">
                    {KPIs.happy_customers}
                    </div>

                    <div className="text">HAPPY CUSTOMERS</div>
                </div>
            </div>
        </div>


    )
}