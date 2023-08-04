import React, { SyntheticEvent } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../reducers/userReducer';
import { RootState } from '../store';
import { logout } from '../actions/userAction';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(state => state.userLogin)
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch()

  const logoutHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">MindBehind Task</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {
              userLogin.userInfo ? 
              (
                <>
                  <Nav.Link href="/branches">Branches</Nav.Link>
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
                
              )
              :
              (
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
                
              )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header