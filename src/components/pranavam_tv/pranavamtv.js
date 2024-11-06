import ViewAll from "../viewAllButton/viewAll"
import "./pranavam.css"
export default function PranavamTV(){
    return (
        <div className="PranavamTV">
            <div className="title">
                <div className="text">
                    Pranavam TV
                </div>
                <div className="viewAll">
                    <ViewAll/>
                </div>
            </div>
            <div className="video-section">
                <div className="main">
                <iframe src="https://www.youtube.com/embed/iFGenD2BGSQ?si=W_TfT2N-tT8vvZVm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="other">
                {/* <iframe src="https://www.youtube.com/embed/7JletmiT3io" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <iframe src="https://www.youtube.com/embed/7JletmiT3io" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <iframe src="https://www.youtube.com/embed/7JletmiT3io" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

                </div>
            </div>
        </div>
    )
}