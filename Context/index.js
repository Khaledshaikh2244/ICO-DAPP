import React,{useState, useContext, createContext, useEffect, Children} from "react";
import { ethers } from "ethers";
import Web3Modal from "Web3Modal";
import toast from "react-hot-toast";


// INTERNAL IMPORTS

import { ERC20Generator,
         ERC20Generator_BYTECODE,
         handleNetworkSwitch,
         shortenAddress,
         ICO_MARKETPLACE_ADDRESS,
         ICO_MARKETPLACE_CONTRACT,
         TOKEN_CONTRACT,
         PINATA_AIP_KEY,
         PINATA_SECRECT_KEY,

        } from './constants';
import { use } from "chai";


export const StateContext = createContext();

export const StateContextProvider = ({Children}) => {

//STATEVARIABLES
const [address , setAddress] = useState();
const [accountBalance, setaAcountBalance] = useState('null');
const [loader, setLoader] = useState(false);
const [reCall, setReCall] = useState(0);
const [currency, setCurrency] = useState("MATIC");


// SV for handling Componetns
// COMPONENTS

const [openBuyToken, setOpenBuyToken] = useState(false);
const [openWithDrawTOken, setOpenWithDrawToken] = useState(false);    
const [openTransferToken, setOpenTransferToken] = useState(false);
const [openTokenCreator, setTokenCreator] = useState(false);
const [openCreateIICO, setOpenCreateIICO] = useState(false);


const notifySuccess = (msg) => {toast.success(msg,{duration:200})};
const notifyError = (msg) => {toast.error(msg,{duration:200})};


// FUNCTIONS

const checkIfWalletConnected = async () => {
    try {
        if(!window.ethereum) return notifyError("NO account found");
        const accounts = await ethereum.request({
            method: "eth_accounts",
        })
        //getting first account of from array accounts

        if(accounts.lenght) {
            setAddress(accounts[0]);

        // getting balance of account[0];
        const provider = new ethers.providers.Web3Provider(connection);
        const getBalance = await provider.getBalance(address[0]);
        
        // converting balance storing in SV
        const bal = ethers.utils.formatEther(getBalance);
        setAccountBalance(bal);
        return accounts[0];
        }
        else{
          notifyError("no account found"); 
        }
    } catch (error) {
        console.log(error);
        notifyError("NO account found");

    }
}


const connectWallet = async () => {
    try {
        if(!window.ethereum) return notifyError("NO account found");
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        })
        //getting first account of from array accounts

        if(accounts.lenght) {
            setAddress(accounts[0]);

        // getting balance of account[0];
        const provider = new ethers.providers.Web3Provider(connection);
        const getBalance = await provider.getBalance(address[0]);
        
        // converting balance storing in SV
        const bal = ethers.utils.formatEther(getBalance);
        setAccountBalance(bal);
        return accounts[0];
        }
        else{
          notifyError("no account found"); 
        }
    } catch (error) {
        console.log(error);
        notifyError("NO account found");

    }
}


return <StateContext.Provider value={{}}>{Children}</StateContext.Provider>
        
    
}