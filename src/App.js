import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopNavbar from './components/topNavbar/topNavbar';
import HomePage from './pages/homepage/homepage';
import { Box, Container, CssBaseline } from '@mui/material';
import UserLogin from './components/userLogin/userLogin';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Footer from './components/footer/footer';


function App() {
  return (
    <>
      <Box sx={{ backgroundColor: "#F9E2BE" }}>
        {/* <CssBaseline /> */}
        <Box>
          <BrowserRouter>
            <Box sx={{ background: "#FFF" }}>
              <Container maxWidth="lg"><TopNavbar /></Container>
            </Box>
            <Container maxWidth="lg">

              <Routes>
                <Route path="/" element={<Navigate to={"/home"} replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Container>
            <Footer/>
          </BrowserRouter>
        </Box>
      </Box>


    </>
  );
}

export default App;
