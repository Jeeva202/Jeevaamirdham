import "./latestnews.css"
import { homePage } from "../../constants/screenData"
import ViewAll from "../viewAllButton/viewAll"
export default function LatestNews(){
    return (
        <div className="latestnews">
            <div className="subtitle-section">
                <div className="subtitle">
                    Latest News
                </div>
                <div className="hdivider">
                    <img src={homePage.icons.HorizontalDivider} alt=""/>
                </div>
                <div className="viewAll">
                    <ViewAll/>
                </div>
            </div>
        </div>
    )
}