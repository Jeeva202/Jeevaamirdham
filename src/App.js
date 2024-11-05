import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopNavbar from './components/topNavbar/topNavbar';
import HomePage from './pages/homepage/homepage';
import { Box } from '@mui/material';
import UserLogin from './components/userLogin/userLogin';


function App() {
  return (
    <>
    <Box >
    <TopNavbar/>
      <HomePage/>
      
    </Box>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/"} replace />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/2" element={<AppScreen />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
} 

export default App;
