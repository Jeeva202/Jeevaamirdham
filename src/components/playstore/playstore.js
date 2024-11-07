import "./playstore.css"
import { homePage } from "../../constants/screenData"
export default function Playstore(){
    function redirectToPlaystore(){
        window.location.href = "/"
    }
    return(
        <img className="banner" src={homePage.images.playstore} onClick={redirectToPlaystore} alt=""/>
    )
}