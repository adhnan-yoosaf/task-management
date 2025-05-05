import React from 'react'
import './ChangePassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { userLogout } from '../redux/authSlice';
import useToastAndNavigate from '../hooks/useToastAndNavigate'
import { updatePassword } from '../redux/userSlice';

const ChangePassword = () => {

    const { Formik } = formik;
    const dipatch = useDispatch()

    const { user } = useSelector((state => state.auth))
    console.log(user)

    const toastAndNavigate = useToastAndNavigate()

    const schema = yup.object().shape({
        currentPassword: yup.string().required('Please enter current password'),
        newPassword: yup.string()
            .required('Please enter a new password')
            .notOneOf([yup.ref("currentPassword")], 'New Password should be different from current password'),
        confirmPassword: yup.string()
            .required('Please confirm new password')
            .oneOf([yup.ref("newPassword")], 'Confirm password should be the same as new password'),
    });

    const handlePasswordChange = (values, { resetForm }) => {
        if (values.currentPassword === user.password) {
            dipatch(updatePassword({ ...values, id: user.id }));
            toastAndNavigate(true, 'Password changed successfully!', '/login')
            dipatch(userLogout())
        } else {
            toastAndNavigate(false, 'Incorrect current password. Please try again.')
            resetForm();
        }


    }

    return (
        <div className='change-password-container'>
            <Card className='change-password-card'>
                <Card.Body>
                    <Card.Title>
                        Change password
                    </Card.Title>
                    <Row className='justify-content-center'>
                        <Col>
                            <Formik
                                enableReinitialize
                                validationSchema={schema}
                                onSubmit={handlePasswordChange}
                                initialValues={{
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                            >
                                {({ isSubmitting, handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>Current Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="currentPassword"
                                                    value={values.currentPassword}
                                                    onChange={handleChange}
                                                    isValid={touched.currentPassword && !errors.currentPassword}
                                                    isInvalid={!!errors.currentPassword}
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.currentPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="newPassword"
                                                    value={values.newPassword}
                                                    onChange={handleChange}
                                                    isValid={touched.newPassword && !errors.newPassword}
                                                    isInvalid={!!errors.newPassword}
                                                />

                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.newPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} controlId="validationFormik03">
                                                <Form.Label>Confirm password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    isValid={touched.confirmPassword && !errors.confirmPassword}
                                                    isInvalid={!!errors.confirmPassword}
                                                />

                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.confirmPassword}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Button type="submit" className='w-100 mt-4'>
                                            {isSubmitting ? 'changing password...' : 'Change Password'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ChangePassword;