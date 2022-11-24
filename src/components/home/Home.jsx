import React from "react";
import classes from "./Home.module.css";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Currencies from "../currencies/Currencies";
import News from "../news/News";

function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  console.log(globalStats);

  if (isFetching) return "Loading...";

  return (
    <>
      <h2 className={classes.title}>Global Crypto Statistics</h2>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <span className={classes["stat-title"]}>Total</span>
          <div className={classes["stat-num"]}>{globalStats.total}</div>
        </div>
        <div className={classes.stat}>
          <span className={classes["stat-title"]}>Total Exchanges</span>
          <div className={classes["stat-num"]}>
            {globalStats.totalExchanges}
          </div>
        </div>
        <div className={classes.stat}>
          <span className={classes["stat-title"]}>Total Market Cap</span>
          <div className={classes["stat-num"]}>
            {millify(globalStats.totalMarketCap)}
          </div>
        </div>
        <div className={classes.stat}>
          <span className={classes["stat-title"]}>Total 24h Volume</span>
          <div className={classes["stat-num"]}>
            {millify(globalStats.total24hVolume)}
          </div>
        </div>
        <div className={classes.stat}>
          <span className={classes["stat-title"]}>Total Markets</span>
          <div className={classes["stat-num"]}>
            {millify(globalStats.totalMarkets)}
          </div>
        </div>
      </div>
      <div className="home-heading-container">
        <h2 className={classes.title2}>
          Top 10 Crypto Currencies in the World
        </h2>
        <h3 className={classes.show}>
          <Link to="/currencies" className={classes.link}>
            Show more
          </Link>
        </h3>
      </div>
      <Currencies simplified />
      <div className="home-heading-container">
        <h2 className={classes.title2}>Latest Crypto News</h2>
        <h3 className={classes.show}>
          <Link to="/news" className={classes.link}>
            Show more
          </Link>
        </h3>
      </div>
      <News simplified />
    </>
  );
}

export default Home;
