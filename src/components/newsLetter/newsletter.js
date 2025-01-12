import "./newsLetter.css";
import { TextField, Button } from "@mui/material";

export default function NewsLetter() {
    return (
        <div className="NewsLetter">
            <div className="content-section">
                <div className="title">
                    Subscribe here to get
                    interesting stuff and updates!
                </div>
                <div className="subtitle">
                    Enter your email address to receive regular updates, as well as news on
                    upcoming events and specific offers.
                </div>
                <div className="subscribe">
                    <TextField
                        variant="outlined"
                        placeholder="Your email address"
                        fullWidth
                        size="small"
                        margin="normal"
                        sx={{ marginBottom: "1rem"}}
                        InputProps={{
                            style: {
                                borderRadius: "1.5rem",
                                background:'#fff',
                            },
                        }}                       
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        sx={{ backgroundColor: "#f09300", color: "white", padding: "0.5rem 1.5rem", textTransform:'none', borderRadius: "1.5rem" }}
                    >
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className="img-section">
                <img src="/assets/images/Subscribe.png" alt="" />
            </div>
        </div>
    );
}