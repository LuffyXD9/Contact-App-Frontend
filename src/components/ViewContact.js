import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap';

const ViewContact = ({contact, view, closeView}) => {

  if (!contact) {
    return null;
  }
    
  return (
    <Modal show={view} onHide={closeView}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" readOnly value={contact.firstName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" readOnly value={contact.lastName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nickname:</Form.Label>
            <Form.Control type="text" readOnly value={contact.nickName} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control type="date" readOnly value={contact.DOB.slice(0, 10)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mobile Numbers:</Form.Label>
            {contact.mobileNumbers.map((number, index)=>(
              <Form.Control type="number" key={index} readOnly value={number} />
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Emails:</Form.Label>
            {contact.emails.map((email, index)=>(
              <Form.Control type="text" key={index} readOnly value={email} />
            ))}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeView}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewContact