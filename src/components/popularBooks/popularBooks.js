import "./popularBooks.css"
import BuyBotton from "../buyButton/buyButton"
import { useQuery } from "react-query"
import axios from "axios";
import { setCartDetails, openCart,selectIsCartOpen } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import CartModal from "../cart/cartModal";
import { Loader } from "../loader/loader";
import { Button } from "@mui/material"
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
    const handleAddToCart = async (book, quantity) => {
        console.log("user id", userId);

        const addtocart = await axios.post('http://localhost:3001/ebooks/add_to_cart', {
            userId: userId,
            book: book.id,
            quantity: quantity
        });
        const cartDetails = addtocart.data.cart_details;

        console.log(addtocart, "add to cart");

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
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button sx={{
                        fontSize:{lg:'1rem', xs:'0.8rem'},
                        fontWeight:"bold",  
                        padding:{lg:'0.4rem 0.3rem'}, 
                        background:'#F09300', color:'black', 
                        borderRadius:'30px', width:'90%'}} onclick={()=>handleAddToCart(book, 1)}>Buy Now</Button>
                </div>
                
            </div>
        ))}
        <CartModal open={isOpen} />
            </div>
    )
}