import React from 'react';
import "./about.css";
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';
import { Container, Box, Typography } from '@mui/material';

export default function About() {
    return (
        <div>
            <Container maxWidth="lg">
                <div component="div" style={{ fontWeight: "bold", textAlign: "center", paddingTop: "2rem", paddingBottom: "2rem", color: '#B54708', fontSize: "1.5rem" }}>
                    About Us
                </div>
                <Typography variant="body1" sx={{ color: "#444", lineHeight: "35px" }}>
                    Jeevaamirdham & Gnana Amirdham emphasis on the knowledge and worship practices of saints, siddhas, and great beings related to God can be understood!

                    By consuming the nectar of love and transforming family life into virtuous living, one can lead a joyous life!

                    By removing the illusion of small pleasures and embracing the bliss that brings true happiness, the eight siddhis can be known!

                    By dispelling ignorance and obtaining divine knowledge, we can experience spiritual wisdom within ourselves!

                    By elevating our state of being, we can attain the supreme state of God!

                    The locations and glories of the 875 great saints' samadhis (final resting places) can be known!

                    This is a practical guide to life that should be present in every household!

                    Drink the nectar of life and share it with everyone!
                    <br />
                    <br />
                    The Guide to Achieving a True and Noble Life

                    A detailed guide that explains the state and functioning of the energy centers (chakras) that govern the body.

                    A valuable guide that explains the wisdom of Siddhas, Saints, and Great Souls and the principles of Jnana Yoga.

                    A guide to the spiritual practices of liberated beings and the secret of attaining Samadhi.

                    The true meaning of knowledge, explaining that asceticism is not the only path to wisdom, but that family life can also be virtuous.

                    A guide to identifying true spiritual teachers and avoiding the traps of false teachers, as pointed out by the Siddhas.

                    A guide to the greatness that emerged in the world through the blessings of Siddhas who imparted divine knowledge.

                    A profound wisdom guide offering the teachings of 1000 Jeeva Samadhis (final resting places of enlightened beings) along with the photographs of 300 Great Souls, bestowing the highest knowledge.
                </Typography>

                {/* <div component="div" style={{ fontWeight: "bold", textAlign: "left", paddingTop: "3rem", paddingBottom: "2rem", color: '#B54708', fontSize: "2rem" }}>
                    Our Story
                </div>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "2rem" }}>
                    <Typography variant="body1" sx={{ flex: 1, color: "#444", lineHeight: "30px" }}>
                        The story of Jeeva Amirdham began with a simple yet profound vision: to create a space where individuals could reconnect with their inner selves, find peace, and embark on a transformative spiritual journey. It all started when our founder, [Founder’s Name], deeply moved by the timeless wisdom of ancient spiritual teachings, sought to bring these teachings to people in a way that was both accessible and transformative.
                    </Typography>
                    <Typography variant="body1" sx={{ flex: 1, color: "#444", lineHeight: "30px" }}>
                        Rooted in a desire to promote peace, harmony, and self-realization, Jeeva Amirdham was established as a sanctuary for those seeking more than just a place of worship—it is a place of self-discovery, healing, and community. Our journey has been guided by the belief that spirituality transcends religious boundaries, offering a path for anyone who seeks truth and inner peace.
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: "2rem", marginTop: "2rem" }}>
                    <Typography variant="body1" sx={{ flex: 1, color: "#444", lineHeight: "30px" }}>
                        From its humble beginnings, Jeeva Amirdham has grown into a thriving spiritual community that welcomes individuals from all walks of life. Our founder's dream has blossomed into a vibrant space where people come to meditate, reflect, and connect with the deeper aspects of life. What started as a small retreat center has expanded into a spiritual movement that touches the lives of thousands, offering a haven for those seeking solace in a fast-paced world.
                    </Typography>
                    <Typography variant="body1" sx={{ flex: 1, color: "#444", lineHeight: "30px" }}>
                        Through dedication, compassion, and the unwavering support of our community, Jeeva Amirdham continues to flourish, guided by the light of love and wisdom. Our story is one of growth, transformation, and an enduring commitment to helping people awaken to their true potential.
                    </Typography>
                </Box> */}
                <Box sx={{ marginTop: "4rem" }}></Box>
                <NewsLetter />
                <KPI />
            </Container>
        </div>
    );
}
