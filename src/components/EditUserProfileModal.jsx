import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import useToastAndNavigate from '../hooks/useToastAndNavigate';
import { userProfileUpdate } from '../redux/userSlice';
import { userAuthUpdate } from '../redux/authSlice';

const EditUserProfileModal = ({ show, handleClose }) => {

  const { Formik } = formik;

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const showToast = useToastAndNavigate();

  const schema = yup.object().shape({
    fullName: yup.string().required('Please enter fullname'),
    email: yup.string().required('Please enter email'),
    phone: yup.string().required('Please enter phone').matches(/^[0-9]{10}$/, 'Enter a valid phone number'),
  });

  const handleUserProfileEdit = (values) => {
    dispatch(userProfileUpdate({ ...user, ...values }));
    dispatch(userAuthUpdate({ ...user, ...values }))
    handleClose()
    showToast(true, 'Profile updated successfully!')
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          validationSchema={schema}
          onSubmit={handleUserProfileEdit}
          initialValues={{
            fullName: user?.fullName ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    isValid={touched.fullName && !errors.fullName}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="validationFormik02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
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

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Update
                  </Button>
                </Modal.Footer>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>

    </Modal>
  )
}

export default EditUserProfileModal