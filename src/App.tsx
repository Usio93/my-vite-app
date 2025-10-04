import { Routes, Route } from "react-router-dom";
import Star1 from "./pages/star.tsx";
//import PixelPortrait from "./pages/PixelPortrait.tsx";
import CutePage from "./pages/CutePage.tsx";
import LovePage from "./pages/LovePage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<CutePage/>}/>
             <Route path ="/love" element={<LovePage />}/>
            <Route path="/star" element={<Star1 />} />
        </Routes>
    );
}

export default App;
