import "./viewAll.css"
import { Button } from "@mui/material"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ViewAll(){
    return (
        // <button className="viewAll"> View All</button>
        <Button 
    disableElevation 
    variant="contained" 
    endIcon={<KeyboardArrowRightIcon />} 
    sx={{ 
        borderRadius: "40px", 
        p: "0.8rem 4rem", 
        width: "7rem", 
        background: "#F09300", 
        textTransform: "none", 
        marginTop: "2rem", 
        color: "black" 
    }}
>
    View All
</Button>

    )
}