import React, {useContext, useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import context from '../context/context';

const Activity = () => {
    const a = useContext(context);
    const getallactivity = a.getallactivity;
    const activity = a.activity;
    const addhours = a.addhours;
    useEffect(() => {
        getallactivity();
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [data, setdata] = useState({
        hours: 0,
        id: ""
    });

    const handleModalClose = () => {
        setShowModal(false);
    };


    const handleFormSubmit = () => {
        addhours(data)
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleAddhours = (id) => {
        setdata((prevData) => ({
            ...prevData,
            id: id,
        }));
        setShowModal(true)
    }
    return (
        <div className='container'>
            <h1 className="my-3 text-center">All Activities</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Available Hours</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {activity.map((plan,index) => (
                        <tr key={index}>
                            <td>{plan.title}</td>
                            <td>{plan.description}</td>
                            <td>{plan.availableHours.length}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleAddhours(plan._id)}
                                >
                                    Add Hours
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} backdrop="static" onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Hours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Hours</Form.Label>
                            <Form.Control
                                type="number"
                                name="hours"
                                value={data.hours}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleFormSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Activity;
