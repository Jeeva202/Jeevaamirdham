import "./booksSection.css"
import ShopByEditionCard from "../shopByEditionCard/shopByEditionCard"


export default function BooksSection(){
    return (
        <div className="container">
            <div className="edition">
                <div className="subtitle">
                    Shop by Edition
                </div>
                <div className="edtion-cards">
                    <ShopByEditionCard/>
                </div>
            </div>
            {/* <div className="popular">
                <div className="subtitle">
                    Popular Books
                </div>
                <div className="book-cards">

                </div>
            </div>
            <div className="view-all">

            </div> */}
        </div>
 
    )
}