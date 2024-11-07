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
import LoginWithOTP from './pages/loginWithOtp.js/loginWithOTP';
import CreateNewAccount from './pages/createNewAccount/createNewAccount';


function App() {
  return (
    <>
      <Box sx={{ backgroundColor: "#FEF7F7" }}>
        <Box>
          <BrowserRouter>
            <TopNavbar />
            <Routes>
              <Route path="/" element={<Navigate to={"/home"} replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/loginWithOtp" element={<LoginWithOTP />} />
              <Route path="/createNewUser" element={<CreateNewAccount />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Box>
      </Box>


    </>
  );
}

export default App;
