import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/favorites" exact element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
