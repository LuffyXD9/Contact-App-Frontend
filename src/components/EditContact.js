import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditContact = ({ contact ,edit,closeEdit,onSaveContact}) => {
  const [editedContact, setEditedContact] = useState({...contact});

  useEffect(()=>{
    setEditedContact(contact);
  },[contact]);

  const handleAddPhoneNumber = () => {
    setEditedContact({
      ...editedContact,
      mobileNumbers: [...editedContact.mobileNumbers, ''],
    });
  };

  const handleRemovePhoneNumber = (index) => {
    const filteredPhoneNumbers = editedContact.mobileNumbers.filter(
      (_, i) => i !== index
    );
    setEditedContact({
      ...editedContact,
      mobileNumbers: filteredPhoneNumbers,
    });
  };

  const handleAddEmails = () => {
    setEditedContact({
      ...editedContact,
      emails: [...editedContact.emails, ''],
    });
  };

  const handleRemoveEmails = (index) => {
    const filteredEmails = editedContact.emails.filter((_, i) => i !== index);
    setEditedContact({
      ...editedContact,
      emails: filteredEmails,
    });
  };

  const handleEdit = async(e) => {
    e.preventDefault();

    const data = {
      ...editedContact,
    };
    await fetch('/allcontacts/' + data._id,{
      method : 'PATCH',
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
     }).then((response)=> console.log(response)).catch((err)=>console.log(err));

    onSaveContact();
    toast.success('Contact edited successfully!');
    closeEdit();
  };

  return (
    <Modal show={edit} onHide={closeEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={editedContact.firstName}
              onChange={(e) =>
                setEditedContact({ ...editedContact, firstName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={editedContact.lastName}
              onChange={(e) =>
                setEditedContact({ ...editedContact, lastName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nickname"
              value={editedContact.nickName}
              onChange={(e) =>
                setEditedContact({ ...editedContact, nickName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              value={editedContact.DOB ? editedContact.DOB.slice(0, 10) : ''}
              onChange={(e) =>
                setEditedContact({ ...editedContact, DOB: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Numbers</Form.Label>
            {editedContact.mobileNumbers.map((number, index) => (
              <InputGroup key={index} className="mb-2">
                <Form.Control
                  type="Number"
                  placeholder="Mobile Number"
                  value={number}
                  required
                  onChange={(e) => {
                    const updatedNumbers = [...editedContact.mobileNumbers];
                    updatedNumbers[index] = e.target.value;
                    setEditedContact({
                      ...editedContact,
                      mobileNumbers: updatedNumbers,
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
            {editedContact.emails.map((email, index) => (
              <InputGroup key={index} className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => {
                    const updatedEmails = [...editedContact.emails];
                    updatedEmails[index] = e.target.value;
                    setEditedContact({
                      ...editedContact,
                      emails: updatedEmails,
                    });
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
          <Button variant="secondary" onClick={closeEdit}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Contact
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditContact;
