import "./footer.css"
import logo from "../../assets/images/jeevaamirdhamLogo.svg"
import { Container } from "@mui/material"
import { navBanner } from "../../constants/screenData"
import SubscriptionModal from "../subscriptionModal/subscriptionModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const { t } = useTranslation();

    return (
        <div style={{ background: "#282828" }}>
            <Container maxWidth="lg">
                <div className="foot-section">
                    <div className="footer">
                        <div className="about">
                            <img src={logo} style={{ padding: '1rem 0' }} alt="" srcset="" />
                            <br />
                            <div className="summary">
                            {t('footer.aboutSummary')}
                            </div>
                        </div>
                        <div className="contact">
                            <div className="title">
                            {t('footer.needHelp')}
                            </div>
                            <div className="phNumber">
                            {t('footer.contactNumber')}
                            </div>
                            <div className="address">
                            {t('footer.address')}
                            </div>
                            {/* <a href="">SHOW ON MAP</a> */}
                            {/* <div className="time">
                            Monday – Saturday: 9:00 am-10:00 pm <br />
                            Sunday: Closed
                        </div> */}
                            {/* <div className="email">
                            contact@jeevaamirdham.com
                        </div> */}
                        </div>
                        <div className="explore">
                            <div className="title">
                            {t('footer.quickLinks')}
                            </div>
                            <div className="sections">
                                <a href="/emagazine">{t('footer.books')}</a> <br />
                                <a style={{ cursor: "pointer" }} onClick={handleOpen}>{t('footer.subscriptionPlan')}</a> <br /> 
                                {/* <a style={{ cursor: "pointer" }} >Sitemap</a> <br /> */}
                            </div>

                        </div>
                        <div className="service">
                            <div className="title">
                            {t('footer.legal')}
                            </div>
                            <div className="policies">
                                <a href="/termsAndCondition">{t('footer.termsAndConditions')}</a> <br />
                                {/* <a href="">Returns Policy</a> <br /> */}
                                <a href="/privacyPolicy">{t('footer.privacyPolicy')}</a> <br />
                                <a href="/RefundPolicy">{t('footer.refundPolicy')}</a> <br />
                            </div>
                        </div>
                        <div className="categ">
                            <div className="title">
                            {t('footer.exploreCategories')}
                            </div>
                            <div className="book-cat">
                                <a href="">{t('footer.exploreCategories_.kural_amirdham')}</a> <br />
                                <a href="">{t('footer.exploreCategories_.arul_amirdham')}</a> <br />
                                <a href="">{t('footer.exploreCategories_.maruthuvam')}</a> <br />
                                <a href="">{t('footer.exploreCategories_.valviyal_amirdham')}</a> <br />
                            </div>
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="text">
                        {t('footer.copyright')}
                        </div>
                        <div className="socialmedia">
                            <navBanner.icons.facebook sx={{ fontSize: "1rem", fill: "#999999" }} />
                            {/* <navBanner.icons.twitter sx={{ fontSize: "1rem", fill: "#999999" }} /> */}
                            <navBanner.icons.instagram sx={{ fontSize: "1rem", fill: "#999999" }} />
                            {/* <img src={navBanner.icons.pinterest} alt="" srcset="" /> */}
                            <YouTubeIcon sx={{ fontSize: "1.1rem", fill: "#999999" }} />
                        </div>
                    </div>
                </div>
                <SubscriptionModal
                    open={openModal}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                />
            </Container>
        </div>

    )
}