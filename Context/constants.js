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
        chainId: `0x${Number(8002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MAT",
            decimals: 18,
        },
        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/polygon"],
        blockExplorerUrls: ["https://www.polyscan.com"],
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Mainnet",
        nativeCurrency: {
            name: "Binance Chain",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/bsc"],
        blockExplorerUrls: ["https://www.bscscan.com"],
    },
    base_mainnet: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Base Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://base.mainnet.org"],
        blockExplorerUrls: ["https://www.bscscan.com"],
    },
};

// Function to switch network
const changeNetwork = async (networkName) => {
    try {
        const network = networks[networkName];
        if (!network) {
            console.error(`Network ${networkName} not found in networks object.`);
            return;
        }

        console.log('Switching to network:', networkName, network);

        if (!window.ethereum) throw new Error("No crypto Wallet found");
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
    }
};

// Exporting the network switch function
export const handleNetworkSwitch = async () => {
    const networkName = "polygon_amoy";
    await changeNetwork(networkName);
}

// Shortening the address
export const shortenAddress = (address) => `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

// Contract functionality

// Reusable function
const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);

// Functionality to interact with ICOMarketContract
// Making connection using Web3Modal
export const ICO_MARKETPLACE_CONTRACT = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        // Getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // Getting signer
        const signer = provider.getSigner();

        // Calling fetch contract internally to return contract
        const contract = fetchContract(
            ICO_MARKETPLACE_ADDRESS,
            ICO_MARKETPLACE_ABI,
            signer
        );

        // Returning for calling in required function
        return contract;
    } catch (error) {
        console.log(error);
    }
}

// Token Contract
export const TOKEN_CONTRACT = async (TOKEN_ADDRESS) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        // Getting provider
        const provider = new ethers.providers.Web3Provider(connection);

        // Getting signer
        const signer = provider.getSigner();

        // Calling fetch contract internally to return contract
        const contract = fetchContract(
            TOKEN_ADDRESS,
            ERC20Generator_ABI,
            signer
        );

        // Returning for calling in required function
        return contract;
    } catch (error) {
        console.log(error);
    }
}
