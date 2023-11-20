import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = ({ show, handleClose, onSaveContact}) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    nickName: '',
    DOB: '',
    mobileNumbers: [''],
    emails: [''],
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [contactData, setContactData] = React.useState(initialValues);

  const handleAddPhoneNumber = () => {
    setContactData((prevData) => ({
      ...prevData,
      mobileNumbers: [...prevData.mobileNumbers, ''],
    }));
  };

  const handleRemovePhoneNumber = (index) => {
    setContactData((prevData) => ({
      ...prevData,
      mobileNumbers: prevData.mobileNumbers.filter((_, i) => i !== index),
    }));
  };

  const handleAddEmails = () => {
    setContactData((prevData) => ({
      ...prevData,
      emails: [...prevData.emails, ''],
    }));
  };

  const handleRemoveEmails = (index) => {
    setContactData((prevData) => ({
      ...prevData,
      emails: prevData.emails.filter((_, i) => i !== index),
    }));
  };

  const validateNumber = (number) => {
    return /^\d{10}$/.test(number);
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!contactData.mobileNumbers.every(validateNumber)) {
      toast.error('Invalid mobile number format');
      return;
    }

    if (!contactData.emails.every(validateEmail)) {
      toast.error('Invalid email address format');
      return;
    }
    const data = {
      ...contactData,
    };
    await fetch('/allcontacts',{
      method : 'POST',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
     }).then((response)=> console.log(response)).catch((err)=>console.log(err));
    toast.success('Contact added successfully!');
    console.log(data);
    onSaveContact();
    setContactData(initialValues);
    handleClose();
  };

  return (
    <div className='container'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First Name'
                value={contactData.firstName}
                required
                onChange={e => setContactData({...contactData, firstName: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last Name'
                value={contactData.lastName}
                onChange={e => setContactData({...contactData, lastName : e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nickname'
                value={contactData.nickName}
                required
                onChange={e => setContactData({...contactData, nickName : e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type='date'
                placeholder='Date of Birth'
                value={contactData.DOB}
                required
                max={getCurrentDate()}
                onChange={e => setContactData({...contactData, DOB : e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile Numbers</Form.Label>
              {contactData.mobileNumbers.map((number, index) => (
                <InputGroup key={index} className="mb-2">
                  <Form.Control
                    type="number"
                    placeholder="Mobile Number"
                    value={number}
                    required
                    onChange={(e) => {
                      const updatedNumbers = [...contactData.mobileNumbers];
                      updatedNumbers[index] = e.target.value;
                      setContactData({...contactData, mobileNumbers : updatedNumbers,
                      });
                    }}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemovePhoneNumber(index)}
                    disabled={index === 0}
                  >
                    -
                  </Button>
                </InputGroup>
              ))}
              <Button variant="success" onClick={handleAddPhoneNumber}>
                +
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>Emails</Form.Label>
              {contactData.emails.map((email, index) => (
                <InputGroup key={index} className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => {
                      const updatedEmails = [...contactData.emails];
                      updatedEmails[index] = e.target.value;
                      setContactData({
                        ...contactData,
                        emails : updatedEmails});
                    }}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveEmails(index)}
                    disabled={index === 0}
                  >
                    -
                  </Button>
                </InputGroup>
              ))}
              <Button variant="success" onClick={handleAddEmails}>
                +
              </Button>
            </Form.Group>
            <Button variant='secondary' className='rounded-pill my-2 mx-2' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit' className='rounded-pill'>
              Save Contact
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddContact;
