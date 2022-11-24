import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Currencies from "./components/currencies/Currencies";
import Home from "./components/home/Home";
import Exchanges from "./components/exchanges/Exchanges";
import News from "./components/news/News";
import CryptoDetails from "./components/details/CryptoDetails";

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.main}>
        <div className={classes.routes}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/exchanges" element={<Exchanges />} />
            <Route exact path="/currencies" element={<Currencies />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
