import "./viewAll.css"
import { Button } from "@mui/material"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ViewAll({ text, width, padding, onClick }) {
    return (
        // <button className="viewAll"> View All</button>
        <Button
            disableElevation
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            sx={{
                borderRadius: "40px",
                p: padding,
                width: width,
                background: "#F09300",
                textTransform: "none",
                marginTop: "2rem",
                color: "black"
            }}
            onClick={onClick}
        >
            {text}
        </Button>

    )
}