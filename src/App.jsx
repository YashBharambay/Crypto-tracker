import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin.jsx";
import "./App.css";
import "./coin.css";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes.jsx";
// import { DarkModeSwitch } from "react-toggle-dark-mode";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  /* fontColor: "white"; */
  /* backgroundColor:'red; */
`;

const CoinSearch = styled.form`
  background: blue;
`;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=30&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
  });

  // const puta = (e) => {
  //   setSearch(e.target.value);
  // };
  const filteredCoins = coins.filter(
    (coin) => coin.name.toLowerCase().includes(search.toLowerCase())
    // console.log("filteredCoins", { coin });
  );

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <StyledApp>
        <div className="coin-app">
          <div className="coin-search">
            <button onClick={() => themeToggler()}>Change Theme</button>

            <h1 clasName="coin-text">Search A Currency</h1>
            <CoinSearch>
              <form>
                <input
                  type="text"
                  placeholder="Search A Currency"
                  className="coin-input"
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
              </form>
            </CoinSearch>
            <p className="developer">Developed By Yash</p>
          </div>

          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
