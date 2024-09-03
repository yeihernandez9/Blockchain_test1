import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useMetaMask } from '../../contexts/MetaMaskContext'
import CounterPage from '../counter/CounterPage';

const Home = () => {
    const {account, balance} = useMetaMask();
  return (
    <Container className='mt-4'>
        <h1 className='text-center mb-4'>Home</h1>
        {account ? (
            <Row className='justify-content-center'>
                <Col md={6}>
                 <Card className='text-center shadow-sm'>
                    <Card.Body>
                        <Card.Title>Account:</Card.Title>
                        <Card.Text>{account}</Card.Text>
                        <Card.Text>
                            <strog>Balance:</strog> {balance ? parseFloat(balance).toFixed(2): '0.00'} ETH
                        </Card.Text>
                    </Card.Body>
                 </Card>
                </Col>
            </Row>
        ):(
            <Row className='justify-content-center'>
                <Col md={6}>
                 <Card className='text-center shadow-sm'>
                    <Card.Body>
                        <Card.Title>Por favor debe hacer la coneccion con MetaMask</Card.Title>
                        
                    </Card.Body>
                 </Card>
                </Col>
            </Row>
        )} 
    </Container>
  )
}

export default Home