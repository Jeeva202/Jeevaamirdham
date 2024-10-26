import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopNavbar from './components/topNavbar/topNavbar';
import HomePage from './pages/homepage/homepage';


function App() {
  return (
    <>
      <TopNavbar/>
      <HomePage/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/"} replace />} />
          <Route path="/1" element={<Login />} />
          <Route path="/2" element={<AppScreen />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
} 

export default App;
