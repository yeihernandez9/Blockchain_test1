import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import WalletButton from './WalletButton';

const NavBar = () => {
  return (
    <div>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Smart Contract</Navbar.Brand>
          <WalletButton />
        </Container>
      </Navbar>

    </div>
  )
}

export default NavBar
