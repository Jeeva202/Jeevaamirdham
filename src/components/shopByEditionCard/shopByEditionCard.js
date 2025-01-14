import "./shopByEditionCard.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
export default function ShopByEditionCard({selectedYear, setSelectedYear}){
    const Cards = [
        {
            year:2018,
            img:"/assets/images/2018.png"
        },
        {
            year:2019,
            img:"/assets/images/2019.png"
        },
        {
            year:2020,
            img:"/assets/images/2020.png"
        },
        {
            year:2021,
            img:"/assets/images/2021.png"
        },
        {
            year:2022,
            img:"/assets/images/2022.png"
        },
        {
            year:2023,
            img:"/assets/images/2023.png"
        }
    ]
    const navigate = useNavigate()
    const handleOnClick = (year) =>{
        navigate("/emagazine");
        setSelectedYear(year)
    }
    return(
        <div className="Cards">
            {Cards.map((e)=>(
                <div className="card">
                    <div className="card-img">
                        <img style={{width:"100%",height:"100%"}}src={e.img} alt="" srcset="" />
                    </div>
                    <a className="card-text" >
                        <p onClick={()=>handleOnClick(e.year)}>View {e.year} Edition </p>
                        <KeyboardArrowRightIcon/>
                    </a>
                </div>
            ))}
        </div>
    )
}