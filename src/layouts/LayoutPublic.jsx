import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBar from '../components/NavBar'

const LayoutPublic = () => {
  return (
    <div>
      <NavBar />
      <Container className='container'>
        <Outlet />
      </Container>
    </div>
  )
}

export default LayoutPublic