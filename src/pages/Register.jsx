import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/userSlice';
import useToastAndNavigate from '../hooks/useToastAndNavigate';

const Register = () => {
    const { Formik } = formik;

    const dipatch = useDispatch();
    const showToastAndNavigate = useToastAndNavigate();

    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your fullname'),
        email: yup.string().required('Please enter your email address.')
            .email('Please enter a valid email address'),
        phone: yup.string().required('Please enter your phone number'),
        password: yup.string().required('Please enter your password'),
    });

    const handleRegister = (user) => {
        user = {...user, id: Date.now(), role: 'user', status: true}
        dipatch(userRegister(user));
        showToastAndNavigate(true, 'User registered successfully!', '/login');
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={4}>
                    <Card className='p-5 shadow border-0 mt-5'>
                        <Row>
                            <Col className='text-center'>
                                <h2 className='fw-bold'>Register</h2>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mt-3'>
                            <Col>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handleRegister}
                                    initialValues={{
                                        fullName: '',
                                        email: '',
                                        phone: '',
                                        password: '',
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationFormik01">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="fullName"
                                                        value={values.fullName}
                                                        onChange={handleChange}
                                                        isValid={touched.fullName && !errors.fullName}
                                                        isInvalid={!!errors.fullName}
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{errors.fullName}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationFormik02">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        isValid={touched.email && !errors.email}
                                                        isInvalid={!!errors.email}
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationFormik03">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone"
                                                        value={values.phone}
                                                        onChange={handleChange}
                                                        isValid={touched.phone && !errors.phone}
                                                        isInvalid={!!errors.phone}
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationFormik04">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        isValid={touched.password && !errors.password}
                                                        isInvalid={!!errors.password}
                                                    />
                                                    <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <Button type="submit" className="mt-3 w-100">Register</Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default Register;