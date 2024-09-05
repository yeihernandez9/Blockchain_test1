import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import WalletButton from './WalletButton';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Smart Contract</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Wallet</Nav.Link>
          <Nav.Link as={Link} to="/counter">Counter</Nav.Link>
          <Nav.Link as={Link} to="/token">Token</Nav.Link>
          <Nav.Link as={Link} to="/nft">NFTs</Nav.Link>
          </Nav>
          <WalletButton />
        </Container>
      </Navbar>

    </div>
  )
}

export default NavBar
