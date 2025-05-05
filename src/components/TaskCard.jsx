import React, { useEffect, useState } from 'react'
import { Card, Badge, Modal, Button } from 'react-bootstrap'
import './TaskCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { completeTask } from '../redux/taskSlice'

const TaskCard = ({ id }) => {

    const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === id))

    const dispatch = useDispatch();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'danger'
            case 'medium':
                return 'warning'
            default:
                return 'secondary'
        }
    }

    const formatDate = (deadline) => {
        const date = new Date(deadline)
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    const truncateText = (str, length) => {
        return str.length > length ? str.substring(0, length) + "..." : str;
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCompleted = () => {
        dispatch(completeTask({ ...task, status: 'completed' }))
    }

    useEffect(() => {
        if (task.status === 'completed') {
            handleClose();

        }
    }, [task.status]);


    return (
        <>
            {task ? (
                <Card className={`task-card ${task.status === 'completed' ? 'completed-task' : ''}`} onClick={handleShow}>
                    <Card.Body>
                        <Card.Title className='task-title'>
                            {truncateText(task.name, 50)}
                        </Card.Title>
                        <Card.Text className='task-description'>
                            {truncateText(task.description, 100)}
                        </Card.Text>
                        <div className="mb-2">
                            <Badge bg={getPriorityColor(task.priority)} className="me-2 text-black">
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                            <small>Deadline: {formatDate(task.deadline)}</small>
                        </div>
                    </Card.Body>
                </Card>
            ) : null}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{task.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCompleted}>
                        Mark as completed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TaskCard
