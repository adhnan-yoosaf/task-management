import React from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { userDelete, userRoleUpdate, userStatusUpdate } from '../../redux/userSlice';
import { userAuthUpdate } from '../../redux/authSlice';
import useToastAndNavigate from '../../hooks/useToastAndNavigate';

const ListUsers = () => {

    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.user);
    const { users } = useSelector((state) => state.users);
    const showToast = useToastAndNavigate();
    const handleUserDelete = (id) => {
        dispatch(userDelete(id));
    };

    const handleUserStatusUpdate = (id) => {
        dispatch(userStatusUpdate(id));
        showToast(true, 'User status updated successfully!')
        if (authUser.id === id) {
            dispatch(userAuthUpdate({ status: !authUser.status }))
        }
    }

    const handleUserRoleUpdate = (id, role) => {
        dispatch(userRoleUpdate({ id, role }));
        showToast(true, 'User role updated successfully!')
        if (authUser.id === id) {
            dispatch(userAuthUpdate({ role }))
        }
    }

    return (
        <Container className='mt-5'>
            <Row>
                {users.length < 1 ? (
                    <Col className='text-center'>
                        <h3>No Users Found</h3>
                    </Col>
                ) : (
                    <Col className='table-responsive'>
                        <Table striped bordered hover variant='dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Form.Select
                                                value={user.role}
                                                onChange={(e) => handleUserRoleUpdate(user.id, e.target.value)}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Form>
                                                <Form.Check
                                                    type="switch"
                                                    id="user-status-toggler"
                                                    label={user.status ? 'Active' : 'Inactive'}
                                                    checked={user.status}
                                                    onChange={() => handleUserStatusUpdate(user.id)}
                                                />
                                            </Form>
                                        </td>
                                        <td className='align-middle text-center'>
                                            <MdDelete onClick={() => handleUserDelete(user.id)} style={{ cursor: 'pointer' }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default ListUsers;