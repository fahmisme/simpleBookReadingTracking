import { ethers } from 'ethers';
import { contractAddress, contractABI } from './contractABI.js';

let contract = undefined;
let signer = undefined;

export const initializeContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
};
