import { ebooks } from "../../constants/screenData";
import ViewAll from "../../components/viewAllButton/viewAll";
import { Button } from "@mui/material";
import CartModal from "../../components/cart/cartModal";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import Gif_Loader from "../../components/loader/Gif_Loader";

export default function BookDetails({ backToHomePage, booksData, catSelectedBook, changeBook, handleAddToCart, isOpen }) {
    const [quantity, setQuantity] = useState(1);
    console.log("catselect", catSelectedBook);
    const bookId = parseInt(catSelectedBook) + 1

    // Scroll to the top of the page when the component rerenders
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                margin: '0 2rem'
            }}>
                <a style={{
                    cursor: 'pointer',
                    color: '#F09300',
                    textDecoration: 'none'
                }} onClick={() => backToHomePage()}>
                    Home
                </a>
                <img src={ebooks.icons.RightArrowStroke} alt="" style={{ width: '0.8rem' }} />
                <div style={{ color: '#666' }}>CATEGORY</div>
                <img src={ebooks.icons.RightArrowStroke} alt="" style={{ width: '0.8rem' }} />
                <div style={{ color: '#333', fontWeight: '500' }}>{bookInfoData.title}</div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
                gap: '2rem',
                padding: '2rem',
                margin: '1rem 2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={bookInfoData.imgUrl} alt="" style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px'
                    }} />
                </div>

                <div style={{ padding: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        <div
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                backgroundColor: bookInfoData.availability === "IN STOCK" ? "#24FF0033" : "red",
                                color: bookInfoData.availability === "IN STOCK" ? "#008000" : "#fff"
                            }}
                        >
                            {bookInfoData.availability}
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>
                                <img
                                    src={ebooks.icons.Previous}
                                    alt="Left Arrow"
                                    style={{ opacity: catSelectedBook === "0" ? 0.5 : 1 }}
                                    onClick={() => changeBook("cat-prev")}
                                />
                                <span style={{ marginLeft: '0.5rem' }}>PREV</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>
                                <span style={{ marginRight: '0.5rem' }}>NEXT</span>
                                <img
                                    src={ebooks.icons.Next}
                                    alt="Right Arrow"
                                    onClick={() => changeBook("cat-nxt")}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: '600',
                            marginBottom: '1rem'
                        }}>{bookInfoData.title}</div>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            color: '#666',
                            marginBottom: '1rem'
                        }}>
                            <div>Author: {bookInfoData.author}</div>
                        </div>
                        <div style={{
                            color: '#444',
                            lineHeight: '1.6',
                            marginBottom: '2rem'
                        }}>{bookInfoData.shortdesc}</div>
                        <div>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem'
                                }}>
                                    <div style={{
                                        padding: '1rem',
                                        borderRadius: '8px'
                                    }}>
                                        <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Quantity</div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <span onClick={() => decrease(quantity)} style={{
                                                cursor: 'pointer',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#fff',
                                                borderRadius: '4px'
                                            }}>-</span>
                                            <span>{quantity}</span>
                                            <span onClick={() => increase(quantity)} style={{
                                                cursor: 'pointer',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#fff',
                                                borderRadius: '4px'
                                            }}>+</span>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                margin: '2rem',
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div>
                    <button style={{
                        borderBottom: '2px solid #F09300',
                        border:'none',
                        background:'none',
                        paddingBottom: '0.5rem',
                        marginBottom: '1rem',
                        fontSize:'1.3rem',
                        fontWeight:'bold',
                        paddingLeft:'0'
                    }}>Description</button>
                </div>

                <div>
                    <div style={{
                        lineHeight: '1.8',
                        color: '#444'
                    }}>{bookInfoData.description}</div>
                </div>
            </div>
            <div style={{
                padding: '2rem'
            }}>
            <div style={{
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    textAlign:'left'
                }}>
                    Related products
                </div>

            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '2rem',
                padding: '1rem'
            }}>
                {booksData.map((e, i) => {

                    if (i != catSelectedBook) {
                        return (

                            <div key={i} style={{
                                cursor: 'pointer',
                                padding: '1rem',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)'
                                }
                            }} onClick={(e) => changeBook(i, "catgeorypage")}>
                                <img src={e.imgUrl} alt="" style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '4px',
                                    marginBottom: '1rem'
                                }} />
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{e.title}</h3>
                                    <p style={{ color: '#666' }}>{e.author}</p>
                                </div>
                                <div style={{
                                    textAlign: 'center',
                                    color: '#F09300',
                                    fontWeight: '600'
                                }}>₹ {e.offPrice}</div>
                            </div>

                        )
                    }
                })}
            </div>
        </div>
        </>
    );
}
