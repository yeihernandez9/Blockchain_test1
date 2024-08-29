import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

const MetaMaskContext = createContext();

export const MetaMaskProvider = ({children}) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [balance, setBalance] = useState(null);

    //conection metamask
    const connectToMetamask = async () =>{
        if(window.ethereum){
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);

                const accounts = await provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);
                await fetchBalance(provider, accounts[0]);
            } catch (error) {
                console.log('No se pudo conectar a la Wallet / MetaMask', error)
            }
        }else{
            alert('Por favor debe instalar MetaMask');
        }
    }

    const fetchBalance = async (provider, account) => {
        try {
            const balance = await provider.getBalance(account);
            setBalance(ethers.formatEther(balance));
        } catch (error) {
            console.log('problemas al traer el balance de la billetera',error)
        }
    }

    const disconnectFromMetaMask = () => {
        setAccount(null);
        setProvider(null);
        setBalance(null);
    }

    useEffect (() =>{
        const checkIfConnected = async () => {
            if(window.ethereum){
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                if(accounts.length > 0){
                    setAccount(accounts[0]);
                    setProvider(provider);
                    await fetchBalance(provider, accounts[0]);
                }
            }
        }
        checkIfConnected();
    },[]);

    return(
        <MetaMaskContext.Provider value={{account, balance, connectToMetamask, disconnectFromMetaMask, provider}}>
            {children}
        </MetaMaskContext.Provider>
    );
}

export const useMetaMask = () =>{
    return useContext(MetaMaskContext);
}