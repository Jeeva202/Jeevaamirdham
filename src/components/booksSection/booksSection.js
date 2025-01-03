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
                    E-Magazine Edition
                </div>
                <ShopByEditionCard />
            </div>
            <div className="right-side">
                <div className="subtitle-row">
                    <div className="subtitle">
                        Popular Books
                    </div>
                    {/* <div className="hdivider">
                        <img src={homePage.icons.HorizontalDivider} alt=""/>
                    </div> */}
                    <div style={{borderBottom:"1px solid #e6e6e6", width:"90%"}}></div>
                    <div className="viewAll">
                        <ViewAll text="View All"  width="7rem" padding="0.8rem 4rem" />
                    </div>
                </div>
                <div className="popular">
                        <PopularBooks/>
                </div>
            </div>
        </div>

    )
}