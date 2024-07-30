import { ethers } from "ethers";
import { Web3Modal } from "Web3modal";

// importing ABI's
import ERC2oGenerator from "./ERC20Generator.json";
import icoMarketplace from "./icoMarketplace.json";

// exporting and getting bytecode
export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

// getting address of ICO Marketplace
export const ICO_MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const ICO_MARKETPLACE_ABI =icoMarketplace.abi;

// getting PINATA KEY
export const NEXT_PUBLIC_PINATA_AIP_KEY =   process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const NEXT_PUBLIC_PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;


// netowork config

const netoworks = {
    polygon_amoy : {
        chainId : `0x${Number(8002).toString(16)}`,
        chainName : "Polygon Amoy",
        nativeCurrency :{
            name : "MATIC",
            symbol: "MAT",
            decimals: 18,
        },
        // providing rpc URLS
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },

    polygon : {
        chainId : `0x${Number(137).toString(16)}`,
        chainName : "Polygon Mainnet",
        nativeCurrency :{
            name : "MATIC",
            symbol: "MAT",
            decimals: 18,
        },
        // providing rpc URLS
        rpcUrls: ["https://rpc.ankr.com/polygon"],
        blockExplorerUrls: ["https://www.polyscan.com"],
    },

    bsc : {
        chainId : `0x${Number(56).toString(16)}`,
        chainName : "Binance Mainnet",
        nativeCurrency :{
            name : "Binance Chain",
            symbol: "BNB",
            decimals: 18,
        },
        // providing rpc URLS
        rpcUrls: ["https://rpc.ankr.com/bsc"],
        blockExplorerUrls: ["https://www.bscscan.com"],
    },

    bsc : {
        chainId : `0x${Number(56).toString(16)}`,
        chainName : "Base Mainnet",
        nativeCurrency :{
            name : "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        // providing rpc URLS
        rpcUrls: ["https://base.mainnet.org"],
        blockExplorerUrls: ["https://www.bscscan.com"],
    },
};


// fnc to look for specific network --trigger

const changeNetwork =  async({networkName}) => {
    try {
        //  checking of wallet
        if(!window.ethereum) throw new Error("No crypto Wallet found ");
        await window.ethereum.request({
            ...networkName[networkName],
        });
    } catch (error) {
        console.log(error);
    }
};


//calling the fnc
//switiching the network according to user


export const handleNetworkSwitch = async () => {
const networkName = "poly_amoy";
await changeNetwork({networkName})
}

// shorting the address

export const shortenAddress =  (address) => `${address?.slice(0,5)}...${address?.length-4}`;

// contract functionality

// reusable fnc

const fetchContract = (address,abi , signer) => new ehters.Contract(address, abi,signer);

// fnctionality to interact with ICOMarketContract
//making connection using Web3Modal
export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const Web3Modal = Web3Modal();
        const connection = await  Web3Modal.connect();
    } catch (error) {
        console.log(error);
    }
}