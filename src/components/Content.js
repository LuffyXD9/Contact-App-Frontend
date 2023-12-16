import React, { useEffect, useState }from 'react';
import { toast} from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import AddC from './AddC';
import ViewC from './ViewC';
import EditContact from './EditContact';
import ConfirmModal from './ConfirmModal';
import 'react-toastify/dist/ReactToastify.css';
import './content.css'
import './addstyle.css'
import './deletion.css'

const Content = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [viewModal, setViewModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteContactId, setDeleteContactId] = useState();
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

  
  const deleteContact = async (id) => {
    setDeleteContactId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setDeleteContactId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch('/allcontacts/' + deleteContactId, {
        method: 'DELETE'
      });

      setContactData((prevContactData) =>
        prevContactData.filter((contact) => contact._id !== deleteContactId)
      );

      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setDeleteModal(false);
      setDeleteContactId(null);
    }
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
      <div className="container">
        <div className="row">
          <div className="search-btn">
            <input
              className="input-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="add-btn"
              onClick={handleShowModal}
            >
             <i className="fa-solid fa-user-plus"></i>Add Contact
            </button>
            {showModal && <AddC show={showModal} handleClose={handleCloseModal} onSaveContact={handleAddEditContact}/> }
  
          </div>
         
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
          ) : (
          <div className='content-row'>
            <div className="items-item-header">
              <div className="header-name"><div>Nickname</div><div>DOB</div><div >Actions</div></div>
              
            </div>
                {filteredContacts.map((contact, index) => (
                    <div className='items-item'>
                      <div className='name'>
                        <div>
                          {contact.nickName}
                          </div>
                        {contact.DOB.slice(0, 10)}
                      </div>
                      <div className='btns'>
                        <button
                          className="ved-btn bl h"
                          onClick={() => handleViewModal(contact)}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                        
                        <button
                          className="ved-btn grn h"
                          onClick={()=>handleEditModal(contact)}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                        
                        <button
                          className="ved-btn red h"
                          onClick={() => {console.log(contact._id)
                            deleteContact(contact._id)}}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
                   
                  </div>
                ))}
              </div>
          )}
          {viewModal && <ViewC contact={specificContact} view={viewModal} closeView={handleViewClose} />}
                        {editModal && (
                        <EditContact
                          contact={editContact}
                          edit={editModal}
                          closeEdit={() => setEditModal(false)}
                          onSaveContact={handleAddEditContact}
                        />)}
                        {deleteModal && (
        <ConfirmModal
          show={deleteModal}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
        </div>
      </div>
    </>
  );
};

export default Content;
