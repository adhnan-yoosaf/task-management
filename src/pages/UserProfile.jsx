import React, { useState } from 'react'
import './userProfile.css'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosMail } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import EditUserProfileModal from '../components/EditUserProfileModal'

const UserProfile = () => {

    const { user } = useSelector((state) => state.auth);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className='mt-4'>
            <Row>
                <Card className='border-0 shadow-sm'>
                    <Card.Img className='user-cover-pic' variant="top" src="https://i.pinimg.com/736x/d8/81/53/d88153fc18bed68e88249c42c04d0f8e.jpg" />
                    <Card.Body className='user-profile-card-body'>
                        <Row>
                            <Col md={3} lg={2} className='d-flex justify-content-center justify-content-md-start mb-2'>
                                <Image roundedCircle className='user-profile-pic border border-4 border-white shadow ' src='https://m.media-amazon.com/images/M/MV5BMmU1YWU1NmMtMjAyMi00MjFiLWFmZmUtOTc1ZjI5ODkxYmQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' alt='user' />
                            </Col>
                            <Col md={9} lg={10} className='d-flex align-items-center'>
                                <div>
                                    <h3 className='position-relative'>{user.fullName}
                                        <span>
                                            <Link>
                                                <FaEdit className='user-profile-edit-icon' onClick={handleShow}/>
                                            </Link>
                                        </span>
                                    </h3>
                                    <h6>Web Developer</h6>
                                    <p> <FaPhone /> {user?.phone ?? ''} | <IoIosMail /> {user?.email ?? ''}</p>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
            <EditUserProfileModal 
                show={show}
                handleClose={handleClose}
            />
        </Container>
    )
}

export default UserProfile