import "./popularBooks.css"
import BuyBotton from "../buyButton/buyButton"
import { useQuery } from "react-query"
import axios from "axios";
import { setCartDetails, openCart, selectIsCartOpen, setBooksData } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartModal from "../cart/cartModal";
import { Loader } from "../loader/loader";
import { useEffect } from "react";
import { Button } from "@mui/material"
import { selectIsUserLoggedIn, selectCartDetails } from "../../redux/cartSlice";
export default function PopularBooks({ userId }) {
    const dispatch = useDispatch()
    const isOpen = useSelector(selectIsCartOpen)
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    const cartDetails = useSelector(selectCartDetails)
    const { data: booksData, error: booksError, isLoading: isBooksLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL+"/ebooks/books");
            const filteredBooks = data.slice(0, 2);

            return filteredBooks;
        },
    });

    useEffect(() => {
        if (booksData) {
            dispatch(setBooksData(booksData)); // Store booksData in Redux
        }
    }, [booksData]);
    const handleAddToCart = async (book, quantity) => {
        if(isUserLoggedIn){
            console.log("user id", userId);
            // const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
                const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
    
                userId: userId,
                book: book.id,
                quantity: quantity
            });
            const cartDetails = addtocart.data.cart_details;
    
            console.log(addtocart, "Buy Now");
    
            // Dispatch an action to update the Redux store with the updated cart details
            dispatch(setCartDetails(cartDetails)); // This will update the cartDetails in Redux
        }
        else{
            dispatch(setCartDetails([...cartDetails, {book_id:book.id, quantity: quantity || 1}]))
        }

        dispatch(openCart()); // Open the cart modal
    };

    if (isBooksLoading) {
        return <Loader />
    }
    return (
        <div className="book-cards">
            {booksData.map((book) => (
                <div className="card">
                    <div className="image">
                        <img style={{ width: "100%" }} src={book.imgUrl} alt="" srcset="" />
                    </div>
                    <div className="content">
                        <div className="title">
                            {book.title}
                        </div>
                        <div className="desc">
                            {book.desc}
                        </div>
                        <div className="cost">
                            ₹ {book.offPrice}
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button sx={{
                            fontSize: { lg: '1rem', xs: '0.8rem' },
                            fontWeight: "bold",
                            padding: { lg: '0.4rem 0.3rem' },
                            background: 'linear-gradient(90deg, #F09300 0%, #FFB800 100%)', // Fixed closing parenthesis
                            color: '#121212',
                            borderRadius: '30px', width: '90%'
                        }} onClick={() => handleAddToCart(book, 1)}>Buy Now</Button>
                    </div>

                </div>
            ))}
            <CartModal open={isOpen} />
        </div>
    )
}