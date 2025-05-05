import React from 'react'
import { Container, Dropdown, DropdownButton, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../redux/authSlice'
import './header.css'

const Header = () => {

  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Navbar expand="lg" className="shadow" variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src='/logo-image.png' alt='logo' className='header-logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          {
            user && user.role === 'admin' ? (
              <Nav>
                <Nav.Link as={Link} to="/admin/create-task">Create Task</Nav.Link>
                <Nav.Link as={Link} to="/admin/list-tasks">List Tasks</Nav.Link>
                <Nav.Link as={Link} to="/admin/list-users">List Users</Nav.Link>
              </Nav>
            ) : null
          }
          <Nav className="ms-auto">

            {
              isAuthenticated ? (
                <DropdownButton className="profile-dropdown" id="dropdown-basic-button" title={user.fullName[0]}>
                  <Dropdown.Item as={Link} to='/user-profile'>Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/change-password">Change Password</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => dispatch(userLogout())}>Logout</Dropdown.Item>
                </DropdownButton>
              ) : <Nav.Link as={Link} to="/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header