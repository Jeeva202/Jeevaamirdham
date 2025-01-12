import React from 'react';
import "./about.css";
import NewsLetter from '../../components/newsLetter/newsletter';
import KPI from '../../components/kpi/kpi';
import { Container, Box, Typography } from '@mui/material';

export default function About() {
    return (
        <div>
            <Container maxWidth="lg">
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold", textAlign: "center", paddingTop: "6rem", paddingBottom: "2rem" }}>
                    About Us
                </Typography>
                <Typography variant="body1" sx={{ color: "#444", lineHeight: "30px" }}>
                    Jeeva Amirdham is a spiritual sanctuary dedicated to promoting the essence of self-realization, inner peace, and universal harmony. Located in a serene environment, Jeeva Amirdham offers a haven for those seeking deeper spiritual connections, holistic well-being, and a transformative journey towards enlightenment.
                    <br />
                    At Jeeva Amirdham, we believe in the power of spiritual growth through meditation, self-reflection, and the wisdom of ancient teachings. Our programs are designed to help individuals reconnect with their true selves, guided by the principles of love, compassion, and unity.
                    <br />
                    We offer a variety of spiritual practices, meditation sessions, workshops, and retreats that cater to individuals from all walks of life. Whether you're seeking inner peace, looking to deepen your spiritual practice, or simply searching for a place of refuge, Jeeva Amirdham provides the ideal setting to nourish your soul and elevate your consciousness.
                    <br />
                    Our mission is to create a global community bound by shared spiritual values, where individuals can experience personal transformation and contribute to a more peaceful and compassionate world. Through our teachings and practices, we aim to awaken the divine potential within every individual, helping them lead a life of purpose, joy, and fulfillment.
                    <br />
                    Join us at Jeeva Amirdham and embark on a journey of self-discovery, inner bliss, and spiritual awakening.
                </Typography>

                <Typography variant="h4" component="div" sx={{ fontWeight: "bold", textAlign: "left", paddingTop: "6rem", paddingBottom: "2rem" }}>
                    Our Story
                </Typography>
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
                </Box>
                <Box sx={{ marginTop: "4rem" }}></Box>
                <NewsLetter />
                <KPI />
            </Container>
        </div>
    );
}
