import React,{useState} from "react";

//INTERNAL IMPORTS
// import UploadLogo from "../Components/UploadLogo";
import UploadLogo from "./UploadLogo";
import Input from "./Input";
import Button from "./Button";

 
const TokenCreator = ({
  createERC,
  shortenAddress,
  openTokenCreator,
  setLoader,
  address,
  connectWallet ,
  PINATA_API_KEY ,
  PINATA_SECRET_KEY,
}) => {

  const [imageURL, setimageURL] = useState()
  const [oken, setToken] = useState({
    name   : "",
    symbol :  "",
    supply  : "",

  })
  return <div id={"myModal"} className={"modal"}>TokenCreator</div>;
};

export default TokenCreator;
