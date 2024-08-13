import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';


// INERNAL IMPPORTS
import {useStateContext} from '../Context/index';
import Input from "../Components/Input";
import Header from "../Components/Header";
import Button from "../Components/Button";
import Table from "../Components/Table";
import PreSaleList from "../Components/PreSaleList";
import UploadLogo from "../Components/UploadLogo";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import ICOMarket from "../Components/ICOMarket";
import TokenCreator from "../Components/TokenCreator";
import TokenHistoryr from "../Components/TokenHistory";
import Marketplace from "../Components/Marketplace";
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
        PINATA_API_KEY,
        PINATA_SECRET_KEY,
        ICO_MARKETPLACE_ADDRESS,
        openBuyToken,
        setOpenBuyToken,
        openWithDrawToken, setOpenWithDrawToken,
        openTransferToken, setOpenTransferToken,
        openTokenCreator, setOpenTokenCreator,
        openCreateICO, setOpenCreateICO,
        address, setAddress,
        accountBalance,
        loader,
        setLoader,
        currency,
        shortenAddress, 
 } = useStateContext()

 const notifySuccess = (msg) => { toast.success(msg, { duration: 200 }) };
 const notifyError = (msg) => { toast.error(msg, { duration: 200 }) };

 const [allICOs,setAllICOs] = useState();
 const [allUserIcos, setAllUserIcos] = useState();

//  COMPONENTES OPEN
const [openAllICO, setopenAllICO] = useState(false);
const [openTokenHistory, setopenTokenHistory] = useState(false);
const [openICOMarketplace, setopenICOMarketplace] = useState(false);


// 
const [buyIco, setbuyIco] = useState(false);

// copying address
const copyAddress = () => { navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS)
      notifySuccess("Copied Successfully");
};


  return (
    <div>
    <Header />
    <Footer />
    <Loader />
    </div>
  ) 
}
export default index;