import "./booksSection.css"
import ShopByEditionCard from "../shopByEditionCard/shopByEditionCard"
import PopularBooks from "../popularBooks/popularBooks"
import ViewAll from "../viewAllButton/viewAll"
import { homePage } from "../../constants/screenData"
import { Button } from "@mui/material"
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
                    <div>
                    <Button sx={{ textTransform:'none', fontSize:{lg:'1rem', xs:'0.7rem'},fontWeight:"bold",  padding:{lg:'0.5rem 2.4rem',xs:'0.4rem 0.3rem'}, background:'#F09300', color:'black', borderRadius:'30px'}}>View All</Button>

                    </div>
                </div>
                <div className="popular">
                        <PopularBooks/>
                </div>
            </div>
        </div>

    )
}