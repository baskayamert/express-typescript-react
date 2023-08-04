import React, { SyntheticEvent, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { Role } from '../entities/user';
import Swal from 'sweetalert2';


const RegisterScreen = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(Role.EMPLOYEE);

  const navigate = useNavigate();

  const handleOptionChangeForRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Role;
    setRole(value);
  };

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    //interact with the backend
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        role
      })

    })
    if(response.status === 201){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Successful',
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        navigate('/login');
      })
    } else {
      console.log(await response.json())
    }

  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username"
            value={username}
            onChange={e => setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select aria-label="Default select example"
            value={role}
            onChange={handleOptionChangeForRole}>
            {Object.values(Role).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>

  )
}

export default RegisterScreen