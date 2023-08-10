import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import context from "../context/context";

const AddActivity = () => {
  const a = useContext(context);
  const getalladminactivity = a.getalladminactivity;
  const activity = a.activity;
  const addactivity = a.addactivity;
  const editactivity = a.editactivity;
  const allusers = a.users;
  const getusers = a.getusers;
  const delactivity = a.delactivity;
  useEffect(() => {
    getalladminactivity();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formdata, setformdata] = useState({
    users: [],
    department: [],
    numberofhour: 0,
    title: "",
    description: "",
  });
  const [data, setdata] = useState({
    users: [],
    department: [],
    id: "",
  });
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModal2Close = () => {
    setShowModal2(false);
  };

  const handleFormSubmit = () => {
    addactivity(formdata);
  };
  const handleFormupdateSubmit = () => {
    editactivity(data);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEdit = (id, users, department) => {
    setdata({
      id: id,
      users,
      department,
    });
    setShowModal(true);
  };

  const handledepartCheckboxChange = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add user to data.users
      setdata((prevData) => ({
        ...prevData,
        department: [...prevData.department, value],
        users: [],
      }));
    } else {
      // Remove user from data.users
      setdata((prevData) => ({
        ...prevData,
        department: prevData.department.filter((userId) => userId !== value),
        users: [],
      }));
    }
  };
  const handledepart2CheckboxChange = async (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add user to data.users
      setformdata((prevData) => ({
        ...prevData,
        department: [...prevData.department, value],
        users: [],
      }));
    } else {
      // Remove user from data.users
      setformdata((prevData) => ({
        ...prevData,
        department: prevData.department.filter((userId) => userId !== value),
        users: [],
      }));
    }
  };
  useEffect(() => {
    getusers({ department: data.department });
  }, [data.department]);
  useEffect(() => {
    getusers({ department: formdata.department });
  }, [formdata.department]);

  const handleUserCheckboxChange = async (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add user to data.users
      setdata((prevData) => ({
        ...prevData,
        users: [...prevData.users, value],
      }));
    } else {
      // Remove user from data.users
      setdata((prevData) => ({
        ...prevData,
        users: prevData.users.filter((userId) => userId !== value),
      }));
    }
  };
  const handleUser2CheckboxChange = async (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add user to data.users
      setformdata((prevData) => ({
        ...prevData,
        users: [...prevData.users, value],
      }));
    } else {
      // Remove user from data.users
      setformdata((prevData) => ({
        ...prevData,
        users: prevData.users.filter((userId) => userId !== value),
      }));
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3 text-center">All Activities</h1>
      <div className="btn btn-info my-2" onClick={() => setShowModal2(true)}>
        Add Activity
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Available Hours</th>
            <th>Taken Hours</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((plan, index) => (
            <tr key={index}>
              <td>{plan.title}</td>
              <td>{plan.description}</td>
              <td>{plan.availableHours.length}</td>
              <td>{plan.hours.length - plan.availableHours.length}</td>
              <td>
                <ul>
                  {plan.users.map((user) => {
                    return <li>{user}</li>;
                  })}
                </ul>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleEdit(plan._id, plan.users, plan.department)
                  }
                >
                  Edit Users/Department
                </Button>
                <Button
                  variant="danger"
                  onClick={() => delactivity({ activity: plan._id })}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} backdrop="static" onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title onClick={() => console.log(data)}>
            Edit Activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="dropdown my-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Departments
              </button>
              <ul
                className="dropdown-menu alllanguages"
                aria-labelledby="languageDropdown"
              >
                {["security", "accountant"].map((user, index) => (
                  <li key={index}>
                    <label className="dropdown-item">
                      <input
                        className="mx-2 pointer"
                        type="checkbox"
                        value={user}
                        checked={data.department.includes(user)}
                        onChange={handledepartCheckboxChange}
                      />
                      {user}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select users
              </button>
              <ul
                className="dropdown-menu alllanguages"
                aria-labelledby="languageDropdown"
              >
                {allusers?.map((user, index) => (
                  <li key={index}>
                    <label className="dropdown-item">
                      <input
                        className="mx-2 pointer"
                        type="checkbox"
                        value={user._id}
                        checked={data.users.includes(user._id)}
                        onChange={handleUserCheckboxChange}
                      />
                      {user.email}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormupdateSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} backdrop="static" onHide={handleModal2Close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formdata.title}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formdata.description}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="number"
                name="numberofhour"
                value={formdata.hours}
                onChange={handleFormChange}
              />
            </Form.Group>
            <div className="dropdown my-2">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Departments
              </button>
              <ul
                className="dropdown-menu alllanguages"
                aria-labelledby="languageDropdown"
              >
                {["security", "accountant"].map((user, index) => (
                  <li key={index}>
                    <label className="dropdown-item">
                      <input
                        className="mx-2 pointer"
                        type="checkbox"
                        value={user}
                        checked={formdata.department.includes(user)}
                        onChange={handledepart2CheckboxChange}
                      />
                      {user}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select users
              </button>
              <ul
                className="dropdown-menu alllanguages"
                aria-labelledby="languageDropdown"
              >
                {allusers?.map((user, index) => (
                  <li key={index}>
                    <label className="dropdown-item">
                      <input
                        className="mx-2 pointer"
                        type="checkbox"
                        value={user._id}
                        checked={formdata.users.includes(user._id)}
                        onChange={handleUser2CheckboxChange}
                      />
                      {user.email}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal2Close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddActivity;
