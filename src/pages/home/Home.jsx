import React from 'react'
import { Container } from 'react-bootstrap'
import { useMetaMask } from '../../contexts/MetaMaskContext'

const Home = () => {
    const {account, balance} = useMetaMask();
  return (
    <Container>
        {account ? (
            <div>
                <h1>Account: {account}</h1>
                <strong>Balance: {balance ? parseFloat(balance).toFixed(2): '0.00' } Eth</strong>
            </div>
        ):(
            <div>
                <h1>
                    You are not connected to MetaMask
                </h1>
            </div>
        )}
    </Container>
  )
}

export default Home