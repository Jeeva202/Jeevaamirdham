import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopNavbar from './components/topNavbar/topNavbar';
import HomePage from './pages/homepage/homepage';
import Ebooks from './pages/ebooks/ebooks';
import { Box, Container, CssBaseline } from '@mui/material';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Login from './pages/login/login';
import Footer from './components/footer/footer';
import LoginWithOTP from './pages/loginWithOtp.js/loginWithOTP';
import CreateNewAccount from './pages/createNewAccount/createNewAccount';
import Blog from './pages/blog/blog';
import Audio_video from './pages/audio_video/audio_video';
import ViewCart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import UserDashboard from './pages/userDashboard/userDashboard';
import AdminPanel from './pages/admin/AdminPanel';
import LoginModal from './pages/login/loginModal';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';
import NewLogin from './pages/login/NewLogin';


const queryClient = new QueryClient();
let isUserLoggedIn = false

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const loginPopup = () => {
    setIsLoginOpen(true); // Open the modal
  };

  const closeLoginPopup = () => {
    setIsLoginOpen(false); // Close the modal
  };
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Box sx={{ backgroundColor: "#FEF7F7" }}>
          <Box>
            <BrowserRouter>
              <TopNavbar />
              <Routes>
                <Route path="/" element={<Navigate to={"/home"} replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/ebooks"
                  element={
                    <>
                      <Ebooks
                        isUserLoggedIn={isUserLoggedIn}
                        loginPopup={loginPopup}
                      />
                      {/* {isLoginOpen && <LoginModal onClose={closeLoginPopup} />} */}
                      {isLoginOpen && <NewLogin />}
                    </>
                  }
                />

                <Route path="/audio_video" element={<Audio_video />} />
                <Route path='/blog' element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<NewLogin />} />  
                <Route path="/login/loginWithOtp" element={<LoginWithOTP />} />
                <Route path="/createNewUser" element={<CreateNewAccount />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin/overview" element={<AdminPanel />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Box>
        </Box>


      </>
    </QueryClientProvider>
  );
}

export default App;
