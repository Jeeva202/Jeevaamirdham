import "./popularBooks.css"
import BuyBotton from "../buyButton/buyButton"
import { useQuery } from "react-query"
import axios from "axios";
import { setCartDetails, openCart,selectIsCartOpen, setBooksData } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartModal from "../cart/cartModal";
import { Loader } from "../loader/loader";
import { useEffect } from "react";
export default function PopularBooks({userId}){
        const dispatch = useDispatch()
        const isOpen = useSelector(selectIsCartOpen)
    const { data: booksData, error: booksError, isLoading: isBooksLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3001/ebooks/books");
            const filteredBooks = data.slice(0, 2); 
            
            return filteredBooks;
        },
    });

        useEffect(() => {
            if (booksData) {
                dispatch(setBooksData(booksData)); // Store booksData in Redux
            }
        }, [booksData, dispatch]);
    const handleAddToCart = async (book, quantity) => {
        console.log("user id", userId);

        const addtocart = await axios.post('http://localhost:3001/ebooks/add_to_cart', {
            userId: userId,
            book: book.id,
            quantity: quantity
        });
        const cartDetails = addtocart.data.cart_details;

        console.log(addtocart, "Buy Now");

        // Dispatch an action to update the Redux store with the updated cart details
        dispatch(setCartDetails(cartDetails)); // This will update the cartDetails in Redux
        dispatch(openCart()); // Open the cart modal
    };

    if(isBooksLoading){
       return <Loader/>
    }
    return(
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
                <div className="buyButton">
                    <BuyBotton onclick={()=>handleAddToCart(book, 1)}/>
                </div>
            </div>
        ))}
        <CartModal open={isOpen} />
            </div>
    )
}