import React, { useState, useContext, createContext, useEffect, Children } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";

// INTERNAL IMPORTS
import {
    ERC20Generator,
    ERC20Generator_BYTECODE,
    handleNetworkSwitch,
    shortenAddress,
    ICO_MARKETPLACE_ADDRESS,
    ICO_MARKETPLACE_CONTRACT,
    TOKEN_CONTRACT,
    PINATA_API_KEY,
    PINATA_SECRET_KEY,
    ERC20Generator_ABI,
} from './constants';

export const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    // State Variables
    const [address, setAddress] = useState();
    const [accountBalance, setAccountBalance] = useState('null');
    const [loader, setLoader] = useState(false);
    const [reCall, setReCall] = useState(0);
    const [currency, setCurrency] = useState("MATIC");

    // State Variables for handling components
    const [openBuyToken, setOpenBuyToken] = useState(false);
    const [openWithDrawToken, setOpenWithDrawToken] = useState(false);
    const [openTransferToken, setOpenTransferToken] = useState(false);
    const [openTokenCreator, setOpenTokenCreator] = useState(false);
    const [openCreateICO, setOpenCreateICO] = useState(false);

    const notifySuccess = (msg) => { toast.success(msg, { duration: 200 }) };
    const notifyError = (msg) => { toast.error(msg, { duration: 200 }) };

    // Functions
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return notifyError("No account found");
            await handleNetworkSwitch();
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            // Getting first account from array accounts
            if (accounts.length) {
                setAddress(accounts[0]);

                // Getting balance of account[0]
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const getBalance = await provider.getBalance(accounts[0]);

                // Converting balance storing in State Variable
                const bal = ethers.utils.formatEther(getBalance);
                setAccountBalance(bal);
                return accounts[0];
            } else {
                notifyError("No account found");
            }
        } catch (error) {
            console.log(error);
            notifyError("No account found");
        }
    };

    // Trigger when there is a change in the address
    useEffect(() => {
        checkIfWalletConnected();
    }, [address]);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return notifyError("No account found");
            await handleNetworkSwitch();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            // Getting first account from array accounts
            if (accounts.length) {
                setAddress(accounts[0]);

                // Getting balance of account[0]
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const getBalance = await provider.getBalance(accounts[0]);

                // Converting balance storing in State Variable
                const bal = ethers.utils.formatEther(getBalance);
                setAccountBalance(bal);
                return accounts[0];
            } else {
                notifyError("No account found");
            }
        } catch (error) {
            console.log(error);
            notifyError("No account found");
        }
    };

};