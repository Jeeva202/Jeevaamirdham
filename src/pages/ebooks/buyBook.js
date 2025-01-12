import { ebooks } from "../../constants/screenData"
import { styled } from '@mui/material/styles';
import CartModal from "../../components/cart/cartModal";
import {
    Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button
} from "@mui/material";
export default function BuyBook({categories, handleCategoryClick, currentItems, navigateToProductSpecificPage, totalPages, currentPage, handlePageChange, handleAddToCart, isOpen }){
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
            <div className="hdivider">
                <img src={ebooks.icons.HorizontalDivider} alt="" />
            </div>
        </div>
        <div className="shopcontent">
            <div className="genre">
                <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                    <CardHeader
                        title="Genre"
                        titleTypographyProps={{
                            variant: "h6",
                            align: "left",
                            sx: { fontFamily: "Sora, sans-serif", fontSize: "1.2rem", fontWeight: 600 }
                        }}
                        sx={{ paddingBottom: 0 }}
                    />
                    <Divider />
                    <CardContent className="categ-content" sx={{ paddingTop: 2 }}>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="categ"
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <input type="checkbox" id={category.id} name="checkbox" value={category.id} />
                                <label for={category.id}> {category.label}</label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="buy-section">
                {currentItems.map((e, i) => (
                    <div className="book">
                        <div className="img-section">
                            {/* <StyledBadge badgeContent={e.discount}> */}
                                <img src={e.imgUrl} alt="" />
                            {/* </StyledBadge> */}
                        </div>
                        <div className="content-section">
                            <div className="title" onClick={() => navigateToProductSpecificPage(i)}>{e.title}</div>
                            <div className="subtitle">{e.subtitle}</div>
                            <div className="desc">{e.desc}</div>
                            <div className="price">
                            ₹{e.offPrice}
                                {/* <span>{e.orgPrice}</span> */}
                            </div>
                            <Button variant="text" sx={{
                                borderRadius: "40px",
                                width: "10rem",
                                p: "10px",
                                background: "#F09300",
                                textTransform: "none",
                                marginTop: "2rem",
                                color: "black"
                            }} onClick={()=>handleAddToCart(e, 1)}>

                                <img src={ebooks.icons.cart} style={{ width: "1rem" }} />
                                Add to Cart
                            </Button>
                            <CartModal open={isOpen} />
                        </div>
                    </div>

                ))}

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
                                color: "#7F56D9",
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
    )
}