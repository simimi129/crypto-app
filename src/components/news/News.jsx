import React, { useState } from "react";
import classes from "./News.module.css";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return "Loading...";

  return (
    <div className={classes["news-container"]}>
      {!simplified && (
        <div className="filter">
          <select
            placeholder="Select Crypto"
            onChange={({ target }) => setNewsCategory(target.value)}
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins.map((coin, i) => (
              <option value={coin.name} key={i}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {cryptoNews?.value.map((news, i) => (
        <div className={classes.card} key={i}>
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className={classes.link}
          >
            <div>
              <div className={classes.title}>{news.name}</div>
              <img
                src={news?.image?.thumbnail?.contentUrl || demoImage}
                alt="news"
                className={classes.img}
              />
            </div>
            <p>
              {news.description > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description}
            </p>
            <div>
              <div className={classes.provider}>
                <img
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt="provider"
                  className={classes["provider-icon"]}
                />
                <span>{news.provider[0]?.name}</span>
              </div>
              <span>{moment(news.datePublished).startOf("ss").fromNow()}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default News;
