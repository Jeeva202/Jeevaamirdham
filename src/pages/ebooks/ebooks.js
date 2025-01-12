import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';
import {
    Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button, Modal, Typography,
    Box, List, ListItem, ListItemIcon, ListItemText, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Grid, Alert
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

import { useDispatch, useSelector } from "react-redux";
import { openCart, selectIsCartOpen } from "../../redux/cartSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Playstore from "../../components/playstore/playstore"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
import { useQuery } from "react-query";
import axios from "axios";
import YearNavigation from "./yearNavigation";
import BuyBook from "./buyBook";
import MonthNavigation from "./monthNavigation";
import BookDetails from "./bookDetails";
import AudioPlayer from "./audioPlayer";
import LoginModal from "../login/NewLogin";
import { openLogin, setUserLoggedIn, selectUserId, setCartDetails, setBooksData } from '../../redux/cartSlice'
import { Loader } from "../../components/loader/loader";

export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [listenPage, setListenPage] = useState(false)
    const [categoryCartFlag, setCategoryCartFlag] = useState(false)
    const [selectedYear, setSelectedYear] = useState(NaN);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);
    const [catSelectedBook, setCatSelectedBook] = useState("0")
    // const [activeTab, setActiveTab] = useState("AUDIO");
    // const [periodTab, setPeriodTab] = useState("MONTHLY")
    const itemsPerPage = 4; // Items per page for the buy section
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfYear, setNoOfYear] = useState(1);
    const [noOfMonth, setNoOfMonth] = useState(1)
    const [whichBook, setWhichBook] = useState("0");
    const [openModal, setOpenModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [paid, setPaid] = useState(false)
    const [plan, setPlan] = useState('basic')
    const [expanded, setExpanded] = useState(0); 
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.cart.isUserLoggedIn);
    const userId = useSelector(selectUserId)
    const isOpen = useSelector(selectIsCartOpen)
    const handleAddToCart = async (book, quantity) => {
        console.log("user id", userId);
    
        const addtocart = await axios.post('http://localhost:3001/ebooks/add_to_cart', {
            userId: userId,
            book: book.id,
            quantity:quantity
        });
        const cartDetails = addtocart.data.cart_details;
    
        console.log(addtocart, "add to cart");
    
        // Dispatch an action to update the Redux store with the updated cart details
        dispatch(setCartDetails(cartDetails)); // This will update the cartDetails in Redux
        dispatch(openCart()); // Open the cart modal
    };
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false)
    const plans = [
        {
            name: "basic",
            price: "₹0",
            features: [
                "Access to one chapter of E-magazine",
                "One audio content",
                "One video content",
                "Ability to shop for books",
            ],
            buttonLabel: "Free",
            buttonStyle: {
                backgroundColor: "#E6E6E6",
                color: "#000",
            },
        },
        {
            name: "elite",
            price: "₹599/year",
            features: [
                "Access to all E-magazine content",
                "All audio content",
                "All video content",
                "Ability to shop for books",
            ],
            buttonLabel: "Purchase Now",
            buttonStyle: {
                backgroundColor: "#F09300",
                color: "#fff",
            },
        },
        {
            name: "premium",
            price: "₹999/year",
            features: [
                "Access to all E-magazine content",
                "All audio content",
                "All video content",
                "Ability to shop for books",
                "Hard copy subscription of E-magazine",
            ],
            buttonLabel: "Purchase Now",
            buttonStyle: {
                backgroundColor: "#F09300",
                color: "#fff",
            },
        },
    ];
    const YearWiseEbooks = [
        {
            year: 2024,
            img: "/assets/images/ebook_2024.svg"
        },
        {
            year: 2023,
            img: "/assets/images/ebook_2023.svg"
        },
        {
            year: 2022,
            img: "/assets/images/ebook_2022.svg"
        },
        {
            year: 2021,
            img: "/assets/images/ebook_2021.svg"
        },
        {
            year: 2020,
            img: "/assets/images/ebook_2020.svg"
        },
        {
            year: 2019,
            img: "/assets/images/ebook_2019.svg"
        }, {
            year: 2018,
            img: "/assets/images/ebook_2018.svg"
        }
    ]
    const oneYearBook = [
        { month: "January", img: "/assets/images/ebook_jan.svg" },
        { month: "February", img: "/assets/images/ebook_feb.svg" },
        { month: "March", img: "/assets/images/ebook_mar.svg" },
        { month: "April", img: "/assets/images/ebook_apr.svg" },
        { month: "May", img: "/assets/images/ebook_may.svg" },
        { month: "June", img: "/assets/images/ebook_jun.svg" },
        { month: "July", img: "/assets/images/ebook_jul.svg" },
        { month: "August", img: "/assets/images/ebook_aug.svg" },
        { month: "September", img: "/assets/images/ebook_sep.svg" },
        { month: "October", img: "/assets/images/ebook_oct.svg" },
        { month: "November", img: "/assets/images/ebook_nov.svg" },
        // { month: "December", img: "/assets/images/ebook_dec.svg" },
    ];
    const categories = [
        { id: "GNANAM", label: "GNANAM" },
        { id: "Sithanaigal", label: "SITHANAIGAL" },
        { id: "Varalaru", label: "VARALARU" }
    ];
    // const booksData = [
    //     {   id:1,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    //     {   id:2,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    //     {   id:3,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    //     {   id:4,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    //     {   id:5,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    //     {   id:6,
    //         category: "GNANAM",
    //         title: "Gnana Amirtham",
    //         subtitle: "Siddharth Thoughts",
    //         shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
    //         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
    //         discount: "30%",
    //         orgPrice: "$814.66",
    //         offPrice: "₹450.00",
    //         img: "/assets/images/Gnana_Amirtham.png",
    //         availability: "IN STOCK",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
    //         category_tag: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary"
    //     },
    // ];



    const audioData = [
        {
            date: "November 14, 2022",
            by: "Admin",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            img: "/assets/images/2024_January_book1.svg",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
        {
            date: "November 14, 2022",
            by: "Admin",
            img: "/assets/images/2024_January_book1.svg",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            genre: "GNANAM",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            details: 'ஆசிரியர் ஜீவஅமிர்தம் கோ.திருமுகன், BE .,\n அலைபேசி : 9176564723\n சிறப்பாசிரியர் : வைதேகி திருமுகன், M.SC, M.Phil., B.Ed.,\n சட்ட ஆலோசகர் : இராம.சுப்பையா B.A ., B.I.,\n செயலி வடிவமைப்பு : ஜாக்.ப .ஆனந்த்.,\n கௌரவ ஆலோசகர்கள்:\n P.கார்த்திகேயன் (Auditor),\n நா.நாராயணன், A.N பில்டர்ஸ்,\n Dr.முத்துக்குமார் சக்திவேல் (USA),\n தினகரன் B.E.,\n வசந்தகுமார்',
            audio_content: [
                {
                    title: "மனம் திறந்து உங்களுடன்....",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "சூட்டுக்கோல் செல்லப்பா சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "அருட்திரு. சொக்கலிங்க சுந்தரமூர்த்தி சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "நீங்கள் உங்களுள்ளே சரணடைய...",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "யார் நந்தி, யார் துவாரபாலகர் யார் திரிபுர சுந்தரி எது கருவறை எது இராகு,எது கேது",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "விஷ முறிவு சித்தர் சித்தையா சாமி",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
                {
                    title: "வேர்க்கடலைச் சாமிகள்",
                    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                    transcript: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!"
                },
            ]
        },
    ]
    // const bookData = [
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book1.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book2.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book3.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book4.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book5.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "IN STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book6.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },
    //     {
    //         genre: "GNANAM",
    //         availability: "OUT OF STOCK",
    //         title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
    //         author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
    //         id: "SKU: INT280",
    //         shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
    //         category: "Action & Adventure, Activity Books",
    //         tag: "Books, Fiction, Romance - Contemporary",
    //         img: "/assets/images/2024_January_book7.svg",
    //         cost: "₹ 1000",
    //         desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
    //         additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
    //     },

    // ]

    /**
     *  Data fetching for the Ebooks section starts here 
     * ==================================================
     * ==================================================*/

    const { data: APIBookData, BookStatus, isBookLoading, Bookerror } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3001/emagazine-page/magazine-details`, {
                params: { year: selectedYear, month: selectedMonth },
            });
            return data;
        },
        queryKey: ["megazine-details", selectedYear, selectedMonth, allYears], // Include parameters in the key
        enabled: !!selectedYear && !!selectedMonth && !allYears
    });


    const { data: APIYearBookImages, status: YearImagestatus, isLoading: isYearImageLoading, error: YearImageError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3001/emagazine-page/magazine-yearwise`)
            return data
        },
        queryKey: ["magazine-yearwise", selectedYear, selectedMonth, allYears],
        enabled: !selectedYear && !selectedMonth && allYears
    })


    const { data: APIMonthBookImages, status: MonthImagestatus, isLoading: isMonthImageLoading, error: MonthImageError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3001/emagazine-page/magazine-monthwise`)
            return data
        },
        queryKey: ["magazine-monthwise", selectedYear, selectedMonth, allYears],
        enabled: !!selectedYear && !selectedMonth && !allYears
    })


    const { data: prevNxtAudioData, status: prevNxtAudioStatus, isLoading: prevNxtAudioLoading, error: prevNxtAudioError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3001/emagazine-page/audio-prev-nxt-details`, {
                params: {
                    bid: "book_id"
                }
            }

            )
            return data
        },
        queryKey: ["prev-and-next-audio", listenPage],
        enabled: !!listenPage
    })

    const {data:planData, status:planStatus, isLoading:planIsLoading, error:planError} = useQuery({
        queryFn: async ()=>{
            const {data} = await axios.get(`http://localhost:3001/getPlan`,{
                params:{
                    id:""
                }
            })
            return data
        },
        queryKey:["plan-detail", isUserLoggedIn]

    })

    
    const { data: booksData, error: booksError, isLoading: isBooksLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3001/ebooks/books");
            console.log("Books Data:", data);
            return data;
        },
    });
      
    useEffect(() => {
        if (booksData) {
            dispatch(setBooksData(booksData)); // Store booksData in Redux
        }
    }, [booksData, dispatch]);
    //   const { data: bookInfoData, error: bookInfoError, isLoading: isBookInfoLoading } = useQuery({
    //     queryKey: ["book-info", selectedBookId], // Adjust the key based on the selected book
    //     queryFn: async () => {
    //       const { data } = await axios.get(`http://localhost:3001/ebooks/book-info?id=${selectedBookId}`);
    //       return data;
    //     },
    //     enabled: !!selectedBookId, // Only enable if a book is selected
    //   });
    // const {data:createUser, isLoading:createUserLoading} = useQuery({
    //     queryFn: async ()=>{
    //         const {data} = await axios.get(`http://localhost:3001/createUser`, {
    //             params:{
    //                 id:"",
    //                 name:"",
    //                 email:"",
    //                 plan:"basic"
    //             }
    //         })
    //         return data
    //     }
    // })

    const {data:setPlanData} = useQuery({
        queryFn: async ()=>{
            const {data} = await axios.get(`http://localhost:3001/setPlan`,{
                params:{
                    id:"",
                    plan: plan ? plan : "basic"
                }
            })
            return data
        },
    })

    /**
     * ==================================================
     * ==================================================
     *  Data fetching for the Ebooks section ends here 
    */
    if (isBooksLoading) {
        return <Loader/>;
    }

    console.log("booksData", booksData);
    
    const totalPages = booksData ? Math.ceil(booksData.length / itemsPerPage) : 0;
    const currentItems = booksData ? booksData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const redirectToYearPage = (year) => {
        setSelectedYear(year);
        setAllYears(false);
        setListenPage(false)
    };
    const backToYearPage = () => {
        setSelectedMonth(null)
        setWhichBook("0")
        // setActiveTab("AUDIO")
        // setPeriodTab("MONTHLY")
    }
    const backToAllYearPage = () => {
        setAllYears(true)
        setSelectedMonth(null)
        setSelectedYear(NaN)
        setWhichBook("0")
        // setActiveTab("AUDIO")
        // setPeriodTab("MONTHLY")
    }
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory([...selectedCategory, categoryId]);
    };
    const redirectToMonthPage = (month) => {
        setSelectedMonth(month)
    }


    const changeBook = (e, page = "monthly") => {
        console.log("e", e);

        if (e == "prev") {

            if (parseInt(whichBook) > 0) {
                setWhichBook((parseInt(whichBook) - 1).toString())
            }
        }
        else if (e == "nxt") {

            console.log("Before", "whichbook", whichBook, "length", booksData.length);
            if (parseInt(whichBook) < booksData.length - 1) {
                setWhichBook((parseInt(whichBook) + 1).toString())
            }
            console.log("After", "whichbook", whichBook, "length", booksData.length);
        }
        else if (e == "cat-prev") {
            if (parseInt(catSelectedBook) > 0) {
                setCatSelectedBook((parseInt(catSelectedBook) - 1).toString())
            }
        }
        else if (e == "cat-nxt") {
            if (parseInt(catSelectedBook) < booksData.length - 1) {
                setCatSelectedBook((parseInt(catSelectedBook) + 1).toString())
            }
        }
        else if (page == "catgeorypage") {
            setCatSelectedBook(e)
        }
        else {
            setWhichBook(e)
        }


    }
    const backToHomePage = () => {
        setAllYears(true);
        setCatSelectedBook("0")
        setCategoryCartFlag(false)
    }

    const handlePurchase = async (amount, planName) => {
        const userData = []
        // Initialize Razorpay payment
        const options = {
            // key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            key: "rzp_live_tjwWB1t6xxjHG1",
            amount: amount * 100, // Amount in paise
            currency: "INR",
            name: "Jeevaamirdham",
            description: "Subscription Payment",
            handler: async function (response) {
                console.log("Payment successful:", response);

                // Call your backend to update the database with payment details
                // try {
                //     const res = await fetch("/api/payment-success", {
                //         method: "POST",
                //         headers: {
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify({
                //             razorpay_payment_id: response.razorpay_payment_id,
                //             plan: planName,
                //             amount,
                //         }),
                //     });

                //     if (res.ok) {
                //         const data = await res.json();
                //         console.log("Backend updated successfully:", data);
                //         alert("Payment successful and subscription activated!");
                //     } else {
                //         console.error("Failed to update backend");
                //         alert("Payment was successful but could not update subscription. Please contact support.");
                //     }
                // } catch (error) {
                //     console.error("Error while updating backend:", error);
                //     alert("An error occurred. Please contact support.");
                // }
            },
            prefill: {
                name: userData?.name || "",
                email: userData?.email || "",
                contact: userData?.contact || "",
            },
            theme: {
                color: "#7C3AED",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const payNow = (plan) => {
        if(isUserLoggedIn){

            if (plan === 'basic') {
                handleClose()
                setPaid(true)
                // setIsUserLoggedIn()
            }
            else if (plan === 'elite') {
                handlePurchase(599, plan)
            }
            else{
                handlePurchase(999, plan)
            }

        }
        else {
            dispatch(openLogin())
            handleOpen()
            // handleLoginOpen();
        }

    };
    const navigateToProductSpecificPage = (i) => {
        setCatSelectedBook(i)
        setCategoryCartFlag(true)
        setAllYears(false)
    }
    const navigateToListenPage = () => {
        setListenPage(true)
    }
    const backToBookBuySection = () => {
        setListenPage(false)
    }
    const openPreviousAudioBook = () => {
        if (parseInt(whichBook) != 0) {

        }
    }




    return (
        <Container maxWidth="lg">
            {allYears ? (
                <div className="ebook-section">
                    <YearNavigation redirectToYearPage={redirectToYearPage} books={YearWiseEbooks} />
                    <BuyBook categories={categories} handleCategoryClick={handleCategoryClick} currentItems={currentItems} navigateToProductSpecificPage={navigateToProductSpecificPage} handlePageChange={handlePageChange} currentPage={currentPage} isOpen={isOpen} totalPages={totalPages} handleAddToCart={handleAddToCart} />
                </div>
            ) : (categoryCartFlag) ?
                <BookDetails backToHomePage={backToHomePage} catSelectedBook={catSelectedBook} booksData={booksData} changeBook={changeBook} handleAddToCart={handleAddToCart} isOpen={isOpen} />
                : (selectedMonth === null) && (!isNaN(selectedYear)) ?
                    <MonthNavigation backToAllYearPage={backToAllYearPage} selectedYear={selectedYear} oneYearBook={oneYearBook} redirectToMonthPage={redirectToMonthPage} />
                    : (listenPage && isUserLoggedIn)
                        ?
                        <AudioPlayer
                            audioData={audioData}
                            whichBook={whichBook}
                            isUserLoggedIn={isUserLoggedIn}
                            backToAllYearPage={backToAllYearPage}
                            backToBookBuySection={backToBookBuySection}
                            handleChange={handleChange}
                            expanded={expanded}
                            handleAddToCart={handleAddToCart}
                            openPreviousAudioBook={openPreviousAudioBook}
                            plan={plan}
                            setPlan={setPlan}
                        />
                        :
                        <>
                            <div className="Month-navigation">
                                <a className="back" onClick={() => backToAllYearPage()}>
                                    E-Magazine
                                </a>
                                <img src={ebooks.icons.RightArrowStroke} alt="" />
                                <div className="year" onClick={() => backToYearPage()}>
                                    {selectedYear}
                                </div>
                                <img src={ebooks.icons.RightArrowStroke} alt="" />
                                <div className="month">
                                    {selectedMonth} {selectedYear}
                                </div>
                            </div>
                            <div className="monthlybook-buysection">
                                <div className="book-imagesection">
                                    <img src={booksData[whichBook].imgUrl} alt="" />
                                </div>
                                <div className="book-contentsection">
                                    <div className="book-navigator">
                                        <div className="stock" style={booksData[whichBook].availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}>
                                            {booksData[whichBook].availability}
                                        </div>
                                        <div className="prev-next">
                                            <div className="prev" >
                                                <img src={ebooks.icons.Previous} alt="Left Arrow" disabled={whichBook === "0"} onClick={() => changeBook("prev")} />
                                                &nbsp;
                                                Previous
                                            </div>
                                            <div className="nxt">

                                                Next
                                                &nbsp;
                                                <img src={ebooks.icons.Next} alt="Right Arrow" disabled={parseInt(whichBook) === booksData.length - 1} onClick={() => changeBook("nxt")} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title-section">
                                        <div className="title">
                                            {booksData[whichBook].title}
                                        </div>
                                        <div className="subtext">
                                            <div className="author">
                                                Author: {booksData[whichBook].author}
                                            </div>
                                        </div>
                                        <div className="shortdesc">
                                            {booksData[whichBook].shortDesc}
                                        </div>
                                        <div className="listen-copy-buy-section">
                                            <div className="tab-content">
                                                {/* {activeTab === "AUDIO" &&  */}
                                                <div className="audio">
                                                    <div className="audio-buy">
                                                        {
                                                            isUserLoggedIn && !openModal ?
                                                            <>
                                                            <div className="plans">
                                                            Please subscribe to hear the audio
                                                            &nbsp;
                                                            <a onClick={handleOpen} style={{ cursor: "pointer" }}>
                                                                View Plan</a>
                                                        </div>
                                                            <div className="subscribe-section">
                                                            <Button variant="text" sx={{
                                                                borderRadius: "40px",
                                                                width: "10rem",
                                                                p: "10px",
                                                                background: "#F09300",
                                                                textTransform: "none",
                                                                marginTop: "2rem",
                                                                color: "#FFFFFF",
                                                                fontWeight: "700",
                                                                justifyContent: "space-evenly"
                                                            }} onClick={() => navigateToListenPage()}>
                                                                Listen Now
                                                            </Button>
                                                        </div>
                                                        </>
                                                        :
                                                        <>
                                                        <div className="plans">
                                                            Please subscribe to hear the audio
                                                            &nbsp;
                                                            <a onClick={handleOpen} style={{ cursor: "pointer" }}>
                                                                View Plan</a>
                                                        </div>
                                                        <div className="subscribe-section">
                                                            <Button variant="text" sx={{
                                                                borderRadius: "40px",
                                                                width: "10rem",
                                                                p: "10px",
                                                                background: "#999999",
                                                                textTransform: "none",
                                                                marginTop: "2rem",
                                                                color: "#444444",
                                                                fontWeight: "700",
                                                                justifyContent: "space-evenly"
                                                            }}
                                                            // onClick={()=>loginPopup()} 
                                                            >


                                                                <img src={ebooks.icons.Lock} style={{ width: "1rem", height: "1.5rem" }} />
                                                                Login to listen
                                                            </Button>
                                                        </div>
                                                        <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    width: 1000,
                                                                    bgcolor: 'background.paper',
                                                                    boxShadow: 24,
                                                                    borderRadius: '8px',
                                                                    p: 4,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: 3,
                                                                }}
                                                            >
                                                                <IconButton
                                                                    onClick={handleClose}
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        top: 10,
                                                                        right: 10,
                                                                        color: 'gray',
                                                                    }}
                                                                >
                                                                    <CloseIcon />
                                                                </IconButton>
                                                                <Container maxWidth="md">
                                                                    <Box textAlign="center" my={4}>
                                                                        <Typography variant="h4" gutterBottom>
                                                                            Choose Your Plan
                                                                        </Typography>
                                                                        <Typography variant="subtitle1">
                                                                            Select the perfect subscription plan for your needs
                                                                        </Typography>
                                                                    </Box>
                                                                    <Grid container spacing={2}>
                                                                        {plans.map((plan, index) => (
                                                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                                                <Card
                                                                                    variant="outlined"
                                                                                    sx={{
                                                                                        display: "flex",
                                                                                        flexDirection: "column",
                                                                                        height: "100%",
                                                                                    }}
                                                                                >
                                                                                    <CardContent sx={{ flexGrow: 1, fontWeight: 600 }}>
                                                                                        <Typography sx={{ fontSize: "1.2rem" }} variant="h6" gutterBottom>
                                                                                            {plan.name}
                                                                                        </Typography>
                                                                                        <Typography sx={{ fontSize: '2rem', fontWeight: 500, color: "black" }} variant="h4" color="primary" gutterBottom>
                                                                                            {plan.price}
                                                                                        </Typography>
                                                                                        <List>
                                                                                            {plan.features.map((feature, idx) => (
                                                                                                <ListItem key={idx} disableGutters>
                                                                                                    <ListItemIcon>
                                                                                                        <ListItemIcon>
                                                                                                            <CheckCircleIcon sx={{ color: "rgb(34 197 94)" }} />
                                                                                                        </ListItemIcon>
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary={feature} />
                                                                                                </ListItem>
                                                                                            ))}
                                                                                        </List>
                                                                                    </CardContent>
                                                                                    <Box textAlign="center" mb={2} sx={{ px: 2 }}>
                                                                                        <Button
                                                                                            onClick={() => payNow(plan.name)}
                                                                                            variant="contained"
                                                                                            style={{ ...plan.buttonStyle, width: "100%", padding: "10px 0" }}
                                                                                        >
                                                                                            {plan.buttonLabel}
                                                                                        </Button>
                                                                                    </Box>
                                                                                </Card>
                                                                            </Grid>
                                                                        ))}
                                                                    </Grid>
                                                                </Container>
                                                            </Box>
                                                        </Modal>
                                                        <LoginModal open={showLoginModal} onClose={handleLoginClose} />
                                                         </>
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="desc-info">
                                <div className="desc-info-tabs">
                                    <button
                                        className={`tab-underscore active`}
                                    >
                                        Description
                                    </button>
                                </div>

                                <div className="desc-tab-content">
                                        <div className="desc">
                                            {booksData[whichBook].desc}
                                        </div>
                                </div>

                            </div>
                            <div className="otherbooks">
                                <div className="otherbooks-title">
                                    <div className="text">
                                        Other E-Magazines

                                    </div>
                                    <div className="hdivider">
                                        <img src={ebooks.icons.HorizontalDivider} alt="" />
                                    </div>
                                </div>
                                <div className="book-cards">
                                    {booksData.map((e, i) => {

                                        if (i != whichBook) {
                                            return (

                                                <div className="book-card">
                                                    <img src={e.img} alt="" />
                                                    <div className="text">
                                                        {e.title}
                                                        <br />
                                                        {e.author}
                                                    </div>
                                                    <button className="read-now" value={i} onClick={(e) => changeBook(e.target.value)}>Read now</button>
                                                </div>

                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </>
            }

        </Container>
    )
}

