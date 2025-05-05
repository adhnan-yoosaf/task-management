import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { Card, Container } from 'react-bootstrap';

function Contact() {
    const { Formik } = formik;

    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your fullname'),
        email: yup.string().required('Please enter a email').email('Invalid email'),
        message: yup.string().required('Please enter a message'),
    });

    const handleContact = (values) => {
        console.log(values)
    }

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col>
                    <h2 className='text-center'>Contact Us</h2>
                </Col>
            </Row>
            <Row className='justify-content-center mt-3'>
                <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Card className='p-5 shadow border-0'>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleContact}
                            initialValues={{
                                fullName: '',
                                email: '',
                                message: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationFormik01">
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="fullName"
                                                value={values.fullName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.fullName}
                                                isValid={touched.fullName && !errors.fullName}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.fullName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
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
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="message"
                                                value={values.message}
                                                onChange={handleChange}
                                                isValid={touched.message && !errors.message}
                                                isInvalid={!!errors.message}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" className='w-100 mt-3'>Submit</Button>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;