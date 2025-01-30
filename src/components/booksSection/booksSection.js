import "./booksSection.css"
import ShopByEditionCard from "../shopByEditionCard/shopByEditionCard"
import PopularBooks from "../popularBooks/popularBooks"
import ViewAll from "../viewAllButton/viewAll"
import { homePage } from "../../constants/screenData"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
export default function BooksSection({userId, selectedYear, setSelectedYear,allYears, setAllYears, setSelectedMonth}) {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="left-side">
                <div className="subtitle">
                    E-Magazine Edition
                </div>
                <ShopByEditionCard selectedYear={selectedYear} setSelectedYear={setSelectedYear}  allYears={allYears} setSelectedMonth={setSelectedMonth} setAllYears={setAllYears} />
            </div>
            <div className="right-side">
                <div className="subtitle-row">
                    <div className="subtitle">
                        Popular Books
                    </div>
                    <div>
                    <Button sx={{ 
                        textTransform:'none', 
                        fontSize:{lg:'1rem', xs:'0.7rem'},
                        fontWeight:"bold",  
                        padding:{lg:'0.5rem 2.4rem',xs:'0.4rem 0.3rem'}, 
                        background:'#F09300', color:'black', borderRadius:'30px'}}
                        onClick={()=> navigate('/emagazine')}>View All</Button>

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