import React, { useEffect, useState } from 'react'
import {getBalanceTeto, getTokenName, getTokenSymbol, transferirTokens } from '../../services/ERC20Services';
import {useMetaMask} from '../../contexts/MetaMaskContext';

const TokenPage = () => {
  const [balanceTeto, setBalanceTeto] = useState(0);
  const [nameToken, setNameToken]= useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const [symbolToken, setSymbolToken]= useState('');
  const {account, connectToMetamask} = useMetaMask();


  useEffect(() =>{
    if(account){
      fetchBalance(account);
      
    }
  },[account]);

  const fetchBalance = async (account) =>{
    const balance = await getBalanceTeto(account);
    setBalanceTeto(balance);
  }

  const fechtName = async () =>{
    const name = await getTokenName();
    setNameToken(name);
  }

  const handleTransfer = async () =>{
    if(transferAmount > 0 && toAddress){
      await transferirTokens(account, toAddress, transferAmount);
      fetchBalance(transferirTokens);
    }
  }

  useEffect(()=>{
    fechtName();
  },[])

  return (
    <div>
      <h1> {nameToken}</h1>
      
      {account ? (
        <>
          <p>Address: {account}</p>
          <p>Balance : {balanceTeto/100} TETO</p>
          <div>
            <input
              type="text"
              placeholder="Dirección del receptor"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Cantidad a transferir"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <button onClick={handleTransfer}>Transferir Tokens</button>
          </div>
        </>
      ) : (
        <p> No esta conectado a MetaMask</p>
      )}

    </div>
  )
}

export default TokenPage
