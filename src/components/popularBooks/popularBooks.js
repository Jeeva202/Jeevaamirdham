import "./popularBooks.css"
import BuyBotton from "../buyButton/buyButton"
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
                <div className="buyButton">
                    <BuyBotton />
                </div>
            </div>
        ))}
            </div>
    )
}