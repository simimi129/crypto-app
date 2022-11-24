import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <div className={classes["logo-container"]}>
        <Link
          to="/"
          className={classes.title}
          onClick={() => {
            setActivePage("home");
          }}
        >
          <ion-icon name="diamond" className={classes.icon}></ion-icon>
          <h1 className={classes.h1}>Cryptom</h1>
        </Link>
      </div>
      <div className={classes.menu}>
        <div className={classes["menu-item"]}>
          <Link
            to="/"
            className={`${classes.link} ${
              activePage === "home" ? classes.active : ""
            }`}
            onClick={() => {
              setActivePage("home");
            }}
          >
            <ion-icon name="home" className={classes.icon}></ion-icon>
            &nbsp;&nbsp;Home
          </Link>
        </div>
        <div className={classes["menu-item"]}>
          <div className={classes.icon}></div>
          <Link
            to="/currencies"
            className={`${classes.link} ${
              activePage === "currencies" ? classes.active : ""
            }`}
            onClick={() => {
              setActivePage("currencies");
            }}
          >
            <ion-icon name="cash" className={classes.icon}></ion-icon>
            &nbsp;&nbsp;Crypto Currencies
          </Link>
        </div>
        <div className={classes["menu-item"]}>
          <div className={classes.icon}></div>
          <Link
            to="/exchanges"
            className={`${classes.link} ${
              activePage === "exchanges" ? classes.active : ""
            }`}
            onClick={() => {
              setActivePage("exchanges");
            }}
          >
            <ion-icon name="sync-circle" className={classes.icon}></ion-icon>
            &nbsp;&nbsp;Exchanges
          </Link>
        </div>
        <div className={classes["menu-item"]}>
          <div className={classes.icon}></div>
          <Link
            to="/news"
            className={`${classes.link} ${
              activePage === "news" ? classes.active : ""
            }`}
            onClick={() => {
              setActivePage("news");
            }}
          >
            <ion-icon name="newspaper" className={classes.icon}></ion-icon>
            &nbsp;&nbsp;News
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
