import React, { useEffect, useState }from 'react';
import { toast} from 'react-toastify';
import { Button, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import AddContact from './AddContact';
import Nav from './Nav';
import ViewContact from './ViewContact';
import EditContact from './EditContact';
import 'react-toastify/dist/ReactToastify.css';

const Content = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [specificContact, setSpecificContact] = React.useState();
  const [editContact, setEditContact] = useState();
  const[contactData, setContactData] = useState([{}])
  const[filteredContacts, setFilteredContacts] = useState([{}])
  const [loading, setLoading] = useState(true);

  const fetchContactsAndUpdateState = async () => {
    try {
      const response = await fetch('/allcontacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    }
  };

  useEffect(()=>{
    fetch('/allcontacts').then(
      response => response.json()
    ).then(
      data => setContactData(data)
    )
  },[])

  useEffect(()=>{
    const filteredContacts = contactData.filter((contact) => contact.nickName &&
    contact.nickName.toLowerCase().includes(searchText.toLowerCase())
  );
    setFilteredContacts(filteredContacts);
    setLoading(false);
  },[contactData,searchText])

  const deleteContact = async(id) => {
    // console.log(id);
    await fetch('/allcontacts/' + id,{
      method : 'DELETE'
    }).then((response)=>{
      if(!response.ok){
        throw console.error('something went wrong');
      }
      setContactData((prevContactData) =>
      prevContactData.filter((contact) => contact._id !== id)
    );
      toast.success('Contact deleted successfully');
    })
  };


  const handleShowModal = () => {
    setShowModal(true);
  };


  const handleViewModal = (contact) => {
    setSpecificContact(contact);
    setViewModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewClose = () => {
    setViewModal(false);
  };

  const handleEditModal = (contact) => {
    setEditContact(contact);
    setEditModal(true); 
  };

  const handleAddEditContact = async () => {
    try {

      await fetchContactsAndUpdateState();

    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to save contact');
    } finally {
      setEditModal(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-5 text-end">
            <input
              className="docSearch docSearch-btn mb-5 me-3 form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-primary rounded-pill"
              onClick={handleShowModal}
            >
              Add Contact
            </button>
            <AddContact show={showModal} handleClose={handleCloseModal} onSaveContact={handleAddEditContact}/>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
          ) : (
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <ListGroup>
                {filteredContacts.map((contact, index) => (
                  <div key={index}>
                    <ListGroup.Item
                      variant="dark"
                      className="d-flex justify-content-between align-items-center rounded"
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <div>
                        <strong>{contact.nickName}</strong>
                        <br />
                        DOB: {contact.DOB.slice(0, 10)}
                      </div>
                      <div>
                        <Button
                          variant="info"
                          className="rounded-circle"
                          onClick={() => handleViewModal(contact)}
                        >
                          <i className="far fa-eye"></i> View
                        </Button>
                        <ViewContact
                          contact={specificContact}
                          view={viewModal}
                          closeView={handleViewClose}
                        />
                        <Button
                          variant="warning"
                          className="rounded-circle"
                          onClick={()=>handleEditModal(contact)}
                        >
                          <i className="far fa-edit"></i> Edit
                        </Button>
                        {editModal && (
                        <EditContact
                          contact={editContact}
                          edit={editModal}
                          closeEdit={() => setEditModal(false)}
                          onSaveContact={handleAddEditContact}
                        />)}
                        <Button
                          variant="danger"
                          className="rounded-circle"
                          onClick={() => {console.log(contact._id)
                            deleteContact(contact._id)}}
                        >
                          <i className="far fa-trash-alt"></i> Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>
            </Col>
          </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
