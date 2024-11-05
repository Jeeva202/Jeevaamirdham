import "./newsLetter.css"
export default function NewsLetter() {
    return (
        <div className="NewsLetter">
            <div className="content-section">
                <div className="title">
                    Subscribe here to get
                    <br />
                    interesting stuff and updates!
                </div>
                <div className="subtitle">
                    Enter your email address to receive regular updates, as well as news on
                    <br />
                    upcoming events and specific offers.
                </div>
                <div className="subscribe">
                    <input type="text" name="" id="" placeholder="Your email address" />
                    <button>
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="img-section">
                <img src="/assets/images/Subscribe.png" alt="" srcset="" />
            </div>
        </div>
    )
}