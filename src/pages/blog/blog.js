import "./blog.css";
import { useState } from "react";
import { ebooks, homePage } from "../../constants/screenData";
import Playstore from "../../components/playstore/playstore";
import NewsLetter from "../../components/newsLetter/newsletter";
import KPI from "../../components/kpi/kpi";
import { Container, Card, CardContent, CardHeader, Divider, TextField, InputAdornment, Button, Box, Pagination, PaginationItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useQuery } from "react-query";
import { Loader } from "../../components/loader/loader";
import Gif_Loader from "../../components/loader/Gif_Loader";

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("GNANAM");
    const [currentPage, setCurrentPage] = useState(1);
    const {data:BlogData, isLoading:BlogIsLoading} = useQuery("blog", async () => {
        let url =  process.env.REACT_APP_URL + "/blogs";
        console.log("url", url);
        
        const response = await fetch(url);
        const data = await response.json();
        return data;
    },
    {
        staleTime: 60000,
        cacheTime: 300000
    }
)


        if (BlogIsLoading) {
        //   return <Loader/>;
          return <Gif_Loader />;
        }
    // const blogcontent = [
    //     {
    //         img: "/assets/images/blog_sample1.svg",
    //         date: "NOVEMBER 14, 2022",
    //         author: "ADMIN",
    //         comments: 15,
    //         views: 3250,
    //         category: "GNANAM",
    //         title: "Bow down to the universe",
    //         content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
    //     },
    //     {
    //         img: "/assets/images/blog_sample2.svg",
    //         date: "NOVEMBER 14, 2022",
    //         author: "ADMIN",
    //         comments: 15,
    //         views: 3250,
    //         category: "GNANAM",
    //         title: "Bow down to the universe",
    //         content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
    //     },
    //     {
    //         img: "/assets/images/blog_sample3.svg",
    //         date: "NOVEMBER 14, 2022",
    //         author: "ADMIN",
    //         comments: 15,
    //         views: 3250,
    //         category: "GNANAM",
    //         title: "Bow down to the universe",
    //         content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
    //     },

    // ]
    const categories = [
        { id: "GNANAM", label: "GNANAM" },
        { id: "Sithanaigal", label: "Sithanaigal" },
        { id: "Varalaru", label: "Varalaru" },
        { id: "Uncategorized", label: "Uncategorized" }
    ];
    const recentposts = [
        {
            title: "தீபாவளி வாழ்த்துக்கள்....",
            img: "/assets/images/blog-sample.svg",
            date: "NOVEMBER 14, 2022",
            comments: "15",
            views: "3250"
        },
        {
            title: "தீபாவளி வாழ்த்துக்கள்....",
            img: "/assets/images/blog-sample.svg",
            date: "NOVEMBER 14, 2022",
            comments: "15",
            views: "3250"
        }, {
            title: "தீபாவளி வாழ்த்துக்கள்....",
            img: "/assets/images/blog-sample.svg",
            date: "NOVEMBER 14, 2022",
            comments: "15",
            views: "3250"
        }, {
            title: "தீபாவளி வாழ்த்துக்கள்....",
            img: "/assets/images/blog-sample.svg",
            date: "NOVEMBER 14, 2022",
            comments: "15",
            views: "3250"
        }, {
            title: "தீபாவளி வாழ்த்துக்கள்....",
            img: "/assets/images/blog-sample.svg",
            date: "NOVEMBER 14, 2022",
            comments: "15",
            views: "3250"
        },
    ]

    const recentBlogs = []
    BlogData.sort((a, b) => new Date(b.created_dt) - new Date(a.created_dt)).slice(0, 5).forEach(blog => {
        recentBlogs.push(blog);
    });
    // console.log("recentBlogs", recentBlogs);
    
    // const handleCategoryClick = (categoryId) => {
    //     setSelectedCategory(categoryId);
    // };

        // Pagination logic: calculate the blogs to be displayed on the current page
        const blogsPerPage = 4;
        const totalBlogs = BlogData.length;
        const pageCount = Math.ceil(totalBlogs / blogsPerPage);
        const startIndex = (currentPage - 1) * blogsPerPage;
        const currentBlogs = BlogData.slice(startIndex, startIndex + blogsPerPage);
    
        const handlePageChange = (event, value) => {
            setCurrentPage(value); // Update the current page when the pagination page number changes
        };
    
        const handleCategoryClick = (categoryId) => {
            setSelectedCategory(categoryId);
        };

    return (
        <Container maxWidth="lg">
            <div className="blog-page">
                <div className="title">
                    Latest Blog
                </div>
                <div className="content">
                <div className="left-side">
                        {currentBlogs.map(d => (
                            <div key={d.id} className="blog-content">
                                <img src={d.imgUrl} alt="" />
                                <div className="subtext">
                                    <div className="dateAndAuthor">
                                        {new Date(d.created_dt).toISOString().slice(0, 10)} / BY ADMIN
                                    </div>
                                </div>
                                <div className="title">{d.title}</div>
                                <div className="content">{d.summary}</div>
                                <div className="blog-footer">
                                    <div className="categ">IN <span>{d.category}</span></div>
                                    <div className="readmore">
                                        <Button
                                            variant="text"
                                            sx={{
                                                color: "black",
                                                fontSize: "0.8rem",
                                                fontFamily: "Sora, sans-serif",
                                                fontWeight: 600,
                                                textTransform: "none",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                            endIcon={<KeyboardArrowRightIcon sx={{ color: "#F09300" }} />}
                                        >
                                            Read More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                            <Pagination
                                count={pageCount}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                siblingCount={1}
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
                                        (item.type === "next" && currentPage === totalBlogs)
                                    } // Disable when on first or last page
                                >
                                    {item.type === "previous" ? (
                                        <>
                                            {/* <img src={ebooks.icons.Previous} alt="Left Arrow" /> */}
                                            Previous
                                        </>
                                    ) : item.type === "next" ? (
                                        <>
                                            Next
                                            {/* <img src={ebooks.icons.Next} alt="Right Arrow" /> */}
                                        </>
                                    ) : (
                                        item.page
                                    )}
                                </Button>
                            )}
                            />
                        </Box>
                    </div>
                    <div className="right-side">
                        <div className="search">
                            <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                                <CardHeader
                                    title="Search"
                                    titleTypographyProps={{
                                        variant: "h6",
                                        align: "left",
                                        sx: { fontFamily: "Sora, sans-serif", fontSize: "1.2rem", fontWeight: 600 }
                                    }}
                                    sx={{ paddingBottom: 0 }}
                                />
                                <Divider />
                                <CardContent sx={{ paddingTop: 2 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search..."
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="Categories">
                            <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                                <CardHeader
                                    title="Categories"
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
                                            style={{
                                                color: selectedCategory === category.id ? "#F09300" : "#444444",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <img
                                                src={homePage.icons.RightArrow}
                                                alt=""
                                                style={{
                                                    filter: selectedCategory === category.id ? "brightness(0) saturate(100%) invert(56%) sepia(68%) saturate(479%) hue-rotate(350deg) brightness(102%) contrast(104%)" : "none"
                                                }}
                                            />
                                            <div className="text" style={{ color: selectedCategory === category.id ? "#F09300" : "#444444" }}>
                                                {category.label}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="recent-posts">
                            <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                                <CardHeader
                                    title="Recent Posts"
                                    titleTypographyProps={{
                                        variant: "h6",
                                        align: "left",
                                        sx: { fontFamily: "Sora, sans-serif", fontSize: "1.2rem", fontWeight: 600 }
                                    }}
                                    sx={{ paddingBottom: 0 }}
                                />
                                <Divider />
                                <CardContent sx={{ paddingTop: 2 }}>
                                    {recentBlogs.map((d) => (<div className="post-card">
                                        <img src={d.imgUrl} alt="" />
                                        <div className="text">
                                            <div className="post-title">
                                                {d.title}
                                            </div>
                                            <div className="post-date">
                                                {new Date(d.created_dt).toISOString().slice(0,10)}
                                            </div>
                                            {/* <div className="add-info">
                                                <div className="comment">
                                                    <img src={homePage.icons.CommentIcon} alt="" />
                                                    <div className="count">{d.comments}</div>
                                                </div>
                                                <div className="views">
                                                    <img src={homePage.icons.ViewIcon} alt="" />
                                                    <div className="count">{d.views}</div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>))}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="tags">
                            <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                                <CardHeader
                                    title="Tags"
                                    titleTypographyProps={{
                                        variant: "h6",
                                        align: "left",
                                        sx: { fontFamily: "Sora, sans-serif", fontSize: "1.2rem", fontWeight: 600 }
                                    }}
                                    sx={{ paddingBottom: 0 }}
                                />
                                <Divider />
                                <CardContent sx={{ paddingTop: 2 }}>
                                    <a href="">#Gnanam</a>
                                    <a href="">#Sithanaigal</a>
                                    <a href="">#Varalaru</a>
                                    <a href="">#Uncategorized</a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="playStore">
                    <Playstore />
                </div>
                <NewsLetter />
                <KPI />
            </div>
        </Container>
    );
}
