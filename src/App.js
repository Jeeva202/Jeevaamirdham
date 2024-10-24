import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopNavbar from './components/topNavbar/topNavbar';


function App() {
  return (
    <>
      <TopNavbar/>
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
