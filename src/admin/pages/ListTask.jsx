import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteTask, editTask } from '../../redux/taskSlice';
import useToastAndNavigate from '../../hooks/useToastAndNavigate';
import EditTaskModal from '../../components/EditTaskModal';
import { Link } from 'react-router-dom';

const ListTask = () => {

  const dispatch = useDispatch();
  const showToast = useToastAndNavigate();

  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);

  const [show, setShow] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (task) => {
    setTaskToEdit(task);
    setShow(true);
  }

  const handleTaskDelete = (id) => {
    dispatch(deleteTask(id));
    showToast(true, 'Task deleted successfully')
  }

  const handleTaskEdit = (values) => {
    dispatch(editTask({ ...values, id: taskToEdit.id }))
    showToast(true, 'Task edited successfully!')
    handleClose()
  }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Assigned To</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks && tasks.map((task, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.priority}</td>
                    <td>{task.deadline}</td>
                    <td>
                      {
                        users.find((u) => u.id === Number(task.assignedTo)).fullName
                      }
                    </td>
                    <td className='align-middle text-center'>
                      <Link onClick={() => handleShow(task)}>
                        <FaEdit />
                      </Link>
                    </td>
                    <td className='align-middle text-center'>
                      <Link onClick={() => handleTaskDelete(task.id)}>
                        <MdDelete />
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>

      <EditTaskModal
        show={show}
        handleClose={handleClose}
        handleTaskEdit={handleTaskEdit}
        taskToEdit={taskToEdit}
      />
    </Container>
  )
}

export default ListTask