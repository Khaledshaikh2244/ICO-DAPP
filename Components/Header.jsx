import React, { useState, useEffect } from "react";

// INTERNAL IMPORTS
import Button from "./Button";
import TokenHistory from "./TokenHistory";
import TokenCreator from "./TokenCreator";

const Header = ({
  accountBalance,
  setAddress,
  address,
  connectWallet,
  ICO_MARKETPLACE_ADDRESS,
  shorteRKETPLACE_ADDRESS,
  shortenAddress,
  setopenAllICO,
  openAllICO,
  setOpenTokenCreator,
  openTokenCreator,
  setopenTokenHistory,
  openTokenHistory,
  setopenICOMarketplace,
  openICOMarketplace,
}) => {
  const [isMetamaskInstalled, setisMetamaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setisMetamaskInstalled(true);

      window.ethereum.on("accountChanged", handleAccountChanged);
    }

    return () => {
      if (typeof window.ethereum !== "ubdefined") {
        window.ethereum.removeListener("accountChanged", handleAccountChanged);
      }
    };
  }, [address]);

  const handleAccountChanged = (accounts) => {
    setAddress(accounts[0]);
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <a href="/">
            ICO.<span>Market</span>
          </a>
        </div>

        <input type="checkbox" name="" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          &#9776;
        </label>

        <ul className="menu">
          <li>
            <a href="/">Home</a>
          </li>

          <li>
            {/* <a oeClick={()=> openICOMarketplace ? openICOMarketplace(false): setopenICOMarketplace(true) }></a> */}
            <a onClick={() => setopenICOMarketplace(!openICOMarketplace)}>
              ICO MArketplace
            </a>
          </li>

          <li>
            <a onClick={() => setopenAllICO(!openAllICO)}>Created ICO </a>
          </li>

          <li>
            <a onClick={() => setopenTokenHistory(!TokenHistory)}>History</a>
          </li>

          <li>
            <a onClick={() => setOpenTokenCreator(!TokenCreator)}>
              Create Token
            </a>
          </li>

          {address ? (
            <li>
              <Button
                name={`${shortenAddress(address)}: ${accountBalance?.slice(0, 5)} `}
              ></Button>
            </li>
          ) : (
            <Button name="Connect Wallet" handleCLick></Button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
