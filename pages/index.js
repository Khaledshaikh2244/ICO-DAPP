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
 
 const {} = useStateContext()
  return (
    <div>
     ICO ICO_MARKETPLACE_CONTRACT
     <h1>ICO MARKKETPLACE</h1>
    </div>
  ) 
}
export default index;