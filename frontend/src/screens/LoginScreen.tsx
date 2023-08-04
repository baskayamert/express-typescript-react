import React, { SyntheticEvent, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userAction';
import {useSelector, useDispatch} from 'react-redux'
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

const LoginScreen = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction>= useDispatch() 

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(username, password))
  }

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"
           value={username}
           onChange={e => setUserName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>

  )
}

export default LoginScreen