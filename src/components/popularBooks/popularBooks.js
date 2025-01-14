import "./popularBooks.css"
import BuyBotton from "../buyButton/buyButton"
import { Button } from "@mui/material"
export default function PopularBooks(){
    const top2Books = [
        {
            img: "/assets/images/Gnana_Amirtham.png",
            title: "Gnana Amirtham",
            desc: "Siddharth Thoughts",
            cost: "450"
        },
        {
            img: "/assets/images/Jeeva_Amirtham.png",
            title: "Jeeva Amirtham",
            desc: "Siddharth Thoughts",
            cost: "250"
        }
    ]
    return(
        <div className="book-cards">
        {top2Books.map((book) => (
            <div className="card">
                <div className="image">
                    <img style={{ width: "100%" }} src={book.img} alt="" srcset="" />
                </div>
                <div className="content">
                    <div className="title">
                        {book.title}
                    </div>
                    <div className="desc">
                        {book.desc}
                    </div>
                    <div className="cost">
                        ₹ {book.cost}
                    </div>
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button sx={{fontSize:{lg:'1rem', xs:'0.8rem'},fontWeight:"bold",  padding:{lg:'0.4rem 0.3rem'}, background:'#F09300', color:'black', borderRadius:'30px', width:'90%'}}>Buy Now</Button>
                </div>
                
            </div>
        ))}
            </div>
    )
}