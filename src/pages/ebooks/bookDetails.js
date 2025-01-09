import { ebooks } from "../../constants/screenData"
import ViewAll from "../../components/viewAllButton/viewAll"
import {Button} from "@mui/material";
import CartModal from "../../components/cart/cartModal";
import { useState } from "react";
export default function BookDetails({backToHomePage, catSelectedBook, shopBooksData, changeBook, handleAddToCart, isOpen}){
    const [quantity, setQuantity] = useState(1)

    const decrease = (x) => {
        if (x != 1) {
            setQuantity(x - 1)
        }
    }
    const increase = (x) => {
        setQuantity(x + 1)
    }
    return (
        <>
        <div className="category-navigation">
            <a className="back" onClick={() => backToHomePage()}>
                Home
            </a>
            <img src={ebooks.icons.RightArrowStroke} alt="" />
            <div className="nav-category" onClick={() => { }}>
                CATEGORY
            </div>
            <img src={ebooks.icons.RightArrowStroke} alt="" />
            <div className="nav-book">
                {shopBooksData[catSelectedBook].title}
            </div>
        </div>
        <div className="categorybook-buysection">
            <div className="book-imagesection">
                <img src={shopBooksData[catSelectedBook].img} alt="" />
            </div>
            <div className="book-contentsection">
                <div className="book-navigator">
                    <div className="stock" style={shopBooksData[catSelectedBook].availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}>
                        {shopBooksData[catSelectedBook].availability}
                    </div>
                    <div className="prev-next">
                        <div className="prev" >
                            <img src={ebooks.icons.Previous} alt="Left Arrow" disabled={catSelectedBook === "0"} onClick={() => changeBook("cat-prev")} />
                            &nbsp;
                            PREV
                        </div>
                        <div className="nxt">

                            NEXT
                            &nbsp;
                            <img src={ebooks.icons.Next} alt="Right Arrow" disabled={parseInt(catSelectedBook) === shopBooksData.length - 1} onClick={() => changeBook("cat-nxt")} />
                        </div>
                    </div>
                </div>
                <div className="title-section">
                    <div className="title">
                        {shopBooksData[catSelectedBook].title}
                    </div>
                    <div className="subtext">
                        <div className="author">
                            Author: {shopBooksData[catSelectedBook].author}
                        </div>
                        <div className="id">
                            {shopBooksData[catSelectedBook].id}
                        </div>
                    </div>
                    <div className="shortdesc">
                        {shopBooksData[catSelectedBook].shortDesc}
                    </div>
                    <div className="category-buy-section">
                        <div className="tab-content">
                            <div className="quantity-select">
                                <div className="count-subscribe">
                                    Quantity
                                    <br />
                                    <br />
                                    <div className="counter">
                                        <span className="decrease" onClick={() => { decrease(quantity) }}> - </span>
                                        &nbsp;
                                        <span className="quantity"> {quantity} </span>
                                        &nbsp;
                                        <span className="increase" onClick={() => { increase(quantity) }}> + </span>
                                    </div>
                                </div>
                                <Button variant="text" sx={{
                                    borderRadius: "40px",
                                    width: "10rem",
                                    p: "10px",
                                    background: "#F09300",
                                    textTransform: "none",
                                    marginTop: "2rem",
                                    color: "#ffffff",
                                    fontWeight: "700",
                                    justifyContent: "space-evenly"
                                }} onClick={handleAddToCart}>

                                    <img src={ebooks.icons.cart} style={{ width: "1rem", height: "1.5rem", filter: "invert(100%)" }} />
                                    Add to cart
                                </Button>
                                <CartModal open={isOpen} />
                            </div>

                            <div className="cat-tag">
                                Categories: {shopBooksData[catSelectedBook].category_tag}
                                <br></br>
                                Tags: {shopBooksData[catSelectedBook].tag}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="desc-info">
            <div className="desc-info-tabs">
                <button
                    className={`tab-underscore active`}
                >
                    Description
                </button>
            </div>

            <div className="desc-tab-content">
                    <div className="desc">
                        {shopBooksData[catSelectedBook].desc}
                    </div>
            </div>

        </div>
        <div className="otherbooks">
            <div className="otherbooks-title">
                <div className="text">
                    Related products
                </div>
                <div className="hdivider">
                    <img src={ebooks.icons.HorizontalDivider} alt="" />
                </div>
            </div>
            <div className="book-cards">
                {shopBooksData.map((e, i) => {

                    if (i != catSelectedBook) {
                        return (

                            <div className="cat-book-card" onClick={(e) => changeBook(i, "catgeorypage")}>
                                <img src={e.img} alt="" />
                                <div className="text">
                                    {e.title}
                                    <br />
                                    {e.author}
                                </div>
                                <button className="read-now" value={i} >{e.offPrice}</button>
                            </div>

                        )
                    }
                })}
            </div>
        </div>
    </>
    )
}