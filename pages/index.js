import React,{useState, useEffect} from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORTS
import { useStateContext } from "../Context/index";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Table from "../Components/Table";
import UploadLogo from "../Components/UploadLogo";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ICOMarket from "../Components/ICOMarket";
import TokenCreator from "../Components/TokenCreator";
import TokenHistory from "../Components/TokenHistory";
import CreateICO from "../Components/CreateICO";
import Card from "../Components/Card";
import BuyToken from "../Components/BuyToken";
import WidthdrawToken from "../Components/WidthdrawToken";
import TokenTransfer from "../Components/TokenTransfer";


const index = () => {
  const {
    withDrawToken,
    transferToken,
    buyToken,
    createICOSALE,
    GET_ICO_USER_SALE_TOKEN,
    GET_ALL_ICO_SALE_TOKEN,
    _createERC20,
    connectWallet,
    PINATA_AIP_KEY,
    PINATA_SECRECT_KEY,
    ICO_MARKETPLACE_ADDRESS,
    openBuyToken,
    setOpenBuyToken,
    openWithDrawTOken, setOpenWithDrawToken,
    openTransferToken, setOpenTransferToken,
    openTokenCreator, setTokenCreator,
    openCreateICO, setOpenCreateICO,
    address, setAddress,
    accountBalance,
    loader,
    setLoader,
    currency,
    shortenAddress,
  } = useStateContext();

  
  const notifySuccess = (msg) => { toast.success(msg, { duration: 200 }) };
  const notifyError = (msg) => { toast.error(msg, { duration: 200 }) };

  const [allICOs, setAllICOs] = useState();
  const [allUserIcos, setAllUserIcos] = useState();

  // componets open
  const [openAllICOs, setOpenAllICOs] = useState(false);
  const [openTokenHistory, setOpenHistory] = useState(false);
  const [openICOMarket, setopenICOMarket] = useState(false);
  
  //TOKEN
  const [buyIco, setBuyIco] = useState();

  // copy ICO contract address
  const copyAddress = () => {
    navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS);
    notifySuccess("Copied successfully"); 
  }

  return
 (
<div>  
<h1>hello</h1>
/* { HEADER} */
 
 <Header/>
 <Footer/>
 <Loader/>  
 </div>
 )
 

}; 

export default index;
