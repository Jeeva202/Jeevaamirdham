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
        <div className="shop-section" style={{ padding: '1rem' }}>
            <div className="title">
                <div className="shop-book" style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#B54708' }}>
                    Shop Books
                </div>
            </div>
            <div className="shopcontent" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="buy-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                    {currentItems.map((e, i) => (
                        <Card className="book-card" key={i} variant="outlined" onClick={() => navigateToProductSpecificPage(i)} style={{ width: '100%', maxWidth: '300px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <div className="img-section" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={e.imgUrl} alt="" className="book-image" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <CardContent className="content-section" style={{ padding: '1rem', width: '100%', paddingBottom: '0', flex: 'none' }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }} >
                                    {e.title}
                                </Typography>
                                <Typography variant="subtitle1" className="subtitle" style={{ fontSize: '1rem', color: '#555', marginBottom: '0.5rem' }}>
                                    {e.subtitle}
                                </Typography>
                                <Typography variant="h6" className="price" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#F09300', marginBottom: '1rem' }}>
                                    ₹{e.offPrice}
                                </Typography>
                                <Button variant="contained" className="buyButton" sx={{ zIndex: '10', width: '100%', background: 'linear-gradient(90deg, #F09300 0%, #FFB800 100%)', color: 'black', textTransform: 'none', fontWeight: 'bold', borderRadius: '40px', padding: '0.5rem 0' }}
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
            <div className="pagination" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
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