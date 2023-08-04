import { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Branch } from '../entities/branch';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { UserState } from '../reducers/userReducer';
import { RootState } from '../store';
import { Role } from '../entities/user';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';


function BranchScreen() {
    const allowedRoles = [Role.OWNER.toString()];
    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);
    const [isCreateBranchModalShown, setIsCreateBranchModalShown] = useState(false);

    //CreateBranchForm
    const [full_address, setFullAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const userLogin = useSelector<RootState, UserState>(state => state.userLogin)

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3000/api/branches', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${userLogin.userInfo.token ? userLogin.userInfo.token : ''}`
                },

            })

            if (response.status === 200) {
                const branches = await response.json();
                setBranches(branches.branches);
            } else if (response.status === 401) {
                navigate('/login');
            }
            else {
                console.log(await response.json())
            }
        })();
    })

    const deleteBranch = async (e: SyntheticEvent, branch_id: string) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/branches/${branch_id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userLogin.userInfo.token ? userLogin.userInfo.token : ''}`
            },

        })

        if (response.status === 204) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Branch Deleted',
                showConfirmButton: false,
                timer: 1500
            }).then(()=> {
                const latestBranches = branches.filter(branch => branch_id !== branch_id)
                setBranches(latestBranches);  
            })
            
        } else if (response.status === 401) {
            navigate('/login');
        }
        else {
            console.log(await response.json())
        }
    }

    const createNewBranch = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/branches`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userLogin.userInfo.token ? userLogin.userInfo.token : ''}`
            },
            body: JSON.stringify({
                full_address:full_address,
                latitude:latitude,
                longitude:longitude,
                name:name,
                phone:phone
            })

        })

        if (response.status === 201) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New Branch Added',
                showConfirmButton: false,
                timer: 1500
            }).then(()=> {
                setIsCreateBranchModalShown(false);  
            })
            const data = await response.json();
            
        } else if (response.status === 401) {
            navigate('/login');
        }
        else {
            console.log(await response.json())
        }
    }
    const handleClose = () => setIsCreateBranchModalShown(false);

    return (
        <>
            <Modal show={isCreateBranchModalShown} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Branch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="full_address">
                            <Form.Label>Full Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Full Address"
                                autoFocus
                                onChange={e => setFullAddress(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Latitude"
                                autoFocus
                                onChange={e => setLatitude(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Longitude"
                                autoFocus
                                onChange={e => setLongitude(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                autoFocus
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                autoFocus
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createNewBranch}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1 className='mb-5'>Branches</h1>
            {
                allowedRoles.includes(userLogin.userInfo.role) ?
                    (
                        <>
                            <Button variant="primary" onClick={() => setIsCreateBranchModalShown(true)}>Create New Branch</Button>
                        </>
                    ) :
                    (
                        <></>
                    )
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>branch_id</th>
                        <th>full_address</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>name</th>
                        <th>phone</th>
                        {
                            allowedRoles.includes(userLogin.userInfo.role) ?
                                (
                                    <>
                                        <th></th>
                                        <th></th>
                                    </>
                                ) :
                                (
                                    <></>
                                )
                        }
                    </tr>
                </thead>
                <tbody>
                    {branches.map((branch: Branch, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{branch.branch_id}</td>
                            <td>{branch.full_address}</td>
                            <td>{branch.latitude}</td>
                            <td>{branch.longitude}</td>
                            <td>{branch.name}</td>
                            <td>{branch.phone}</td>
                            {
                                allowedRoles.includes(userLogin.userInfo.role) ?
                                    (
                                        <>
                                            <td>
                                                <Button variant="primary" onClick={() => navigate(`/branches/${branch.branch_id}`)} >Edit</Button>
                                            </td>
                                            <td>
                                                <Button variant="primary" onClick={(e) => deleteBranch(e, branch.branch_id)}>Delete</Button>
                                            </td>
                                        </>
                                    ) :
                                    (
                                        <></>
                                    )
                            }

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )
}

export default BranchScreen