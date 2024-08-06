import { ethers } from "ethers";
import { Web3Modal } from "web3modal";

// importing ABI's
import ERC20Generator from "./ERC20Generator.json";
import icoMarketplace from "./icoMarketplace.json";

// exporting and getting bytecode
export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

// getting address of ICO Marketplace
export const ICO_MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const ICO_MARKETPLACE_ABI =icoMarketplace.abi;

// getting PINATA KEY
export const PINATA_AIP_KEY =   process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRECT_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;


// // netowork config

// const networks = {
//     polygon_amoy : {
//         chainId : `0x${Number(8002).toString(16)}`,
//         chainName : "Polygon Amoy",
//         nativeCurrency :{
//             name : "MATIC",
//             symbol: "MAT",
//             decimals: 18,
//         },
//         // providing rpc URLS
//         rpcUrls: ["https://rpc-amoy.polygon.technology/"],
//         blockExplorerUrls: ["https://www.oklink.com/amoy"],
//     },

//     polygon : {
//         chainId : `0x${Number(137).toString(16)}`,
//         chainName : "Polygon Mainnet",
//         nativeCurrency :{
//             name : "MATIC",
//             symbol: "MAT",
//             decimals: 18,
//         },
//         // providing rpc URLS
//         rpcUrls: ["https://rpc.ankr.com/polygon"],
//         blockExplorerUrls: ["https://www.polyscan.com"],
//     },

//     bsc : {
//         chainId : `0x${Number(56).toString(16)}`,
//         chainName : "Binance Mainnet",
//         nativeCurrency :{
//             name : "Binance Chain",
//             symbol: "BNB",
//             decimals: 18,
//         },
//         // providing rpc URLS
//         rpcUrls: ["https://rpc.ankr.com/bsc"],
//         blockExplorerUrls: ["https://www.bscscan.com"],
//     },

//     base_mainnet : {
//         chainId : `0x${Number(56).toString(16)}`,
//         chainName : "Base Mainnet",
//         nativeCurrency :{
//             name : "ETH",
//             symbol: "ETH",
//             decimals: 18,
//         },
//         // providing rpc URLS
//         rpcUrls: ["https://base.mainnet.org"],
//         blockExplorerUrls: ["https://www.bscscan.com"],
//     },
// };


// // fnc to look for specific network --trigger

// const changeNetwork =  async({networkName}) => {
//     try {
//         //  checking of wallet
//         if(!window.ethereum) throw new Error("No crypto Wallet found ");
//         await window.ethereum.request({
//             ...networks[networkName],
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };


// //calling the fnc
// //switiching the network according to user


// export const handleNetworkSwitch = async () => {
// const networkName = "poly_amoy";
// await changeNetwork({networkName})
// }

const networks = {
    polygon_amoy: {
        chainId: `0x${Number(8002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "MAT",
            symbol: "MAT",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    // other networks...
};

const isPendingRequest = async () => {
    try {
        const result = await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [],
        });
        return false;
    } catch (error) {
        if (error.code === -32002) {
            return true;
        }
        return false;
    }
};

const changeNetwork = async ({ networkName }) => {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found");

        const network = networks[networkName];

        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (currentChainId === network.chainId) {
            console.log("Already on the desired network");
            return;
        }

        const pending = await isPendingRequest();
        if (pending) {
            console.error("Request to add Ethereum chain already pending. Please wait.");
            return;
        }

        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [network],
        });
    } catch (error) {
        if (error.code === 4001) {
            console.error("User rejected the request.");
        } else if (error.code === -32602) {
            console.error("Invalid parameters provided.");
        } else {
            console.error("Error changing network:", error);
        }
    }
};

export const handleNetworkSwitch = async () => {
    const networkName = "polygon_amoy";
    await changeNetwork({ networkName });
};






// shorting the address

export const shortenAddress =  (address) => `${address?.slice(0,5)}...${address?.slice(address.length -4)}`;

// contract functionality

// reusable fnc

const fetchContract = (address,abi , signer) => new ehters.Contract(address, abi,signer);

// fnctionality to interact with ICOMarketContract
//making connection using Web3Modal
export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = Web3Modal();
        const connection = await  web3Modal.connect();
        // getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // getting signer 

        const signer = provider.getSigner(); 

        //calling fethc contract internally to return contract
        const contract = fetchContract(
            ICO_MARKETPLACE_ADDRESS,
            ICO_MARKETPLACE_ABI,
            signer
        );

        //returning for calling in required fnc
        return contract;
    } catch (error) {
        console.log(error);
    }
}



//TOKEN CONTRACT

export const TOKEN_CONTRACT = async (TOKEN_ADDRESS) => {
    try {
        const web3Modal = Web3Modal();
        const connection = await  web3Modal.connect();
        // getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // getting signer 

        const signer = provider.getSigner(); 

        //calling fethc contract internally to return contract
        const contract = fetchContract(
            TOKEN_ADDRESS,
            ERC20Generator_ABI,
            signer
        );

        //returning for calling in required fnc
        return contract;
    } catch (error) {
        console.log(error);
    }
}