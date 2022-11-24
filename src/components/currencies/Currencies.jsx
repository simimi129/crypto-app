import React, { useState, useEffect } from "react";
import classes from "./Currencies.module.css";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";

function Currencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className={classes.search}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <div className={classes["crypto-card-container"]}>
        {cryptos?.map((currency, i) => (
          <div className={classes["crypto-card"]} key={i}>
            <Link to={`/crypto/${currency.uuid}`} className={classes.link}>
              <div className={classes.card}>
                <div className={classes["card-top"]}>
                  <h1
                    className={classes.crypto}
                  >{`${currency.rank}. ${currency.name}`}</h1>
                  <img
                    className={classes.icon}
                    src={currency.iconUrl}
                    alt="icon"
                  />
                </div>
                <div className={classes["card-bottom"]}></div>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Currencies;
