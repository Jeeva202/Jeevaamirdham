import phoneIcon from '../assets/icons/phonecall.svg'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Pinterest from "../assets/icons/pinterest.svg"
import traslateIcon from '../assets/icons/engToTamil.svg'
import appLogo from '../assets/images/jeevaamirdhamLogo.svg'
import SearchIcon from '../assets/icons/search.svg'
import userIcon from '../assets/icons/user.svg'
import cartIcon from '../assets/icons/cart.svg'

import kpiCart from "../assets/icons/kpi_cart.svg"
import kpiEmoji from "../assets/icons/kpi_emoji.svg"
import kpiBook from "../assets/icons/kpi_book.svg"

import newYork from '../assets/images/contact_newyork.png'
import lasVegas from '../assets/images/contact_lasvegas.png'
import losAngeles from '../assets/images/contact_losangeles.png'
import PlaystoreBanner from "../assets/images/playstore_banner.svg"
import CommentIcon from "../assets/icons/comment.svg"
import ViewIcon from "../assets/icons/eye.svg"
import HorizontalDivider from "../assets/icons/Horizontal Divider.svg"
import RightArrow from "../assets/icons/right_arrow.svg"
export const navBanner = {
    icons:{
        phone: phoneIcon,
        facebook: FacebookOutlinedIcon,
        pinterest: Pinterest,
        instagram: InstagramIcon,
        twitter: TwitterIcon,
        traslate: traslateIcon,
        search: SearchIcon,
        user: userIcon,
        cart: cartIcon
    }, 
    logo: appLogo,
    }
export const kpiCard = {
    icons:{
        cart: kpiCart,
        emoji: kpiEmoji,
        book: kpiBook,
    }
};
export const contactPage = {
    images: {
        newYork: newYork,
        lasVegas: lasVegas,
        losAngeles: losAngeles,
    }
}
export const homePage = {
    images: {
        playstore:PlaystoreBanner,
    },
    icons:{
        CommentIcon,
        ViewIcon,
        HorizontalDivider,
        RightArrow
    }
}