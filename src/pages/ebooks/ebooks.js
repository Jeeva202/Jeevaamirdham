import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Pagination, Badge, Container, Card, CardContent, CardHeader, Divider, Button, Modal, Typography, Box, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CartModal from "../../components/cart/cartModal";
import { useDispatch, useSelector } from "react-redux";
import { openCart, selectIsCartOpen } from "../../redux/cartSlice";

export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [selectedYear, setSelectedYear] = useState(NaN);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(["GNANAM"]);
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
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        },
        {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        }, {
            category: "GNANAM",
            title: "Gnana Amirtham",
            subtitle: "Siddharth Thoughts",
            desc: "Animi qui et nemo consequatur iste totam et. Id nihil id enim consequatur provident non. Ratione est voluptas aperiam vero architecto.",
            discount: "30%",
            orgPrice: "$814.66",
            offPrice: "₹450.00",
            img: "/assets/images/Gnana_Amirtham.png"
        },
    ]



    const bookData = [
        {
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

    const changeBook = (e) => {
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
        else {
            setWhichBook(e)
        }


    }

    const payNow = (money) => {
        handleClose();
        setPaid(true)

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
                                {currentItems.map((e) => (
                                    <div className="book">
                                        <div className="img-section">
                                            <StyledBadge badgeContent={e.discount}>
                                                <img src={e.img} alt="" />
                                            </StyledBadge>
                                        </div>
                                        <div className="content-section">
                                            <div className="title">{e.title}</div>
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
            )
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
                    : <>
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

                                                    {/* {paid == false ? */}
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
                                                    {/* :
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
                                                            }}  >
                                                                Listen Now
                                                            </Button>
                                                        </div>
                                                    } */}


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