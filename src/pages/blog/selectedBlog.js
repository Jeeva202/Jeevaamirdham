import { Container } from "@mui/material";
import React,{useEffect} from "react";
import { ebooks } from "../../constants/screenData";
import "./blog.css";

export default function SelectedBlog({ selectedBlog, setSelectedBlog }) {
    console.log(selectedBlog);

    const backToAllBlogsPage = () => {
        setSelectedBlog(null);
    }

    useEffect(() => {
        if (selectedBlog) {
            window.scrollTo(0, 0); // Scrolls to the top of the page
        }
    }, [selectedBlog]);
    return (
        <Container maxWidth="lg">

            <div className="home-navigation">
                <a className="back" onClick={() => backToAllBlogsPage()}>
                    Blogs
                </a>
                <img src={ebooks.icons.RightArrowStroke} alt="" />
                <div className="nav-title">
                    {selectedBlog?.title}
                </div>
            </div>
            <div className="selected-blog-content">
                <div className="selected-blog-img-section">
                    <img src={selectedBlog?.imgUrl} alt="" />
                </div>
                <div className="selected-blog-content-section ">
                    <div className="blog-cat">
                        {selectedBlog.category}
                    </div>
                    <div className="blog-subtext">
                        <div className="blog-date">
                            {new Date(selectedBlog.created_dt).toISOString().slice(0,10)} / Jeeva Amirdham
                        </div>
                    </div>
                    <div className="blog-title-section">
                        <div className="blog-title">
                            {selectedBlog.title}
                        </div>
                    </div>
                    <div className="blog-content">
                        {selectedBlog.content}
                    </div>
                    <div className="author">
                        -  ஜீவஅமிர்தம். கோ. திருமுருகன்
                    </div>
                </div>

            </div>
        </Container>
    )
}