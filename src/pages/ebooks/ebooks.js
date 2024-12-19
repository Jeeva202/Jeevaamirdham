import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState } from "react";
import { styled } from '@mui/material/styles';
import {
    Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button, Modal, Typography,
    Box, List, ListItem, ListItemIcon, ListItemText, IconButton,
    Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CartModal from "../../components/cart/cartModal";
import { useDispatch, useSelector } from "react-redux";
import { openCart, selectIsCartOpen } from "../../redux/cartSlice";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Playstore from "../../components/playstore/playstore"
import NewsLetter from "../../components/newsLetter/newsletter"
import KPI from "../../components/kpi/kpi"
export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [listenPage, setListenPage] = useState(false)
    const [categoryCartFlag, setCategoryCartFlag] = useState(false)
    const [selectedYear, setSelectedYear] = useState(NaN);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);
    const [catSelectedBook, setCatSelectedBook] = useState("0")
    const [activeTab, setActiveTab] = useState("AUDIO");
    const [periodTab, setPeriodTab] = useState("MONTHLY")
    const itemsPerPage = 3; // Items per page for the buy section
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfYear, setNoOfYear] = useState(1);
    const [noOfMonth, setNoOfMonth] = useState(1)
    const [quantity, setQuantity] = useState(1)
    const [descTab, setDescTab] = useState("Description")
    const [whichBook, setWhichBook] = useState("0");
    const [openModal, setOpenModal] = useState(false);
    const [paid, setPaid] = useState(false)

    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsCartOpen)
    const handleAddToCart = () => {
        dispatch(openCart());
    };
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

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
    const shopBooksData = [
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            shortDesc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            additionalInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel turpis a felis facilisis dapibus non ut enim. Nulla ac turpis ac nisi malesuada interdum. Sed lacinia vel felis et tempor. Integer sit amet purus eget velit egestas hendrerit. Nam eget risus nec justo suscipit tincidunt.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png",
            availability: "IN STOCK",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன், BE .,",
            category_tag: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary"
        }
    ];



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
    const bookData = [
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book1.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book2.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book3.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book4.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book5.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "IN STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book6.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },
        {
            genre: "GNANAM",
            availability: "OUT OF STOCK",
            title: "சித்தர்கள் அருளிய வாழ்வியல் வழிகாட்டி",
            author: "ஜீவஅமிர்தம்  கோ.திருமுகன்,   BE .,",
            id: "SKU: INT280",
            shortDesc: "Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur etea.",
            category: "Action & Adventure, Activity Books",
            tag: "Books, Fiction, Romance - Contemporary",
            img: "/assets/images/2024_January_book7.svg",
            cost: "₹ 1000",
            desc: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.",
            additionalInfo: "Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo. Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae. Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut. Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta."
        },

    ]

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: "22vw",
            top: "0vh",
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '25px 13px',
            background: "#F09300",
            color: "white",
            borderRadius: "50%",
        },
    }));
    const totalPages = Math.ceil(shopBooksData.length / itemsPerPage);
    const currentItems = shopBooksData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
        setActiveTab("AUDIO")
        setPeriodTab("MONTHLY")
        setDescTab("Description")
    }
    const backToAllYearPage = () => {
        setAllYears(true)
        setSelectedMonth(null)
        setSelectedYear(NaN)
        setWhichBook("0")
        setActiveTab("AUDIO")
        setPeriodTab("MONTHLY")
        setDescTab("Description")
    }
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory([...selectedCategory, categoryId]);
    };
    const redirectToMonthPage = (month) => {
        setSelectedMonth(month)
    }
    const decrease = (x) => {
        if (x != 1) {
            setQuantity(x - 1)
        }
    }
    const increase = (x) => {
        setQuantity(x + 1)
    }

    const changeBook = (e, page = "monthly") => {
        console.log("e", e);

        if (e == "prev") {

            if (parseInt(whichBook) > 0) {
                setWhichBook((parseInt(whichBook) - 1).toString())
            }
        }
        else if (e == "nxt") {

            console.log("Before", "whichbook", whichBook, "length", bookData.length);
            if (parseInt(whichBook) < bookData.length - 1) {
                setWhichBook((parseInt(whichBook) + 1).toString())
            }
            console.log("After", "whichbook", whichBook, "length", bookData.length);
        }
        else if (e == "cat-prev") {
            if (parseInt(catSelectedBook) > 0) {
                setCatSelectedBook((parseInt(catSelectedBook) - 1).toString())
            }
        }
        else if (e == "cat-nxt") {
            if (parseInt(catSelectedBook) < shopBooksData.length - 1) {
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

    const payNow = (money) => {
        handleClose();
        setPaid(true)

    }
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
                    <div className="ebook">
                        <div className="title">
                            <div className="emagazine">
                                E-Magazine
                            </div>
                            <div className="hdivider">
                                <img src={ebooks.icons.HorizontalDivider} alt="" />
                            </div>
                        </div>
                        <div className="year-wise">
                            {YearWiseEbooks.map((e) => (
                                <div className="year-wrapper">
                                    <img src={e.img} alt="" />
                                    <ViewAll text={e.year} width="10rem" padding={"0.4rem 2rem"} onClick={() => redirectToYearPage(e.year)} />
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="shop-section">
                        <div className="title">
                            <div className="shop-book">
                                Shop Books
                            </div>
                            <div className="hdivider">
                                <img src={ebooks.icons.HorizontalDivider} alt="" />
                            </div>
                        </div>
                        <div className="shopcontent">
                            <div className="genre">
                                <Card sx={{ maxWidth: 400, borderRadius: "10px", border: "1px solid #ccc" }} variant="outlined">
                                    <CardHeader
                                        title="Genre"
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
                                            >
                                                <input type="checkbox" id={category.id} name="checkbox" value={category.id} />
                                                <label for={category.id}> {category.label}</label>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="buy-section">
                                {currentItems.map((e, i) => (
                                    <div className="book">
                                        <div className="img-section">
                                            <StyledBadge badgeContent={e.discount}>
                                                <img src={e.img} alt="" />
                                            </StyledBadge>
                                        </div>
                                        <div className="content-section">
                                            <div className="title" onClick={() => navigateToProductSpecificPage(i)}>{e.title}</div>
                                            <div className="subtitle">{e.subtitle}</div>
                                            <div className="desc">{e.desc}</div>
                                            <div className="price">
                                                {e.offPrice}
                                                <span>{e.orgPrice}</span>
                                            </div>
                                            <Button variant="text" sx={{
                                                borderRadius: "40px",
                                                width: "10rem",
                                                p: "10px",
                                                background: "#F09300",
                                                textTransform: "none",
                                                marginTop: "2rem",
                                                color: "black"
                                            }} onClick={handleAddToCart}>

                                                <img src={ebooks.icons.cart} style={{ width: "1rem" }} />
                                                Add to Cart
                                            </Button>
                                            <CartModal open={isOpen} />
                                        </div>
                                    </div>

                                ))}

                            </div>

                        </div>
                        <div className="pagination">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                siblingCount={0} // Adjust sibling count if needed
                                boundaryCount={1}
                                renderItem={(item) => (
                                    <Button
                                        variant="text"
                                        onClick={() => handlePageChange(null, item.page)}
                                        sx={{
                                            ...(item.page === currentPage && {
                                                backgroundColor: "#FCCC4D",
                                                color: "#7F56D9",
                                            }),
                                        }}
                                        disabled={
                                            (item.type === "previous" && currentPage === 1) ||
                                            (item.type === "next" && currentPage === totalPages)
                                        } // Disable when on first or last page
                                    >
                                        {item.type === "previous" ? (
                                            <>
                                                <img src={ebooks.icons.Previous} alt="Left Arrow" />
                                                Previous
                                            </>
                                        ) : item.type === "next" ? (
                                            <>
                                                Next
                                                <img src={ebooks.icons.Next} alt="Right Arrow" />
                                            </>
                                        ) : (
                                            item.page
                                        )}
                                    </Button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            ) : (categoryCartFlag) ?
                <>
                    <div className="category-navigation">
                        <a className="back" onClick={() => backToHomePage()}>
                            Home
                        </a>
                        <img src={ebooks.icons.RightArrowStroke} alt="" />
                        <div className="nav-category" onClick={() => { }}>
                            CATEGORY
                        </div>
                        <img src={ebooks.icons.RightArrowStroke} alt="" />
                        <div className="nav-book">
                            {shopBooksData[catSelectedBook].title}
                        </div>
                    </div>
                    <div className="categorybook-buysection">
                        <div className="book-imagesection">
                            <img src={shopBooksData[catSelectedBook].img} alt="" />
                        </div>
                        <div className="book-contentsection">
                            <div className="book-navigator">
                                <div className="stock" style={shopBooksData[catSelectedBook].availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}>
                                    {shopBooksData[catSelectedBook].availability}
                                </div>
                                <div className="prev-next">
                                    <div className="prev" >
                                        <img src={ebooks.icons.Previous} alt="Left Arrow" disabled={catSelectedBook === "0"} onClick={() => changeBook("cat-prev")} />
                                        &nbsp;
                                        PREV
                                    </div>
                                    <div className="nxt">

                                        NEXT
                                        &nbsp;
                                        <img src={ebooks.icons.Next} alt="Right Arrow" disabled={parseInt(catSelectedBook) === shopBooksData.length - 1} onClick={() => changeBook("cat-nxt")} />
                                    </div>
                                </div>
                            </div>
                            <div className="title-section">
                                <div className="title">
                                    {shopBooksData[catSelectedBook].title}
                                </div>
                                <div className="subtext">
                                    <div className="author">
                                        Author: {shopBooksData[catSelectedBook].author}
                                    </div>
                                    <div className="id">
                                        {shopBooksData[catSelectedBook].id}
                                    </div>
                                </div>
                                <div className="shortdesc">
                                    {shopBooksData[catSelectedBook].shortDesc}
                                </div>
                                <div className="category-buy-section">
                                    <div className="tab-content">
                                        <div className="quantity-select">
                                            <div className="count-subscribe">
                                                Quantity
                                                <br />
                                                <br />
                                                <div className="counter">
                                                    <span className="decrease" onClick={() => { decrease(quantity) }}> - </span>
                                                    &nbsp;
                                                    <span className="quantity"> {quantity} </span>
                                                    &nbsp;
                                                    <span className="increase" onClick={() => { increase(quantity) }}> + </span>
                                                </div>
                                            </div>
                                            <Button variant="text" sx={{
                                                borderRadius: "40px",
                                                width: "10rem",
                                                p: "10px",
                                                background: "#F09300",
                                                textTransform: "none",
                                                marginTop: "2rem",
                                                color: "#ffffff",
                                                fontWeight: "700",
                                                justifyContent: "space-evenly"
                                            }} onClick={handleAddToCart}>

                                                <img src={ebooks.icons.cart} style={{ width: "1rem", height: "1.5rem", filter: "invert(100%)" }} />
                                                Add to cart
                                            </Button>
                                            <CartModal open={isOpen} />
                                        </div>

                                        <div className="cat-tag">
                                            Categories: {shopBooksData[catSelectedBook].category_tag}
                                            <br></br>
                                            Tags: {shopBooksData[catSelectedBook].tag}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="desc-info">
                        <div className="desc-info-tabs">
                            <button
                                className={`tab-underscore ${descTab === "Description" ? "active" : ""}`}
                                onClick={() => setDescTab("Description")}
                            >
                                Description
                            </button>
                            <button
                                className={`tab-underscore ${descTab === "add-info" ? "active" : ""}`}
                                onClick={() => setDescTab("add-info")}
                            >
                                Additional information
                            </button>
                        </div>

                        <div className="desc-tab-content">
                            {descTab === "Description" &&
                                <div className="desc">
                                    {shopBooksData[catSelectedBook].desc}
                                </div>}
                            {descTab === "add-info" && <div>
                                {shopBooksData[catSelectedBook].additionalInfo}
                            </div>}
                        </div>

                    </div>
                    <div className="otherbooks">
                        <div className="otherbooks-title">
                            <div className="text">
                                Related products
                            </div>
                            <div className="hdivider">
                                <img src={ebooks.icons.HorizontalDivider} alt="" />
                            </div>
                        </div>
                        <div className="book-cards">
                            {shopBooksData.map((e, i) => {

                                if (i != catSelectedBook) {
                                    return (

                                        <div className="cat-book-card" onClick={(e) => changeBook(i, "catgeorypage")}>
                                            <img src={e.img} alt="" />
                                            <div className="text">
                                                {e.title}
                                                <br />
                                                {e.author}
                                            </div>
                                            <button className="read-now" value={i} >{e.offPrice}</button>
                                        </div>

                                    )
                                }
                            })}
                        </div>
                    </div>
                </>
                : (selectedMonth === null) && (!isNaN(selectedYear)) ?
                    <>
                        <div className="Year-navigation">
                            <a className="back" onClick={() => backToAllYearPage()}>
                                E-MAGAZINE
                            </a>
                            <img src={ebooks.icons.RightArrowStroke} alt="" />
                            <div className="year">
                                {selectedYear}
                            </div>
                        </div>
                        <div className="ebooks-one-year">
                            <div className="month-wise">
                                {oneYearBook.map((e) => (
                                    <div className="month-wrapper">
                                        <img src={e.img} alt="" />
                                        <ViewAll text={e.month + " " + selectedYear} width="11rem"
                                            onClick={() => redirectToMonthPage(e.month)}
                                        />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </>
                    : (listenPage)
                        ?
                        <>
                            <div className="home-navigation">
                                <a className="back" onClick={() => backToAllYearPage()}>
                                    Home
                                </a>
                                <img src={ebooks.icons.RightArrowStroke} alt="" />
                                <div className="nav-buy-book" onClick={() => backToBookBuySection()}>
                                    {bookData[whichBook].genre}
                                </div>
                                <img src={ebooks.icons.RightArrowStroke} alt="" />
                                <div className="nav-title">
                                    {bookData[whichBook].title}
                                </div>
                            </div>
                            <div className="img-details-section">
                                <img src={audioData[whichBook].img} alt="" />
                                <div className="details">
                                    {audioData[whichBook].details}
                                </div>
                            </div>
                            <div className="audio-section">
                                <div className="audio-cat">
                                    {audioData[whichBook].genre}
                                </div>
                                <div className="audio-subtext">
                                    <div className="audio-date">
                                        {audioData[whichBook].date} / {audioData[whichBook].by}
                                    </div>
                                    <div className="views">
                                        <img src={ebooks.icons.view} alt="" />
                                        <div className="view-number">
                                            200
                                        </div>
                                    </div>
                                </div>
                                <div className="audio-title-section">
                                    <div className="audio-title">
                                        {audioData[whichBook].title}
                                    </div>
                                    <button className="audio-playall">
                                        Play All
                                    </button>
                                </div>
                                <div className="audio-play-section">

                                    {audioData[whichBook].audio_content.map((audio, index) => (
                                        <Accordion sx={{ boxShadow: "none", background: "#FCCC4D", borderRadius: "10px" }}>
                                            <AccordionSummary sx={{}}
                                                expandIcon={<ArrowDropDownIcon />}
                                                aria-controls="panel2-content"
                                                id="panel2-header"
                                            >
                                                <div className="audio-play-title">
                                                    <div className="index">
                                                        {index + 1}
                                                    </div>
                                                    <Typography className="audio-play-title">{audio.title}</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="player-transcript-section">
                                                    <div className="player">
                                                        {/* Header */}
                                                        <div className="audio-header">
                                                            <img
                                                                src="/assets/images/audio.svg" // Replace with actual image URL
                                                                alt="Audio Thumbnail"
                                                                className="audio-image"
                                                            />
                                                            <div className="audio-details">
                                                                <h3 className="audio-title">{audioData[whichBook].title}</h3>
                                                                <p className="audio-author">{audioData[whichBook].author}</p>
                                                                {/* Audio Player */}
                                                                <audio controls

                                                                    disablepictureinpicture
                                                                    controlslist="nodownload noplaybackrate" className="audio-element">
                                                                    <source
                                                                        src={audio.audio} // Replace with actual audio source
                                                                        type="audio/mpeg"
                                                                    />
                                                                    Your browser does not support the audio element.
                                                                </audio>
                                                            </div>
                                                        </div>



                                                        {/* Transcript */}
                                                        <div className="audio-transcript">
                                                            <p>
                                                                {audio.transcript}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* <Typography>
                                                        {audio.transcript}
                                                    </Typography> */}
                                                </div>

                                            </AccordionDetails>
                                        </Accordion>
                                    ))}

                                </div>
                                <div className="audio-prev-nxt">
                                    <div className="audio-prev" onClick={() => openPreviousAudioBook()}>

                                        {parseInt(whichBook) != 0 ?
                                            <>
                                                <img src={audioData[(parseInt(whichBook) - 1).toString()].img} alt="" />
                                                <div className="audio-prev-text">
                                                    <div className="prev">
                                                        PREV
                                                    </div>
                                                    <div className="prev-title">
                                                        {audioData[(parseInt(whichBook) - 1).toString()].title}
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                        }
                                    </div>


                                    <div className="audio-nxt">

                                        {parseInt(whichBook) < audioData.length ?
                                            <>
                                                <div className="audio-nxt-text">
                                                    <div className="nxt">
                                                        NEXT
                                                    </div>
                                                    <div className="nxt-title">
                                                        {audioData[(parseInt(whichBook) + 1).toString()].title}
                                                    </div>
                                                </div>
                                                <img src={audioData[(parseInt(whichBook) + 1).toString()].img} alt="" />

                                            </>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>
                                <div className="other-ebooks">
                                    {[1, 2, 3].map((e, i) => (
                                        <div className="other-b0ok">
                                        <img src="/assets/images/other-ebooks.svg" alt=""/>
                                        <div className="other-ebook-subtext">

                                            November 14, 2022 / BY ADMIN
                                        </div>
                                        <div className="comments-views">
                                            <div className="comments">
                                                <img src={ebooks.icons.comment} alt=""/>
                                                <div className="comment-num">
                                                    200
                                                </div>
                                            </div>
                                            <div className="views">
                                                <img src={ebooks.icons.view} alt=""/>
                                                <div className="view-num">
                                                    800
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="other-book-title">
                                        Bow down to the universe 
                                        </div>
                                        <div className="other-book-desc">
                                        The universe constantly teaches you what is needed and what is not. It is true that this immensely compassionate universe offers such guidance. Bow down and revere this natural cosmos.
                                        </div>
                                        <div className="other-book-cat-read-more">
                                            <div className="other-book-cat">
                                                IN <span>GNANAM</span>
                                            </div>
                                            <div className="other-book-read-more">
                                                Read More
                                            </div>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Playstore/>
                            <NewsLetter/>
                            <KPI/>
                        </> :
                        <>
                            <div className="Month-navigation">
                                <a className="back" onClick={() => backToAllYearPage()}>
                                    E-Book
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
                                    <img src={bookData[whichBook].img} alt="" />
                                </div>
                                <div className="book-contentsection">
                                    <div className="book-navigator">
                                        <div className="stock" style={bookData[whichBook].availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}>
                                            {bookData[whichBook].availability}
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
                                                <img src={ebooks.icons.Next} alt="Right Arrow" disabled={parseInt(whichBook) === bookData.length - 1} onClick={() => changeBook("nxt")} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title-section">
                                        <div className="title">
                                            {bookData[whichBook].title}
                                        </div>
                                        <div className="subtext">
                                            <div className="author">
                                                Author: {bookData[whichBook].author}
                                            </div>
                                            <div className="id">
                                                {bookData[whichBook].id}
                                            </div>
                                        </div>
                                        <div className="shortdesc">
                                            {bookData[whichBook].shortDesc}
                                        </div>
                                        <div className="listen-copy-buy-section">
                                            Select Format : {activeTab}
                                            <div className="tabs">
                                                <button
                                                    className={`tab-button ${activeTab === "AUDIO" ? "active" : ""}`}
                                                    onClick={() => setActiveTab("AUDIO")}
                                                >
                                                    AUDIO
                                                </button>
                                                <button
                                                    className={`tab-button ${activeTab === "HARDCOPY" ? "active" : ""}`}
                                                    onClick={() => setActiveTab("HARDCOPY")}
                                                >
                                                    HARDCOPY
                                                </button>
                                            </div>
                                            <div className="tab-content">
                                                {activeTab === "AUDIO" && <div className="audio">
                                                    <div className="audio-buy">

                                                        {paid == false ?
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
                                                                    }} disabled >


                                                                        <img src={ebooks.icons.Lock} style={{ width: "1rem", height: "1.5rem" }} />
                                                                        Listen Now
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
                                                                        <Typography id="modal-title" variant="h5" sx={{ fontWeight: '400', lineHeight: "30px", fontSize: "1.5rem", fontFamily: "Sora,'san-serif'" }}>
                                                                            View our Plans
                                                                        </Typography>

                                                                        <Box display="flex" justifyContent="space-between">
                                                                            {/* Features List */}
                                                                            <Box
                                                                                sx={{
                                                                                    display: 'grid',
                                                                                    gridTemplateColumns: '1fr 1fr',
                                                                                    gap: "10px",
                                                                                    width: '65%',
                                                                                    alignContent: "space-evenly"
                                                                                }}
                                                                            >
                                                                                {[
                                                                                    'Full Access to Landingfolio',
                                                                                    '100 GB Free Storage',
                                                                                    'Unlimited Visitors',
                                                                                    '10 Agents',
                                                                                    'Live Chat Support',
                                                                                    'Live Chat Support',
                                                                                    'Live Chat Support',
                                                                                    'Live Chat Support',
                                                                                ].map((item, index) => (
                                                                                    <ListItem key={index} sx={{ p: 0 }}>
                                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                                            <ListItemIcon>
                                                                                                <CheckCircleIcon color="#71717A" />
                                                                                            </ListItemIcon>
                                                                                            <ListItemText primary={item} sx={{ color: "#12121299", fontFamily: "Sora, 'san-serif", fontSize: "1rem", fontWeight: "500" }} />
                                                                                        </Box>
                                                                                        <IconButton
                                                                                            sx={{
                                                                                                margin: "5px",
                                                                                                color: 'white',
                                                                                                backgroundColor: 'grey',
                                                                                                borderRadius: '50%',
                                                                                                padding: '0.5px',
                                                                                                '&:hover': {
                                                                                                    backgroundColor: 'grey',
                                                                                                }
                                                                                            }}
                                                                                            aria-label="info">
                                                                                            <InfoIcon sx={{ fontSize: '1.25rem' }} />
                                                                                        </IconButton>
                                                                                    </ListItem>

                                                                                ))}
                                                                            </Box>

                                                                            {/* Plan Details */}
                                                                            <Box
                                                                                sx={{
                                                                                    width: '35%',
                                                                                    borderLeft: '1px solid #99999999',
                                                                                    borderRadius: '8px',
                                                                                    p: 2,
                                                                                    textAlign: 'center',
                                                                                }}
                                                                            >
                                                                                <Typography variant="h6" sx={{ fontWeight: '400', fontSize: "1.1rem", fontFamily: "Sora, 'sans-serif'" }}>
                                                                                    Lifetime Plan
                                                                                </Typography>
                                                                                <Typography
                                                                                    sx={{ fontWeight: '400', fontSize: "3.5rem", fontFamily: "Sora, 'sans-serif'", color: '#000000', lineHeight: "66px", mt: 1 }}
                                                                                >
                                                                                    {bookData[whichBook].cost}
                                                                                </Typography>
                                                                                <Typography sx={{ mt: 1, fontSize: '0.9rem', color: '#a1a1a1', fontWeight: '400', fontFamily: "Sora, 'sans-serif'", lineHeight: "24px" }}>
                                                                                    All the features to boost your career
                                                                                </Typography>
                                                                                <Button
                                                                                    variant="contained"
                                                                                    sx={{
                                                                                        backgroundColor: '#F09300',
                                                                                        color: '#fff',
                                                                                        textTransform: 'none',
                                                                                        fontWeight: 'bold',
                                                                                        mt: 2,
                                                                                        padding: "10px",
                                                                                        width: '100%',
                                                                                    }}
                                                                                    onClick={() => payNow(bookData[whichBook].cost)}
                                                                                >
                                                                                    Pay Now
                                                                                </Button>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Modal> </>
                                                            :
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
                                                        }


                                                    </div>
                                                </div>}
                                                {activeTab === "HARDCOPY" && <div className="hardcopy">
                                                    Please select subscription
                                                    <div className="period-tabs">
                                                        <div className="buttons">
                                                            <button
                                                                className={`tab-button ${periodTab === "MONTHLY" ? "active" : ""}`}
                                                                onClick={() => setPeriodTab("MONTHLY")}
                                                            >
                                                                MONTHLY
                                                            </button>
                                                            <button
                                                                className={`tab-button ${periodTab === "YEARLY" ? "active" : ""}`}
                                                                onClick={() => setPeriodTab("YEARLY")}
                                                            >
                                                                YEARLY
                                                            </button>
                                                            <div className="period-tab-content">
                                                                {periodTab === "MONTHLY" && <div>
                                                                    <div className="month-selection">
                                                                        <label htmlFor="month">Select months</label>
                                                                        <input type="number"
                                                                            name="month"
                                                                            id="month"
                                                                            min="1"
                                                                            step="1"
                                                                            value={noOfMonth}
                                                                            onChange={(e) => setNoOfMonth(e.target.value)}
                                                                        />
                                                                    </div>

                                                                </div>}
                                                                {periodTab === "YEARLY" && <div>
                                                                    <div className="year-selection">
                                                                        <label htmlFor="year">Select years</label>
                                                                        <input type="number"
                                                                            name="year"
                                                                            id="year"
                                                                            min="1"
                                                                            step="1"
                                                                            value={noOfYear}
                                                                            onChange={(e) => setNoOfYear(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>

                                                        <div className="note">
                                                            <span>Please note</span>: Your subscription will commence with the next issue of the E-magazine, starting from the subscription date.
                                                        </div>
                                                        <div className="quantity-select">
                                                            <div className="count-subscribe">
                                                                Quantity
                                                                <br />
                                                                <br />
                                                                <div className="counter">
                                                                    <span className="decrease" onClick={() => { decrease(quantity) }}> - </span>
                                                                    &nbsp;
                                                                    <span className="quantity"> {quantity} </span>
                                                                    &nbsp;
                                                                    <span className="increase" onClick={() => { increase(quantity) }}> + </span>
                                                                </div>
                                                            </div>
                                                            <Button variant="text" sx={{
                                                                borderRadius: "40px",
                                                                width: "10rem",
                                                                p: "10px",
                                                                background: "#F09300",
                                                                textTransform: "none",
                                                                marginTop: "2rem",
                                                                color: "#ffffff",
                                                                fontWeight: "700",
                                                                justifyContent: "space-evenly"
                                                            }} >

                                                                <img src={ebooks.icons.cart} style={{ width: "1rem", height: "1.5rem", filter: "invert(100%)" }} />
                                                                Subscribe
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                }

                                                <div className="cat-tag">
                                                    Categories: {bookData[whichBook].category}
                                                    <br></br>
                                                    Tags: {bookData[whichBook].tag}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="desc-info">
                                <div className="desc-info-tabs">
                                    <button
                                        className={`tab-underscore ${descTab === "Description" ? "active" : ""}`}
                                        onClick={() => setDescTab("Description")}
                                    >
                                        Description
                                    </button>
                                    <button
                                        className={`tab-underscore ${descTab === "add-info" ? "active" : ""}`}
                                        onClick={() => setDescTab("add-info")}
                                    >
                                        Additional information
                                    </button>
                                </div>

                                <div className="desc-tab-content">
                                    {descTab === "Description" &&
                                        <div className="desc">
                                            {bookData[whichBook].desc}
                                        </div>}
                                    {descTab === "add-info" && <div>
                                        {bookData[whichBook].additionalInfo}
                                    </div>}
                                </div>

                            </div>
                            <div className="otherbooks">
                                <div className="otherbooks-title">
                                    <div className="text">
                                        Other Ebooks

                                    </div>
                                    <div className="hdivider">
                                        <img src={ebooks.icons.HorizontalDivider} alt="" />
                                    </div>
                                </div>
                                <div className="book-cards">
                                    {bookData.map((e, i) => {

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