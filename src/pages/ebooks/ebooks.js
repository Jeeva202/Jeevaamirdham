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
import { openLogin, setUserLoggedIn, selectUserId, setCartDetails, setBooksData,selectCartDetails } from '../../redux/cartSlice'
import { Loader } from "../../components/loader/loader";
import SubscriptionModal from "../../components/subscriptionModal/subscriptionModal";
import Gif_Loader from "../../components/loader/Gif_Loader";

export default function Ebooks({selectedYear, setSelectedYear, allYears, setAllYears, selectedMonth, setSelectedMonth }) {
    const [listenPage, setListenPage] = useState(false)
    const [categoryCartFlag, setCategoryCartFlag] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);
    const [catSelectedBook, setCatSelectedBook] = useState("0")
    const [audioData, setAudioData] = useState(null);
    const [prevMagazine, setPrevMagazine] = useState(null); 
    const [nextMagazine, setNextMagazine] = useState(null);
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
    const isUserLoggedInFromStore = useSelector((state) => state.cart.isUserLoggedIn);
    const isUserLoggedIn = isUserLoggedInFromStore !== undefined ? isUserLoggedInFromStore : !!localStorage.getItem('id');
    console.log("is user logged in", isUserLoggedIn);
    const cartDetails = useSelector(selectCartDetails)
    const userId = useSelector(selectUserId)
    const isOpen = useSelector(selectIsCartOpen)
    const handleAddToCart = async (book, quantity) => {
        if(isUserLoggedIn){
            console.log("user id", userId);
                const addtocart = await axios.post(process.env.REACT_APP_URL+'/ebooks/add_to_cart', {
    
                userId: userId,
                book: book.id,
                quantity: quantity
            });
            const cartDetailsfromAPI = addtocart.data.cart_details;
    
            console.log(addtocart, "Buy Now");
    
            // Dispatch an action to update the Redux store with the updated cart details
            dispatch(setCartDetails(cartDetailsfromAPI)); // This will update the cartDetails in Redux
        }
        else {
            let noLoginCartData = [...cartDetails]; // Create a shallow copy of cartDetails
            const existingBookIndex = noLoginCartData.findIndex(item => item.book_id === book.id);
    
            if (existingBookIndex !== -1) {
                // Create a new object for the existing book to avoid direct mutation
                noLoginCartData[existingBookIndex] = {
                    ...noLoginCartData[existingBookIndex],
                    quantity: noLoginCartData[existingBookIndex].quantity + quantity // Update quantity
                };
            } else {
                noLoginCartData.push({ book_id: book.id, quantity: quantity || 1 });
            }
    
            console.log("no login", noLoginCartData);
            dispatch(setCartDetails(noLoginCartData)); // Update the cart details in Redux
        }
        console.log("cartdetails",cartDetails);
        
        dispatch(openCart()); 
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
    // const YearWiseEbooks = [
    //     {
    //         year: 2024,
    //         img: "/assets/images/ebook_2024.svg"
    //     },
    //     {
    //         year: 2023,
    //         img: "/assets/images/ebook_2023.svg"
    //     },
    //     {
    //         year: 2022,
    //         img: "/assets/images/ebook_2022.svg"
    //     },
    //     {
    //         year: 2021,
    //         img: "/assets/images/ebook_2021.svg"
    //     },
    //     {
    //         year: 2020,
    //         img: "/assets/images/ebook_2020.svg"
    //     },
    //     {
    //         year: 2019,
    //         img: "/assets/images/ebook_2019.svg"
    //     }, {
    //         year: 2018,
    //         img: "/assets/images/ebook_2018.svg"
    //     }
    // ]
    const oneYearBook = [
        { month: "January", img: "/assets/images/ebook_jan.svg", monthInNumber: 1 },
        { month: "February", img: "/assets/images/ebook_feb.svg", monthInNumber: 2 },
        { month: "March", img: "/assets/images/ebook_mar.svg", monthInNumber: 3 },
        { month: "April", img: "/assets/images/ebook_apr.svg", monthInNumber: 4 },
        { month: "May", img: "/assets/images/ebook_may.svg", monthInNumber: 5 },
        { month: "June", img: "/assets/images/ebook_jun.svg", monthInNumber: 6 },
        { month: "July", img: "/assets/images/ebook_jul.svg", monthInNumber: 7 },
        { month: "August", img: "/assets/images/ebook_aug.svg", monthInNumber: 8 },
        { month: "September", img: "/assets/images/ebook_sep.svg", monthInNumber: 9 },
        { month: "October", img: "/assets/images/ebook_oct.svg", monthInNumber: 10 },
        { month: "November", img: "/assets/images/ebook_nov.svg", monthInNumber: 11 },
        { month: "December", img: "/assets/images/ebook_dec.svg", monthInNumber: 12 },
    ];

    const monthMapping = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
    };
    const reverseMonthMapping = Object.fromEntries(
        Object.entries(monthMapping).map(([key, value]) => [value, key])
    );


    const categories = [
        { id: "GNANAM", label: "GNANAM" },
        { id: "Sithanaigal", label: "SITHANAIGAL" },
        { id: "Varalaru", label: "VARALARU" }
    ];


    /**
     *  Data fetching for the Ebooks section starts here 
     * ==================================================
     * ==================================================*/

    const selectedMonthNumber = monthMapping[selectedMonth];
    console.log("Selected Year:", selectedYear);
    console.log("Selected Month:", selectedMonth);
    console.log("All Years:", allYears);
    console.log("Listen Page:", listenPage);
    const { data: APIBookData, isLoading, error, refetch } = useQuery(
        ['book-details', selectedYear, selectedMonth],
        async () => {
            if (!selectedYear || !selectedMonth) {
                // Do not call the API if year or month is not selected
                return;
            }
            const monthNumber = monthMapping[selectedMonth];
            const { data } = await axios.get(process.env.REACT_APP_URL+'/emagazine-page/magazine-details', {
                params: { year: selectedYear, month: monthNumber },
            });
            return data;
        },
        {
            // Ensure enabled is always a boolean
            enabled: Boolean(selectedYear && selectedMonth),  // Convert to boolean
            cacheTime: 300000, // Optional: keep the data cached for 5 minutes (300000ms) after it's unused
        }
    );

    useEffect(() => {
        if(!selectedYear && !selectedMonth){
        setCategoryCartFlag(false)
        setAllYears(true)
        }
    },[]);


    const { data: OtherBooksData, isLoading:isOtherBooksLoading, error:isOtherBooksError } = useQuery(
        ['book-details', selectedYear, selectedMonth],
        async () => {
            if (!selectedYear || !selectedMonth) {
                // Do not call the API if year or month is not selected
                return;
            }
            const monthNumber = monthMapping[selectedMonth];
            const { data } = await axios.get(process.env.REACT_APP_URL+'/emagazine-page/other-magazine-details', {
                params: { year: selectedYear, month: monthNumber },
            });
            return data;
        },
        {
            // Ensure enabled is always a boolean
            enabled: Boolean(selectedYear && selectedMonth),  // Convert to boolean
        }
    );





    // const { data: APIYearBookImages, status: YearImagestatus, isLoading: isYearImageLoading, error: YearImageError } = useQuery({
    //     queryFn: async () => {
    //         const { data } = await axios.get(process.env.REACT_APP_URL + `/emagazine-page/magazine-yearwise`)
    //         return data
    //     },
    //     queryKey: ["magazine-yearwise", selectedYear, selectedMonth, allYears],
    //     enabled: !selectedYear && !selectedMonth && allYears
    // })


    const { data: APIMonthBookImages, status: MonthImagestatus, isLoading: isMonthImageLoading, error: MonthImageError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL + `/emagazine-page/magazine-monthwise`, {
                params:{
                    year:selectedYear
                }
            })
            console.log("month data", data);
            
            const mappedData = data.map(item => ({
                ...item,
                month_eng: reverseMonthMapping[item.month], // Map the numeric month to the month name
            }));

            return mappedData
        },
        queryKey: ["magazine-monthwise", selectedYear, selectedMonth, allYears],
        enabled: !!selectedYear && !selectedMonth
    })


    // const { data: prevNxtAudioData, status: prevNxtAudioStatus, isLoading: prevNxtAudioLoading, error: prevNxtAudioError } = useQuery({
    //     queryFn: async () => {
    //         const { data } = await axios.get(process.env.REACT_APP_URL + `/emagazine-page/audio-prev-nxt-details`, {
    //             params: {
    //                 bid: "book_id"
    //             }
    //         }

    //         )
    //         return data
    //     },
    //     queryKey: ["prev-and-next-audio", listenPage],
    //     enabled: !!listenPage
    // })

    const { data: planData, status: planStatus, isLoading: planIsLoading, error: planError } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL + `/getPlan`, {
                params: {
                    id: userId ? userId : localStorage.getItem('id')
                }
            })
            return data[0]["plan"]
        },
        queryKey: ["plan-detail", isUserLoggedIn],
        enabled: !!isUserLoggedIn
    })


    const { data: booksData, error: booksError, isLoading: isBooksLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const { data } = await axios.get(process.env.REACT_APP_URL+"/ebooks/books");
            console.log("Books Data:", data);
            return data;
        },
    });

    useEffect(() => {
        if (booksData) {
            dispatch(setBooksData(booksData)); // Store booksData in Redux
        }
    }, [booksData, dispatch]);


    // const { data: setPlanData } = useQuery({
    //     queryFn: async () => {
    //         const { data } = await axios.get(process.env.REACT_APP_URL + `/setPlan`, {
    //             params: {
    //                 id: "",
    //                 plan: plan ? plan : "basic"
    //             }
    //         })
    //         return data
    //     },
    // })
    const navigateToListenPage = async () => {
        const uid = localStorage.getItem("id")
        try {
            const response = await axios.get(process.env.REACT_APP_URL + `/emagazine-page/audiofile?uid=${uid}&year=${selectedYear}&month=${selectedMonthNumber}`)
            setAudioData(response.data)
            setListenPage(true)

        }
        catch (err) {
            console.error("Error fetching audio data:", error);

        }

    }
    const backToBookBuySection = () => {
        setListenPage(false)
    }


    // Fetch previous and next magazine data
    const fetchPrevNextMagazines = async () => {
        try {
            // Get previous magazine
            const prevMonth = selectedMonth === "January" ? "December" : Object.keys(monthMapping)[Object.values(monthMapping).indexOf(monthMapping[selectedMonth]) - 1];
            const prevYear = selectedMonth === "January" ? selectedYear - 1 : selectedYear;
            const prevResponse = await axios.get(process.env.REACT_APP_URL+'/emagazine-page/magazine-details', {
                params: { year: prevYear, month: monthMapping[prevMonth] }
            });

            // Get next magazine
            const nextMonth = selectedMonth === "December" ? "January" : Object.keys(monthMapping)[Object.values(monthMapping).indexOf(monthMapping[selectedMonth]) + 1];
            const nextYear = selectedMonth === "December" ? selectedYear + 1 : selectedYear;
            const nextResponse = await axios.get(process.env.REACT_APP_URL+'/emagazine-page/magazine-details', {
                params: { year: nextYear, month: monthMapping[nextMonth] }
            });

            setPrevMagazine(prevResponse.data);
            setNextMagazine(nextResponse.data);
        } catch (err) {
            console.error('Error fetching prev/next magazines:', err);
        }
    };

    const handleChangeMagazine = (direction) => {
        if (direction === 'previous') {
            const prevMonth = selectedMonth === "January" ? "December" : Object.keys(monthMapping)[Object.values(monthMapping).indexOf(monthMapping[selectedMonth]) - 1];
            const prevYear = selectedMonth === "January" ? selectedYear - 1 : selectedYear;
            setSelectedMonth(prevMonth);
            setSelectedYear(prevYear);
        } else if (direction === 'next') {
            const nextMonth = selectedMonth === "December" ? "January" : Object.keys(monthMapping)[Object.values(monthMapping).indexOf(monthMapping[selectedMonth]) + 1];
            const nextYear = selectedMonth === "December" ? selectedYear + 1 : selectedYear;
            setSelectedMonth(nextMonth);
            setSelectedYear(nextYear);
        }
    };

    useEffect(() => {
        if (APIBookData) {
            fetchPrevNextMagazines(); // Fetch previous and next magazines when the current emagazine is fetched
        }
    }, [APIBookData]);

    /**
     * ==================================================
     * ==================================================
     *  Data fetching for the Ebooks section ends here 
    */
    if (isLoading || isBooksLoading || isMonthImageLoading) {
        return <Gif_Loader />;
        // return <Loader />;
    }

    console.log("booksData", APIBookData);

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
        setListenPage(false);
        // console.log("Selected Year:", year); 
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
        // console.log(month);

        setSelectedMonth(month)
        window.scrollTo(0, 0);
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
        window.scrollTo(0, 0);

    }
    const backToHomePage = () => {
        setAllYears(true);
        setCatSelectedBook("0")
        setCategoryCartFlag(false)
    }

    const handlePurchase = async (planName) => {
        const userData = {
            name: localStorage.getItem('username') || null,
            email: localStorage.getItem('email') || null,
            id: localStorage.getItem('id') || null
        };
    
        try {
            // Fetch the price of the selected plan from the backend
            const response = await fetch(process.env.REACT_APP_URL + `/emagazine-page/get-plan-amount?planName=${planName}`);
            const data = await response.json();
    
            if (response.ok) {
                const amount = data.price;
    
                const options = {
                    key: "rzp_live_tjwWB1t6xxjHG1", // Your Razorpay key
                    amount: amount * 100, // Amount in paise
                    currency: "INR",
                    name: "Jeevaamirdham",
                    description: "Subscription Payment",
                    handler: async function (response) {
                        console.log("Payment successful:", response);
    
                        // Prepare payment data to send to the backend
                        const paymentData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            plan: planName,
                            amount: amount,
                            user_id: userData?.id || null,
                        };
    
                        // Send payment data to your backend to store it
                        try {
                            const res = await fetch(process.env.REACT_APP_URL+"/emagazine-page/payment-success", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(paymentData),
                            });
    
                            if (res.ok) {
                                const data = await res.json();
                                console.log("Payment data saved successfully:", data);
                                alert("Payment successful and subscription activated!");
                                const response = await axios.get(process.env.REACT_APP_URL + `/emagazine-page/audiofile?uid=${userData?.id}&year=${selectedYear}&month=${selectedMonthNumber}`)
                                setAudioData(response.data)
                            } else {
                                console.error("Failed to update backend");
                                alert("Payment was successful but could not update subscription. Please contact support.");
                            }
                        } catch (error) {
                            console.error("Error while updating backend:", error);
                            alert("An error occurred. Please contact support.");
                        }
                    },
                    prefill: {
                        name: userData?.name || "",
                        email: userData?.email || "",
                        contact: userData?.contact || "",
                        id: userData?.id || "",
                    },
                    theme: {
                        color: "#7C3AED",
                    },
                };
    
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                console.error('Error fetching plan price');
                alert('Error fetching plan price');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching plan details');
        }
    };
    
    
    console.log("planData", planData);

    const payNow = (plan) => {
        console.log("idhanu plan", plan);
        
        if (isUserLoggedIn) {

            if (plan === 'basic') {
                handleClose()
                setPaid(true)
                // setIsUserLoggedIn()
            }
            else if (plan === 'elite') {
                handlePurchase( plan)
            }
            else {
                handlePurchase(plan)
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
    
    

    // Handle refetching when the prev or next button is clicked
    const handlePrevNext = (direction) => {
        handleChangeMagazine(direction);
        refetch(); // Refetch data for the updated selected year and month
        fetchPrevNextMagazines(); // Fetch previous and next magazines
    };

    return (
        <Container maxWidth="lg">
            {allYears ? (
                <div className="ebook-section">
                    <YearNavigation redirectToYearPage={redirectToYearPage} />
                    <BuyBook categories={categories} handleCategoryClick={handleCategoryClick} currentItems={currentItems} navigateToProductSpecificPage={navigateToProductSpecificPage} handlePageChange={handlePageChange} currentPage={currentPage} isOpen={isOpen} totalPages={totalPages} handleAddToCart={handleAddToCart} />
                </div>
            ) : (categoryCartFlag) ?
                <BookDetails backToHomePage={backToHomePage} catSelectedBook={catSelectedBook} booksData={booksData} changeBook={changeBook} handleAddToCart={handleAddToCart} isOpen={isOpen} />
                : (selectedMonth === null) && (!isNaN(selectedYear)) ?
                    <MonthNavigation backToAllYearPage={backToAllYearPage} selectedYear={selectedYear} oneYearBook={APIMonthBookImages} redirectToMonthPage={redirectToMonthPage} />
                    : (listenPage && isUserLoggedIn)
                        ?
                        <AudioPlayer
                            APIBookData={APIBookData}
                            audioData={audioData}
                            isUserLoggedIn={isUserLoggedIn}
                            backToAllYearPage={backToAllYearPage}
                            backToBookBuySection={backToBookBuySection}
                            handlePrevNext={handlePrevNext}
                            plan={planData}
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            prevMagazine={prevMagazine}
                            nextMagazine={nextMagazine}
                            setPrevMagazine={setPrevMagazine}
                            setNextMagazine={setNextMagazine}
                            payNow={payNow}
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
                                    <img src={APIBookData?.imgUrl} alt="" />
                                </div>
                                <div className="book-contentsection">
                                    <div className="book-navigator">
                                        {/* <div className="stock" style={APIBookData.availability == 'IN STOCK' ? { backgroundColor: "#24FF0033" } : { backgroundColor: "red" }}>
                                            {APIBookData.availability}
                                        </div> */}
                                        {/* <div className="prev-next">
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
                                        </div> */}
                                    </div>
                                    <div className="title-section">
                                        <div className="title">
                                            {APIBookData?.title}
                                        </div>
                                        <div className="subtext">
                                            <div className="author">
                                                Author: {APIBookData?.author}
                                            </div>
                                        </div>
                                        <div className="shortdesc">
                                            {APIBookData?.shortDesc}
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
                                                                            // background: "#F09300",
                                                                            background: 'linear-gradient(90deg, #F09300 0%, #FFB800 100%)', // Fixed closing parenthesis
                                                                            textTransform: "none",
                                                                            marginTop: "2rem",
                                                                            color: "#121212",
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
                                                                    {/* <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
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
                                                                    </Modal> */}
                                                                    <SubscriptionModal open={openModal} handleClose={handleClose} handleOpen={handleOpen} /> 
                                                                    <LoginModal open={showLoginModal} onClose={handleLoginClose} />
                                                                </>
                                                        }


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
                                        {APIBookData?.description}
                                    </div>
                                </div>

                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            {/* <div className="otherbooks">
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
                            </div> */}
                        </>
            }

        </Container>
    )
}

