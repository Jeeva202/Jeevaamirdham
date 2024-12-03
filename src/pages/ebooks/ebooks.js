import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button } from "@mui/material";
export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [selectedYear, setSelectedYear] = useState(NaN);
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);

    const itemsPerPage = 3; // Items per page for the buy section
    const [currentPage, setCurrentPage] = useState(1);
    const YearWiseEbooks = [
        {
            year: 2024,
            img: "/assets/images/ebook_2024.svg"
        },
        {
            year: 2023,
            img: "/assets/images/ebook_2023.svg"
        },
        {
            year: 2022,
            img: "/assets/images/ebook_2022.svg"
        },
        {
            year: 2021,
            img: "/assets/images/ebook_2021.svg"
        },
        {
            year: 2020,
            img: "/assets/images/ebook_2020.svg"
        },
        {
            year: 2019,
            img: "/assets/images/ebook_2019.svg"
        }, {
            year: 2018,
            img: "/assets/images/ebook_2018.svg"
        }
    ]
    const oneYearBook = [
        { month: "January", img: "/assets/images/ebook_jan.svg" },
        { month: "February", img: "/assets/images/ebook_feb.svg" },
        { month: "March", img: "/assets/images/ebook_mar.svg" },
        { month: "April", img: "/assets/images/ebook_apr.svg" },
        { month: "May", img: "/assets/images/ebook_may.svg" },
        { month: "June", img: "/assets/images/ebook_jun.svg" },
        { month: "July", img: "/assets/images/ebook_jul.svg" },
        { month: "August", img: "/assets/images/ebook_aug.svg" },
        { month: "September", img: "/assets/images/ebook_sep.svg" },
        { month: "October", img: "/assets/images/ebook_oct.svg" },
        { month: "November", img: "/assets/images/ebook_nov.svg" },
        // { month: "December", img: "/assets/images/ebook_dec.svg" },
    ];
    const categories = [
        { id: "GNANAM", label: "GNANAM" },
        { id: "Sithanaigal", label: "SITHANAIGAL" },
        { id: "Varalaru", label: "VARALARU" }
    ];
    const shopBooksData = [
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        },
    ]

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
    const totalPages = Math.ceil(shopBooksData.length / itemsPerPage);
    const currentItems = shopBooksData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const redirectToYearPage = (year) => {
        setSelectedYear(year);
        setAllYears(false);
    };
    const backToAllYearPage = () => {
        setAllYears(true)
    }
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory([...selectedCategory, categoryId]);
    };
    return (
        <Container maxWidth="lg">
            {allYears ? (
                <div className="ebook-section">
                    <div className="ebook">
                        <div className="title">
                            <div className="emagazine">
                                E-Magazine
                            </div>
                            <div className="hdivider">
                                <img src={ebooks.icons.HorizontalDivider} alt="" />
                            </div>
                        </div>
                        <div className="year-wise">
                            {YearWiseEbooks.map((e) => (
                                <div className="year-wrapper">
                                    <img src={e.img} alt="" />
                                    <ViewAll text={e.year} width="10rem" padding={"0.4rem 2rem"} onClick={() => redirectToYearPage(e.year)} />
                                </div>

                            ))}
                        </div>
                    </div>
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
                                                <input type="checkbox" id={category.id} name="checkbox" value={category.id}  />
                                                <label for={category.id}> {category.label}</label>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="buy-section">
                                {currentItems.map((e) => (
                                    <div className="book">
                                        <div className="img-section">
                                            <StyledBadge badgeContent={e.discount}>
                                                <img src={e.img} alt="" />
                                            </StyledBadge>
                                        </div>
                                        <div className="content-section">
                                            <div className="title">{e.title}</div>
                                            <div className="subtitle">{e.subtitle}</div>
                                            <div className="desc">{e.desc}</div>
                                            <div className="price">
                                                {e.offPrice}
                                                <span>{e.orgPrice}</span>
                                            </div>
                                            <Button variant="text" sx={{
                                                borderRadius: "40px",
                                                width: "10rem",
                                                p: "10px",
                                                background: "#F09300",
                                                textTransform: "none",
                                                marginTop: "2rem",
                                                color: "black"
                                            }} >

                                                <img src={ebooks.icons.cart} style={{ width: "1rem" }} />
                                                Add to Cart
                                            </Button>
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
                                                // fontWeight: "bold",
                                                // borderRadius: "50%",
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
                </div>
            )
                : <>
                    <div className="navigation">
                        <a className="back" onClick={() => backToAllYearPage()}>
                            E-MAGAZINE
                        </a>
                        <img src={ebooks.icons.RightArrowStroke} alt="" />
                        <div className="year">
                            {selectedYear}
                        </div>
                    </div>
                    <div className="ebooks-one-year">
                        <div className="month-wise">
                            {oneYearBook.map((e) => (
                                <div className="month-wrapper">
                                    <img src={e.img} alt="" />
                                    <ViewAll text={e.month + " " + selectedYear} width="11rem"
                                    //  onClick={() => redirectToYearPage(e.year)}
                                    />
                                </div>

                            ))}
                        </div>
                    </div>
                </>
            }

        </Container>
    )
}