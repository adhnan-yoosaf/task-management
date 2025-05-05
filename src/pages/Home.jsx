import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';

const Home = () => {

  const { tasks } = useSelector((state) => state.tasks)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const tasksToDisplay = tasks.filter((task) => Number(task.assignedTo) === user.id)

  const sortedTasks = [...tasksToDisplay].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1
    if (a.status !== 'completed' && b.status === 'completed') return -1
    return 0
  })

  return (
    <Container>
      <Row className='mt-5'>
        {isAuthenticated ? (
          sortedTasks && sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <Col key={task.id} md={6} lg={4} xl={3} className="d-flex justify-content-center mb-4">
                <TaskCard id={task.id} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <h3>No tasks found</h3>
            </Col>
          )
        ) : (
          <Col className="text-center">
            <h3>Login to view tasks</h3>
          </Col>
        )}

      </Row>
    </Container>
  )
}

export default Home


