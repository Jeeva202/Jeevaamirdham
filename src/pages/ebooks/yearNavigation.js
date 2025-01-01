import { ebooks } from "../../constants/screenData"
import ViewAll from "../../components/viewAllButton/viewAll"
export default function YearNavigation({redirectToYearPage, books}){
    
    return (
        <div className="ebook">
            <div className="title">
                <div className="emagazine">
                    E-Magazine
                </div> 
                <div className="hdivider">
                    <img src={ebooks.icons.HorizontalDivider} alt="" />
                </div>
            </div>
            <div className="year-wise">
                {books.map((e) => (
                    <div className="year-wrapper">
                        <img src={e.img} alt="" />
                        <ViewAll text={e.year} width="10rem" padding={"0.4rem 2rem"} onClick={() => redirectToYearPage(e.year)} />
                    </div>
    
                ))}
            </div>
        </div>
    )
}
