import "./blog.css";
import { useState } from "react";
import { homePage } from "../../constants/screenData";
import Playstore from "../../components/playstore/playstore";
import NewsLetter from "../../components/newsLetter/newsletter";
import KPI from "../../components/kpi/kpi";
import { Container, Card, CardContent, CardHeader, Divider, TextField, InputAdornment, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("GNANAM");

    const blogcontent = [
        {
            img: "/assets/images/blog_sample1.svg",
            date: "NOVEMBER 14, 2022",
            author: "ADMIN",
            comments: 15,
            views: 3250,
            category: "GNANAM",
            title: "Bow down to the universe",
            content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
        },
        {
            img: "/assets/images/blog_sample2.svg",
            date: "NOVEMBER 14, 2022",
            author: "ADMIN",
            comments: 15,
            views: 3250,
            category: "GNANAM",
            title: "Bow down to the universe",
            content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
        },
        {
            img: "/assets/images/blog_sample3.svg",
            date: "NOVEMBER 14, 2022",
            author: "ADMIN",
            comments: 15,
            views: 3250,
            category: "GNANAM",
            title: "Bow down to the universe",
            content: "The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos. Just as you exist, so do all other living beings. When that is the case, seeing differences is not divine. There is no deity like a human, nor is there a malevolent destroyer. People who live selfishly and forget gratitude are lower than dogs! Yet today, such individuals present themselves as great scholars and stand at the forefront of everything! Those who measured life carefully now live in obscurity, and many lament that this is the era we live in—and rightly so!"
        },

    ]
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
                        {blogcontent.map(d => (
                            <div className="blog-content">
                                <img src={d.img} alt="" />
                                <div className="subtext">
                                    <div className="dateAndAuthor">
                                        {d.date} / BY {d.author}
                                    </div>
                                    <div className="viewAndComment">
                                        <div className="comment">
                                            <img src={homePage.icons.CommentIcon} alt="" />
                                            <div className="count">{d.comments}</div>
                                        </div>
                                        <div className="views">
                                            <img src={homePage.icons.ViewIcon} alt="" />
                                            <div className="count">{d.views}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="title">
                                    {d.title}
                                </div>
                                <div className="content">
                                    {d.content}
                                </div>
                                <div className="blog-footer">
                                    <div className="categ">
                                        IN <span>{d.category}</span>
                                    </div>
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
                                            endIcon={
                                                <KeyboardArrowRightIcon sx={{ color: "#F09300" }} />
                                            }
                                        >
                                            Read More
                                        </Button>

                                    </div>
                                </div>
                            </div>

                        ))}


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
                                    {recentposts.map((d) => (<div className="post-card">
                                        <img src={d.img} alt="" />
                                        <div className="text">
                                            <div className="post-title">
                                                {d.title}
                                            </div>
                                            <div className="post-date">
                                                {d.date}
                                            </div>
                                            <div className="add-info">
                                                <div className="comment">
                                                    <img src={homePage.icons.CommentIcon} alt="" />
                                                    <div className="count">{d.comments}</div>
                                                </div>
                                                <div className="views">
                                                    <img src={homePage.icons.ViewIcon} alt="" />
                                                    <div className="count">{d.views}</div>
                                                </div>
                                            </div>
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
