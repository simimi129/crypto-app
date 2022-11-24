import React, { useState } from "react";
import classes from "./CryptoDetails.module.css";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import LineChart from "../chart/LineChart";

function CryptoDetails() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (isFetching) return "Loading...";

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(+cryptoDetails.price)}`,
      icon: "",
    },
    { title: "Rank", value: cryptoDetails.rank, icon: "" },
    {
      title: "Change",
      value: cryptoDetails.change,
      icon: "",
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails.marketCap && millify(+cryptoDetails.marketCap)
      }`,
      icon: "",
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: "",
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: "",
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: "",
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.supply.confirmed ? "Y" : "N",
      icon: "",
    },
    {
      title: "Total Supply",
      value: `$ ${millify(+cryptoDetails.supply.total)}`,
      icon: "",
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(+cryptoDetails.supply.circulating)}`,
      icon: "",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h2 className={classes.name}>{cryptoDetails.name} Price</h2>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </div>
      {/* <select
        defaultValue="7d"
        placeholder="Select Time Period"
        onChange={({ target }) => setTimePeriod(target.value)}
      >
        {time.map((date, i) => (
          <option value={date} key={i}>
            {data}
          </option>
        ))}
      </select> */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <div className="stats-container">
        <div className="coin-stats">
          <div className="stats-top">
            <h3>{cryptoDetails.name} Value Statistics</h3>
            <p>An overview showing the stats of {cryptoDetails.name}.</p>
          </div>
          <div className="stats-body">
            {stats?.map((stat, i) => (
              <div className="coin-stats" key={i}>
                <div className="coin-stats-name">
                  <span>{stat.title}</span>
                </div>
                <span className="stats">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="other-stats">
          <div className="other-top">
            <h3>{cryptoDetails.name} Other Statistics</h3>
            <p>An overview showing the stats of all crypto currencies.</p>
          </div>
          <div className="other-body">
            {genericStats?.map((stat, i) => (
              <div className="other-stats" key={i}>
                <div className="other-stats-name">
                  <span>{stat.title}</span>
                </div>
                <span className="other">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="coin-desc-link">
          <div className="coin-desc">
            <span className="coin-details">
              What is {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
            </span>
          </div>
          <div className="coin-links">
            <span className="coin-details">{cryptoDetails.name} Links</span>
            {cryptoDetails.links.map((link) => (
              <div className="coin-link" key={link.name}>
                <span className="link-name">{link.type}</span>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoDetails;
