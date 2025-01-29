import { ebooks } from "../../constants/screenData";
import { styled } from '@mui/material/styles';
import CartModal from "../../components/cart/cartModal";
import {
    Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button, Typography
} from "@mui/material";
import './buyBook.css';

export default function BuyBook({ categories, handleCategoryClick, currentItems, navigateToProductSpecificPage, totalPages, currentPage, handlePageChange, handleAddToCart, isOpen }) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: "22vw",
            top: "0vh",
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '25px 13px',
            background: "#F09300",
            color: "white",
            borderRadius: "50%",
        },
    }));

    return (
        <div className="shop-section">
            <div className="title">
                <div className="shop-book">
                    Shop Books
                </div>
            </div>
            <div className="shopcontent">
                <div className="buy-section">
                    {currentItems.map((e, i) => (
                        <Card className="book-card" key={i} variant="outlined" onClick={() => navigateToProductSpecificPage(i)}>
                            <div className="img-section">
                                <img src={e.imgUrl} alt="" className="book-image" />
                            </div>
                            <CardContent className="content-section">
                                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }} >
                                    {e.title}
                                </Typography>
                                <Typography variant="subtitle1" className="subtitle">
                                    {e.subtitle}
                                </Typography>
                                {/* <Typography variant="body2" className="desc">
                                    {e.desc}
                                </Typography> */}
                                <Typography variant="h6" className="price">
                                    ₹{e.offPrice}
                                </Typography>
                                <Button variant="contained" className="buyButton" sx={{ zIndex: '10' }}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleAddToCart(e, 1);
                                    }}  >
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>

                    ))}
                    <CartModal open={isOpen} />

                </div>
            </div>
            <div className="pagination">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={0} // Adjust sibling count if needed
                    boundaryCount={1}
                    renderItem={(item) => (
                        <Button
                            variant="text"
                            onClick={() => handlePageChange(null, item.page)}
                            sx={{
                                ...(item.page === currentPage && {
                                    backgroundColor: "#FCCC4D",
                                    color: "#000",
                                }),
                            }}
                            disabled={
                                (item.type === "previous" && currentPage === 1) ||
                                (item.type === "next" && currentPage === totalPages)
                            } // Disable when on first or last page
                        >
                            {item.type === "previous" ? (
                                <>
                                    <img src={ebooks.icons.Previous} alt="Left Arrow" />
                                    Previous
                                </>
                            ) : item.type === "next" ? (
                                <>
                                    Next
                                    <img src={ebooks.icons.Next} alt="Right Arrow" />
                                </>
                            ) : (
                                item.page
                            )}
                        </Button>
                    )}
                />
            </div>
        </div>
    );
}