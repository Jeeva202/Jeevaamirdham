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
import ViewCart from './components/cart/cart';
import Checkout from './components/checkout/checkout';
import UserDashboard from './pages/userDashboard/userDashboard';
import AdminPanel from './pages/admin/AdminPanel';
import LoginModal from './pages/login/loginModal';
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from 'react';
import NewLogin from './pages/login/NewLogin';
import WhatsAppButton from './components/whatsapp/Whatsapp';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import AudioVideo from './pages/audio_video/audio-video';
import PrivacyPolicy from './pages/login/PrivacyPolicy';
import TermsAndCondition from './pages/login/TermsAndCondition';
import { selectIsUserLoggedIn, setUserId } from './redux/cartSlice';
import GlobalSnackbar from './components/Snackbar/SnackBar';
import { showSnackbar } from './redux/SnackBarSlice';
import {useDispatch } from 'react-redux';
import RefundPolicy from './pages/refundPolicy/RefundPolicy';

const queryClient = new QueryClient();


function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const isAdminLoggedIn = useSelector((state) => state.cart.isAdminLoggedIn);
  const [selectedYear, setSelectedYear] = useState(NaN);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [allYears, setAllYears] = useState(true);
  let check = !! localStorage.getItem("id")
  let userCheck = useSelector(selectIsUserLoggedIn)
// console.log("id check",check);
  const loginPopup = () => {
    setIsLoginOpen(true); // Open the modal
  };
  const dispatch = useDispatch();

  // console.log("id 1", useSelector(selectIsUserLoggedIn))
  const closeLoginPopup = () => {
    setIsLoginOpen(false); // Close the modal
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Box sx={{ backgroundColor: "none" }}>
          <Box>

            <BrowserRouter>
              {!isAdminLoggedIn && <TopNavbar setIsUserLoggedIn={setIsUserLoggedIn} />}
              <NewLogin isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
              {!isAdminLoggedIn && <WhatsAppButton phoneNumber="9176564723" />}
              <Routes>
                <Route path="/" element={<Navigate to={"/home"} replace />} />
                <Route path="/home" element={<HomePage selectedYear={selectedYear} setSelectedYear={setSelectedYear}
                  allYears={allYears}
                  setAllYears={setAllYears}
                  setSelectedMonth={setSelectedMonth}
                />} />
                <Route
                  path="/emagazine"
                  element={
                    <>
                      <Ebooks
                        isUserLoggedIn={isUserLoggedIn}
                        loginPopup={loginPopup}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        allYears={allYears}
                        setAllYears={setAllYears}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                      />
                      {/* {isLoginOpen && <LoginModal onClose={closeLoginPopup} />} */}
                      {isLoginOpen && <NewLogin isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />}
                    </>
                  }
                />

                <Route path="/audio_video" element={<AudioVideo />} />
                <Route path='/blog' element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login/loginWithOtp" element={<LoginWithOTP />} />
                <Route path="/createNewUser" element={<CreateNewAccount />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={userCheck ? <UserDashboard /> : <Navigate to="/home" />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/termsAndCondition" element={<TermsAndCondition />} />
                <Route path="/RefundPolicy" element={<RefundPolicy />} />
                <Route path="/admin/overview" element={
                  // <AdminPanel />
                  <ProtectedRoute>
                    <AdminPanel />
                   </ProtectedRoute>

                } />
              </Routes>
              {!isAdminLoggedIn && <Footer />}
            </BrowserRouter>
            <GlobalSnackbar />
          </Box>
        </Box>


      </>
    </QueryClientProvider>
  );
}

export default App;
