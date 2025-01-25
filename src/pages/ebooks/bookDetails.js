import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
import { Button } from "@mui/material";
import CartModal from "../../components/cart/cartModal";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import Gif_Loader from "../../components/loader/Gif_Loader";

export default function BookDetails({ backToHomePage, booksData, catSelectedBook, changeBook, handleAddToCart, isOpen }) {
    const [quantity, setQuantity] = useState(1);
    console.log("catselect", catSelectedBook);
    const bookId = parseInt(catSelectedBook) + 1
    // Fetch book information using React Query
    const { data: bookInfoData, error: bookInfoError, isLoading: isBookInfoLoading } = useQuery(
        ["book-info", bookId],
        async () => {
            if (!bookId) {
                return null; // If no book is selected, return null or handle accordingly
            }
            const { data } = await axios.get(process.env.REACT_APP_URL + `/ebooks/book-info?id=${bookId}`);
            return data;
        },
        {
            enabled: !!bookId, // Only run the query if `bookId` has a valid value
        }
    );

    // Debugging: Log API response or errors
    if (isBookInfoLoading) {
        // return <Loader/>
        return <Gif_Loader />;
    }

    if (bookInfoError) {
        console.error("Error fetching book info:", bookInfoError);
    }

    if (bookInfoData) {
        console.log("Fetched book info:", bookInfoData);
    }

    // Quantity update functions
    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // Render the component once book info is loaded
    if (isBookInfoLoading) {
        return <div>Loading...</div>; // You can show a loading spinner or placeholder here
    }

    if (!bookInfoData) {
        return <div>No book data available</div>;
    }

    return (
        <>
            <div className="category-navigation">
                <a className="back" onClick={() => backToHomePage()}>
                    Home
                </a>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-category">CATEGORY</div>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-book">{bookInfoData.title}</div>
            </div>
            <div className="categorybook-buysection">
                <div className="book-imagesection">
                    <img src={bookInfoData.imgUrl} alt="" />
                </div>
                <div className="book-contentsection">
                    <div className="book-navigator">
                        <div
                            className="stock"
                            style={bookInfoData.availability === "IN STOCK" ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}
                        >
                            {bookInfoData.availability}
                        </div>
                        <div className="prev-next">
                            <div className="prev">
                                <img
                                    src={ebooks.icons.Previous}
                                    alt="Left Arrow"
                                    disabled={catSelectedBook === "0"}
                                    onClick={() => changeBook("cat-prev")}
                                />
                                &nbsp; PREV
                            </div>
                            <div className="nxt">
                                NEXT
                                &nbsp;
                                <img
                                    src={ebooks.icons.Next}
                                    alt="Right Arrow"
                                    disabled={parseInt(catSelectedBook) === bookInfoData.length - 1}
                                    onClick={() => changeBook("cat-nxt")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="title-section">
                        <div className="title">{bookInfoData.title}</div>
                        <div className="subtext">
                            <div className="author">Author: {bookInfoData.author}</div>
                            {/* <div className="id">{bookInfoData.id}</div> */}
                        </div>
                        <div className="shortdesc">{bookInfoData.shortdesc}</div>
                        <div className="category-buy-section">
                            <div className="tab-content">
                                <div className="quantity-select">
                                    <div className="count-subscribe">
                                        Quantity
                                        <br />
                                        <br />
                                        <div className="counter">
                                            <span className="decrease" onClick={() => decrease(quantity)}>
                                                {" "}
                                                -{" "}
                                            </span>
                                            &nbsp;
                                            <span className="quantity"> {quantity} </span>
                                            &nbsp;
                                            <span className="increase" onClick={() => increase(quantity)}>
                                                {" "}
                                                +{" "}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="text"
                                        sx={{
                                            borderRadius: "40px",
                                            width: "10rem",
                                            p: "10px",
                                            background: "#F09300",
                                            textTransform: "none",
                                            marginTop: "2rem",
                                            color: "#ffffff",
                                            fontWeight: "700",
                                            justifyContent: "space-evenly",
                                        }}
                                        onClick={()=>handleAddToCart(bookInfoData, quantity)}
                                    >
                                        <img src={ebooks.icons.cart} style={{ width: "1rem", height: "1.5rem", filter: "invert(100%)" }} />
                                        Buy Now
                                    </Button>
                                    <CartModal open={isOpen} />
                                </div>
{/* 
                                <div className="cat-tag">
                                    Categories: {bookInfoData.category_tag}
                                    <br />
                                    Tags: {bookInfoData.tag}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="desc-info">
                <div className="desc-info-tabs">
                    <button className={`tab-underscore active`}>Description</button>
                </div>

                <div className="desc-tab-content">
                    <div className="desc">{bookInfoData.description}</div>
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
                {booksData.map((e, i) => {

                    if (i != catSelectedBook) {
                        return (

                            <div className="cat-book-card" onClick={(e) => changeBook(i, "catgeorypage")}>
                                <img src={e.imgUrl} alt="" />
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
    );
}
