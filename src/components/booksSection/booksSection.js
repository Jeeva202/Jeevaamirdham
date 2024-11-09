import "./booksSection.css"
import ShopByEditionCard from "../shopByEditionCard/shopByEditionCard"
import PopularBooks from "../popularBooks/popularBooks"
import ViewAll from "../viewAllButton/viewAll"
import { homePage } from "../../constants/screenData"
export default function BooksSection() {
    return (
        <div className="container">
            <div className="left-side">
                <div className="subtitle">
                    Shop by Edition
                </div>
                <ShopByEditionCard />
            </div>
            <div className="right-side">
                <div className="subtitle-row">
                    <div className="subtitle">
                        Popular Books
                    </div>
                    <div className="hdivider">
                        <img src={homePage.icons.HorizontalDivider} alt=""/>
                    </div>
                    <div className="viewAll">
                        <ViewAll/>
                    </div>
                </div>
                <div className="popular">
                        <PopularBooks/>
                </div>
            </div>
        </div>

    )
}