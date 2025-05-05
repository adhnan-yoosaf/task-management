import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/authSlice';
import useToastAndNavigate from '../hooks/useToastAndNavigate';

const Login = () => {
    const { Formik } = formik;

    const dispatch = useDispatch();
    const showToastAndNavigate = useToastAndNavigate();

    const schema = yup.object().shape({
        email: yup.string().required('Please enter your email address.')
            .email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password'),
    });

    const { users } = useSelector((state) => state.users);

    const handleLogin = (loginData) => {

        const user = users.find((u) => u.email === loginData.email)

        if (!user) {
            return showToastAndNavigate(false, 'Invalid Credentials');
        }
        if (user.password !== loginData.password) {
            return showToastAndNavigate(false, 'Invalid Credentials');
        }
        dispatch(userLogin(user));
        showToastAndNavigate(true, 'Logged in successfully!', '/');
    }

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col md={4}>
                    <Card className='p-5 shadow border-0 mt-5'>
                        <Row>
                            <Col className='text-center'>
                                <h2 className='fw-bold'>Login</h2>
                            </Col>
                        </Row>
                        <Row className='justify-content-center mt-3'>
                            <Col>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={handleLogin}
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row>
                                                <Form.Group as={Col} controlId="validationFormik01">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
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
                                                <Form.Group as={Col} controlId="validationFormik02">
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
                                            <Button type="submit" className="mt-3 w-100">Login</Button>
                                            <p className='text-center mt-3'>Don't have an account?
                                                <Link to={'/register'}>Register now.</Link>
                                            </p>
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

export default Login;