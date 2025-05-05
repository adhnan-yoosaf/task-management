import React from "react";
import * as formik from "formik";
import * as yup from "yup";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const EditTaskModal = ({ handleClose, handleTaskEdit, taskToEdit, show }) => {
    const { Formik } = formik;

    const { users } = useSelector((state) => state.users);

    const schema = yup.object().shape({
        name: yup.string().required("Please enter a task name"),
        description: yup.string().required("Please enter a task description"),
        priority: yup.string().required("Please set the task priority"),
        deadline: yup.string().required("Please enter a due date"),
        assignedTo: yup.string().required("Please select an option"),
    });

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="btn-close-white">
                <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleTaskEdit}
                    initialValues={{
                        name: taskToEdit?.name || "",
                        description: taskToEdit?.description || "",
                        priority: taskToEdit?.priority || "",
                        deadline: taskToEdit?.deadline || "",
                        assignedTo: taskToEdit?.assignedTo || "",
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
                                        placeholder="Enter task name"
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
                                        as="textarea"
                                        name="description"
                                        placeholder="Enter task description"
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
                                        {users &&
                                            users.map((user, i) => (
                                                <option value={user.id} key={i}>
                                                    {user.fullName}
                                                </option>
                                            ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.assignedTo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={handleSubmit}>
                                    Save changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default EditTaskModal;
