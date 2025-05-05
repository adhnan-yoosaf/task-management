import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/taskSlice';
import useToastAndNavigate from '../../hooks/useToastAndNavigate';

const CreateTask = () => {

    const { Formik } = formik;

    const dispatch = useDispatch();
    const showToast = useToastAndNavigate();

    const { users } = useSelector((state) => state.users);

    const schema = yup.object().shape({
        name: yup.string().required('Please enter a task name'),
        description: yup.string().required('Please enter a task description'),
        priority: yup.string().required('Please set the task priority'),
        deadline: yup.string().required('Please enter a due date'),
        assignedTo: yup.string().required('Please select an option')
    });

    const handleCreateTask = (task, { resetForm }) => {
        dispatch(createTask({ ...task, id: Date.now() }));
        showToast(true, 'Task created successfully!');
        resetForm()
    }

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Card className='p-5 mt-5 shadow border-0'>
                        <Formik
                            validationSchema={schema}
                            onSubmit={handleCreateTask}
                            initialValues={{
                                name: '',
                                description: '',
                                priority: '',
                                deadline: '',
                                assignedTo: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationFormik01">
                                            <Form.Label>Task name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder='Enter task name'
                                                value={values.name}
                                                onChange={handleChange}
                                                isValid={touched.name && !errors.name}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationFormik02">
                                            <Form.Label>Task description</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                name="description"
                                                placeholder='Enter task description'
                                                value={values.description}
                                                onChange={handleChange}
                                                isValid={touched.description && !errors.description}
                                                isInvalid={!!errors.description}
                                            />

                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationFormik03">
                                            <Form.Label>Priority</Form.Label>
                                            <Form.Select
                                                name="priority"
                                                value={values.priority}
                                                onChange={handleChange}
                                                isValid={touched.priority && !errors.priority}
                                                isInvalid={!!errors.priority}
                                            >
                                                <option>Select an option</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.priority}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="validationFormik04">
                                            <Form.Label>Deadline</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="deadline"
                                                value={values.deadline}
                                                onChange={handleChange}
                                                isInvalid={!!errors.deadline}
                                                min={new Date().toISOString().split("T")[0]}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.deadline}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationFormik05">
                                            <Form.Label>Assign to</Form.Label>
                                            <Form.Select
                                                name="assignedTo"
                                                value={values.assignedTo}
                                                onChange={handleChange}
                                                isValid={touched.assignedTo && !errors.assignedTo}
                                                isInvalid={!!errors.assignedTo}
                                            >
                                                <option>Select an option</option>
                                                {
                                                    users && users.map((user, i) => (
                                                        <option value={user.id} key={i}>{user.fullName}</option>
                                                    ))
                                                }
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.assignedTo}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit" className='w-100 fw-bold'>Create Task</Button>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateTask