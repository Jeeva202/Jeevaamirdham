import { homePage } from "../../constants/screenData";
import ViewAll from "../viewAllButton/viewAll"
import "./pranavam.css"


function YouTubeEmbed({ videoId, onClick }) {
    return (
        <div className="youtubeEmbed"
            onClick={() => onClick(videoId)}
            style={{

                backgroundImage: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer',
            }}
        >
        </div>
    );
}


export default function PranavamTV() {

    const youtubedata = [
        {
            videoid: "iFGenD2BGSQ",
            title: "வராகி அம்மன் அருட்காப்பு பாடல்",
            views: "178K",
            comments: "101"
        },
        {
            videoid: "iFGenD2BGSQ",
            title: "வராகி அம்மன் அருட்காப்பு பாடல்",
            views: "178K",
            comments: "101"
        },
        {
            videoid: "iFGenD2BGSQ",
            title: "வராகி அம்மன் அருட்காப்பு பாடல்",
            views: "178K",
            comments: "101"
        },
    ]

    const handleClick = (videoId) => {
        console.log("Clicked video ID:", videoId);
    };

    return (
        <div className="PranavamTV">
            <div className="title">
                <div className="text">
                    Pranavam TV
                </div>
                <div className="viewAll">
                    <ViewAll text="View All" width="7rem" padding={"0.8rem 4rem"}/>
                </div>
            </div>
            <div className="video-section">
                <div className="main">
                    <iframe src="https://www.youtube.com/embed/iFGenD2BGSQ?si=W_TfT2N-tT8vvZVm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="other">
                    {youtubedata.map((d) => (
                        <div className="embed">
                            <YouTubeEmbed videoId={d.videoid} onClick={handleClick} />
                            <div className="video-title">
                                <div className="text">
                                    {d.title}

                                </div>
                                <div className="add-info">
                                    <div className="comment">
                                        <img src={homePage.icons.CommentIcon} alt="" />
                                        <div className="count">{d.comments }</div>
                                    </div>
                                    <div className="views">
                                        <img src={homePage.icons.ViewIcon} alt="" />
                                        <div className="count">{d.views}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}


