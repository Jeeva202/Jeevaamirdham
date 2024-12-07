import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button, Tabs, Tab, Box } from "@mui/material";
export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [selectedYear, setSelectedYear] = useState(NaN);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);
    const [activeTab, setActiveTab] = useState("AUDIO");
    const [periodTab, setPeriodTab] = useState("MONTHLY")
    const itemsPerPage = 3; // Items per page for the buy section
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfYear, setNoOfYear] = useState(1);
    const [noOfMonth, setNoOfMonth] = useState(1)
    const [quantity, setQuantity] = useState(1)
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

    const bookData = [
        {
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book1.svg",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: ""
        }
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
    const backToYearPage = () => {
        setSelectedMonth(null)
    }
    const backToAllYearPage = () => {
        setAllYears(true)
        setSelectedMonth(null)
        setSelectedYear(NaN)
    }
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory([...selectedCategory, categoryId]);
    };
    const redirectToMonthPage = (month) => {
        setSelectedMonth(month)
    }
    const decrease = (x) => {
        if (x != 1) {
            setQuantity(x - 1)
        }
    }
    const increase = (x) => {
        setQuantity(x + 1)
    }
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
                                                <input type="checkbox" id={category.id} name="checkbox" value={category.id} />
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
                : (selectedMonth === null) && (!isNaN(selectedYear)) ?
                    <>
                        <div className="Year-navigation">
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
                                            onClick={() => redirectToMonthPage(e.month)}
                                        />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </>
                    : <>
                        <div className="Month-navigation">
                            <a className="back" onClick={() => backToAllYearPage()}>
                                E-Book
                            </a>
                            <img src={ebooks.icons.RightArrowStroke} alt="" />
                            <div className="year" onClick={() => backToYearPage()}>
                                {selectedYear}
                            </div>
                            <img src={ebooks.icons.RightArrowStroke} alt="" />
                            <div className="month">
                                {selectedMonth} {selectedYear}
                            </div>
                        </div>
                        <div className="monthlybook-buysection">
                            <div className="book-imagesection">
                                <img src={bookData[0].img} alt="" />
                            </div>
                            <div className="book-contentsection">
                                <div className="book-navigator">
                                    <div className="stock" style={bookData[0].availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : {}}>
                                        {bookData[0].availability}
                                    </div>
                                    <div className="prev-next">
                                        <div className="prev">
                                            <img src={ebooks.icons.Previous} alt="Left Arrow" />
                                            &nbsp;
                                            Previous
                                        </div>
                                        <div className="nxt">

                                            Next
                                            &nbsp;
                                            <img src={ebooks.icons.Next} alt="Right Arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className="title-section">
                                    <div className="title">
                                        {bookData[0].title}
                                    </div>
                                    <div className="subtext">
                                        <div className="author">
                                            Author: {bookData[0].author}
                                        </div>
                                        <div className="id">
                                            {bookData[0].id}
                                        </div>
                                    </div>
                                    <div className="shortdesc">
                                        {bookData[0].shortDesc}
                                    </div>
                                    <div className="listen-copy-buy-section">
                                        Select Format : {activeTab}
                                        <div className="tabs">
                                            <button
                                                className={`tab-button ${activeTab === "AUDIO" ? "active" : ""}`}
                                                onClick={() => setActiveTab("AUDIO")}
                                            >
                                                AUDIO
                                            </button>
                                            <button
                                                className={`tab-button ${activeTab === "HARDCOPY" ? "active" : ""}`}
                                                onClick={() => setActiveTab("HARDCOPY")}
                                            >
                                                HARDCOPY
                                            </button>
                                        </div>
                                        <div className="tab-content">
                                            {activeTab === "AUDIO" && <div className="audio">
                                                <div className="audio-buy">
                                                    <div className="plans">
                                                        Please subscribe to hear the audio <a> View Plan</a>
                                                    </div>
                                                    <div className="subscribe-section">
                                                        <Button variant="text" sx={{
                                                            borderRadius: "40px",
                                                            width: "10rem",
                                                            p: "10px",
                                                            background: "#999999",
                                                            textTransform: "none",
                                                            marginTop: "2rem",
                                                            color: "#444444",
                                                            fontWeight: "700",
                                                            justifyContent: "space-evenly"
                                                        }} disabled >

                                                            <img src={ebooks.icons.Lock} style={{ width: "1rem", height: "1.5rem" }} />
                                                            Listen Now
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>}
                                            {activeTab === "HARDCOPY" && <div className="hardcopy">
                                                Please select subscription
                                                <div className="period-tabs">
                                                    <div className="buttons">
                                                        <button
                                                            className={`tab-button ${periodTab === "MONTHLY" ? "active" : ""}`}
                                                            onClick={() => setPeriodTab("MONTHLY")}
                                                        >
                                                            MONTHLY
                                                        </button>
                                                        <button
                                                            className={`tab-button ${periodTab === "YEARLY" ? "active" : ""}`}
                                                            onClick={() => setPeriodTab("YEARLY")}
                                                        >
                                                            YEARLY
                                                        </button>
                                                        <div className="period-tab-content">
                                                            {periodTab === "MONTHLY" && <div>
                                                                <div className="month-selection">
                                                                    <label htmlFor="month">Select months</label>
                                                                    <input type="number"
                                                                        name="month"
                                                                        id="month"
                                                                        min="1"
                                                                        step="1"
                                                                        value={noOfMonth}
                                                                        onChange={(e) => setNoOfMonth(e.target.value)}
                                                                    />
                                                                </div>

                                                            </div>}
                                                            {periodTab === "YEARLY" && <div>
                                                                <div className="year-selection">
                                                                    <label htmlFor="year">Select years</label>
                                                                    <input type="number"
                                                                        name="year"
                                                                        id="year"
                                                                        min="1"
                                                                        step="1"
                                                                        value={noOfYear}
                                                                        onChange={(e) => setNoOfYear(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>

                                                    <div className="note">
                                                        <span>Please note</span>: Your subscription will commence with the next issue of the E-magazine, starting from the subscription date.
                                                    </div>
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
                                                        }} >

                                                            <img src={ebooks.icons.cart} style={{ width: "1rem", height: "1.5rem", filter: "invert(100%)" }} />
                                                            Subscribe
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            }

                                            <div className="cat-tag">
                                                Categories: {bookData[0].category}
                                                <br></br>
                                                Tags: {bookData[0].tag}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </Container>
    )
}