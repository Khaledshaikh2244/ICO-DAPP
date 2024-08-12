import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Importing ABIs
import ERC20Generator from "./ERC20Generator.json";
import icoMarketplace from "./icoMarketplace.json";

// Exporting and getting bytecode
export const ERC20Generator_ABI = ERC20Generator.abi;
export const ERC20Generator_BYTECODE = ERC20Generator.bytecode;

// Getting address of ICO Marketplace
export const ICO_MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_ICO_MARKETPLACE_ADDRESS;
export const ICO_MARKETPLACE_ABI = icoMarketplace.abi;

// Getting PINATA Key
export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

// Network config
const networks = {
    polygon_amoy: {
        chainId: `0x${Number(80002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "MATIC",  // Adjust this based on MetaMask warnings
            symbol: "MATIC", // Adjust this based on MetaMask warnings
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    localhost: {
        chainId: `0x${Number(31337).toString(16)}`,
        chainName : "localhost",
        nativeCurrency :{
            name : "GO",
            symbol: "GO",
            decimals : 18,
        },
        rpcUrls : ["http: //127.0.0.1:8545/"],
        blockExplorerUrls :["https://bscscan.com"],
    },
    // Add other networks as needed
};

// Flag to prevent multiple network switch requests
let isSwitchingNetwork = false;

// Function to switch network
const changeNetwork = async (networkName) => {
    // Check if a network switch is already in progress
    if (isSwitchingNetwork) {
        console.log("Network switch request is already pending. Please wait.");
        return;
    }

    isSwitchingNetwork = true;

    try {
        const network = networks[networkName];
        if (!network) {
            console.error(`Network ${networkName} not found.`);
            return;
        }

        if (!window.ethereum) throw new Error("No crypto Wallet found");

        // Safely check for pending requests
        const pendingRequests = window.ethereum._state?.pendingRequests;
        if (pendingRequests && pendingRequests.length > 0) {
            console.log("A network switch request is already pending.");
            return;
        }

        // Request to switch network
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: network.chainId,
                chainName: network.chainName,
                nativeCurrency: network.nativeCurrency,
                rpcUrls: network.rpcUrls,
                blockExplorerUrls: network.blockExplorerUrls,
            }],
        });

        console.log(`Successfully switched to network ${networkName}`);
    } catch (error) {
        console.error(`Error changing network: ${error.message}`);
    } finally {
        isSwitchingNetwork = false;
    }
};

// Exporting the network switch function
export const handleNetworkSwitch = async () => {
    const networkName = "polygon_amoy";
    await changeNetwork(networkName);
};

// Shortening the address
export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

// Contract functionality

// Reusable function to fetch contract
const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);

// Functionality to interact with ICOMarketContract
export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        // Getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // Getting signer
        const signer = provider.getSigner();

        // Fetching and returning contract
        return fetchContract(ICO_MARKETPLACE_ADDRESS, ICO_MARKETPLACE_ABI, signer);
    } catch (error) {
        console.log(error);
    }
};

// Token Contract
export const TOKEN_CONTRACT = async (TOKEN_ADDRESS) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        // Getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // Getting signer
        const signer = provider.getSigner();

        // Fetching and returning contract
        return fetchContract(TOKEN_ADDRESS, ERC20Generator_ABI, signer);
    } catch (error) {
        console.log(error);
    }
};
