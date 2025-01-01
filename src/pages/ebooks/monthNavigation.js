import { ebooks } from "../../constants/screenData"
import ViewAll from "../../components/viewAllButton/viewAll"

export default function MonthNavigation({backToAllYearPage, selectedYear, oneYearBook, redirectToMonthPage}){
    
    return (
        <>
        <div className="Year-navigation">
            <a className="back" onClick={() => backToAllYearPage()}>
                E-MAGAZINE
            </a>
            <img src={ebooks.icons.RightArrowStroke} alt="" />
            <div className="year">
                {selectedYear}
            </div>
        </div>
        <div className="ebooks-one-year">
            <div className="month-wise">
                {oneYearBook.map((e) => (
                    <div className="month-wrapper">
                        <img src={e.img} alt="" />
                        <ViewAll text={e.month + " " + selectedYear} width="11rem"
                            onClick={() => redirectToMonthPage(e.month)}
                        />
                    </div>

                ))}
            </div>
        </div>
    </>
    )
}