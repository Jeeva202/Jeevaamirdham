import { ebooks } from "../../constants/screenData"
import "./ebooks.css"
import { Container } from "@mui/material"
import ViewAll from "../../components/viewAllButton/viewAll"
import { useState } from "react";
export default function Ebooks() {
    const [allYears, setAllYears] = useState(true);
    const [selectedYear, setSelectedYear] = useState(NaN);
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

    const redirectToYearPage = (year) => {
        setSelectedYear(year);
        setAllYears(false);
    };
    const backToAllYearPage = () =>{
        setAllYears(true)
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
                </div>
                </div>
                )
                : <>
                    <div className="navigation">
                        <a className="back" onClick={()=>backToAllYearPage()}>
                            E-MAGAZINE
                        </a>
                        <img src={ebooks.icons.RightArrowStroke} alt=""/>
                        <div className="year">
                        {selectedYear}
                        </div>
                    </div>
                    <div className="ebooks-one-year">
                        <div className="month-wise">
                            {oneYearBook.map((e) => (
                                <div className="month-wrapper">
                                    <img src={e.img} alt="" />
                                    <ViewAll text={e.month + " "+ selectedYear} width="11rem" 
                                    //  onClick={() => redirectToYearPage(e.year)}
                                      />
                                </div>

                            ))}
                        </div>
                    </div>
                </>
            }

        </Container>
    )
}