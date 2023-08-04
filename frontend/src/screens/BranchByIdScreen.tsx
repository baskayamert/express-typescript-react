import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { Branch } from '../entities/branch';
import { useSelector } from 'react-redux';
import { UserState } from '../reducers/userReducer';
import { RootState } from '../store';
import Swal from 'sweetalert2';

function BranchByIdScreen() {
    const [branch, setBranch] = useState({
        branch_id:'',
        latitude:'',
        longitude:'',
        full_address:'',
        name:'',
        phone:''
    } as Branch);

    const { branch_id } = useParams();

    const navigate = useNavigate();

    const userLogin = useSelector<RootState, UserState>(state => state.userLogin)

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/api/branches/${branch_id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${userLogin.userInfo.token ? userLogin.userInfo.token : ''}`
                },

            })

            if (response.status === 200) {
                const data = await response.json();
                setBranch(data.branch);
            } else if (response.status === 401) {
                navigate('/login');
            }
            else {
                console.log(await response.json())
            }
        })();
    },[])

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/branches/${branch_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userLogin.userInfo.token ? userLogin.userInfo.token : ''}`
            },
            body: JSON.stringify(branch)

        })

        if (response.status === 201) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Updated Successfuly',
                showConfirmButton: false,
                timer: 1500
            });
        } else if (response.status === 401) {
            navigate('/login');
        }
        else {
            console.log(await response.json())
        }
    }

    return (
        <FormContainer>
            <h1>{branch.name}</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="branch_id">
                    <Form.Label>Branch_Id</Form.Label>
                    <Form.Control type="text"
                        value={branch.branch_id}
                        onChange={e => { setBranch({...branch, branch_id: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="text"
                        value={branch.latitude}
                        onChange={e => { setBranch({...branch, latitude: e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="text"
                        value={branch.longitude}
                        onChange={e => { setBranch({...branch, longitude:e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                        value={branch.name}
                        onChange={e => { setBranch({...branch, name:e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="full_address">
                    <Form.Label>Full_address</Form.Label>
                    <Form.Control type="text"
                        value={branch.full_address}
                        onChange={e => { setBranch({...branch, full_address:e.target.value}) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text"
                        value={branch.phone}
                        onChange={e => { setBranch({...branch, phone:e.target.value}) }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </FormContainer>

    )
}

export default BranchByIdScreen