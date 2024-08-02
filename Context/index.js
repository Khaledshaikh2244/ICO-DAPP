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
         ERC20Generator_ABI,

        } from './constants';
import { use } from "chai";
import { id } from "ethers/lib/utils";


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
const [openCreateICO, setOpenCreateICO] = useState(false);


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
};


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
};

// MAIN FUNCTION 
const _deployContract = async (signer,account,name, symbol, supply, imageURL) => {
// 2nd  
//  const factory = new ethers.ContractFactory( 
//     ERC20Generator_ABI,
//     ERC20Generator_BYTECODE,
//     signer
//    )
    try {
        const factory = new ethers.ContractFactory(
            ERC20Generator_ABI,
            ERC20Generator_BYTECODE,
            signer
        );

        //call depoloy fnc
        const totalSupply = Number(supply);
         const _initalSupply =ethers.utils.parseEther(totalSupply.toString(),"ether")
        
        let contract = await factory.deploy(_initalSupply,name,symbol);

        const transaction = await contract.deployed();
        if(contract.address) {
            const today = new Date.now();
            let date = new Date(today);
            const _tokenCreatedDate = date.toLocaleDateString("en-US");

            //creating token variable object to stron lS
            const token = {
                account : account,
                supply :  supply.toString(),
                name : name,
                symbol  : symbol,
                tokenAddress : contract.address,
                //already available in deployed contract
                transactionHash : contract.deployTransaction.hash,
                createAt : _tokenCreatedDate,
                logo : imageURL
            }
                 
            let tokenHistory = [];

            const history = localStorage.getItem("TOKEN_HISTORY");
            if(history){
                tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
                tokenHistory.push(_token);
                localStorage.setItem("TOKEN_HISTORY" , tokenHistory);
                setLoader(false);
                setRecall(reCall + 1);
                setOpenTokenCreator(false);
            }
            else{
                tokenHistory.push(_token);
                localStorage.setItem("TOKEN_HISTORY" , tokenHistory);
                setLoader(false);
                setRecall(reCall + 1);
                setOpenTokenCreator(false);
            }
        }
    } catch (error) {
        setLoader(false);
        notifyError("Something went wrong, try later");
        console.log(error);
    }
};
//1st step of main fnc
const _createERC20 = async (token, account, imageURL) => {
    
    // deconstr data from token
    const  {name, symbol, supply} = token;

    try {
    setLoader(true);
    notifySuccess("Creating Token...");
    if(!name || !symbol ||  !supply){
        notifyError("Data missing");
    }
    else{
        const web3Modal = Web3Modal();
        const connection = await  web3Modal.connect();
      
        // getting provider
        const provider = new ethers.providers.Web3Provider(connection);

         // getting signer 
         const signer = provider.getSigner(); 

         _deployContract(signer,account,name, symbol, supply, imageURL);
    }
    } catch (error) {
       
        setLoader(false);
        notifyError("Something went wrong, try later");
        console.log(error);
    }
};


const GET_ALL_ICO_SALE_TOKEN = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const GET_ICO_USER_SALE_TOKEN = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};

// 3rd
const createICOSALE  = async (icoSale) => {
    try {
        // user has to provide address & price 
        // before creating icoSale within our icoContract
        const {address , price} = icoSale;
        if(!address || !prcie) return notifyError("data is missing");    
        setLoader(true);
        notifySuccess("Creating ICO sale");
        connectWallet();

        const contract = ICO_MARKETPLACE_CONTRACT;

        // conveting price
        const payAmount = ethers.utils.parseUnits(price.toString(), "ethers");
        
        //calling fnc from Presale.sol
        const transaction = await contract.createICOSALE(address,payAmount, {
            gasLimit:ethers.utils.hexlify(8000000),
        });

        await transaction.wait();

        if(transaction.hash){
            setLoader(false);
            setOpenCreateICO(false);
            setReCall(reCall + 1);
        }
    } catch (error) {
        setLoader(false);
        setOpenCreateICO(false);
        notifyError("something went wrong")
        console.log(error);
    }
};

const buyToken  = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};

const transferToken  = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};


const withDrawToken  = async () => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};



return <StateContext.Provider value={{}}>{Children}</StateContext.Provider>
        
    
}