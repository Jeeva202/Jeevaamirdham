import "./booksSection.css"
import ShopByEditionCard from "../shopByEditionCard/shopByEditionCard"
import PopularBooks from "../popularBooks/popularBooks"
import ViewAll from "../viewAllButton/viewAll"
import { homePage } from "../../constants/screenData"
import { useNavigate } from "react-router-dom"
export default function BooksSection({userId, selectedYear, setSelectedYear,allYears, setAllYears}) {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="left-side">
                <div className="subtitle">
                    E-Magazine Edition
                </div>
                <ShopByEditionCard selectedYear={selectedYear} setSelectedYear={setSelectedYear}  allYears={allYears}
                        setAllYears={setAllYears} />
            </div>
            <div className="right-side">
                <div className="subtitle-row">
                    <div className="subtitle">
                        Popular Books
                    </div>
                    {/* <div className="hdivider">
                        <img src={homePage.icons.HorizontalDivider} alt=""/>
                    </div> */}
                    <div className="viewAll">
                        <ViewAll text="View All"  width="7rem" padding="0.8rem 4rem" onClick={()=> navigate('/emagazine')} />
                    </div>
                </div>
                <div className="popular">
                        <PopularBooks userId={userId}                         
                        />
                </div>
            </div>
        </div>

    )
}