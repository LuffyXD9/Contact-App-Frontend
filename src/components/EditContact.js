import React, { useState, useEffect } from 'react';
import './addstyle.css'
// import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditContact = ({ contact ,edit,closeEdit,onSaveContact}) => {
  const [editedContact, setEditedContact] = useState({...contact});

  useEffect(()=>{
    setEditedContact(contact);
  },[contact]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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

  const validateNumber = (number) => {
    return /^\d{10}$/.test(number);
  }

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEdit = async(e) => {
    e.preventDefault();

    if (!editedContact.mobileNumbers.every(validateNumber)) {
      toast.error('Invalid mobile number format');
      return;
    }

    if (!editedContact.emails.every(validateEmail)) {
      toast.error('Invalid email address format');
      return;
    }

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
    <>
    <div className='modal-wrapper'></div>
    <div className={edit ? 'modal show' : 'modal hide'}>
      <div className="modal-container">
    <form onSubmit={handleEdit} className='form'>
      <div className='title'>
        Welcome <button className="closebtn" onClick={closeEdit}><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div className='subtitle'>Edit Contact Details</div>
  
      {/* First Name */}
      <div className='input-container ic1'>
        <input
          id='firstname'
          className='input'
          type='text'
          placeholder=' '
          value={editedContact.firstName}
          required
          onChange={(e) => setEditedContact({ ...editedContact, firstName: e.target.value })}
        />
        <div className='cut'></div>
        <label htmlFor='firstname' className='placeholder'>
          First name
        </label>
      </div>
  
      {/* Last Name */}
      <div className='input-container ic2'>
        <input
          id='lastname'
          className='input'
          type='text'
          placeholder=' '
          value={editedContact.lastName}
          onChange={(e) => setEditedContact({ ...editedContact, lastName: e.target.value })}
        />
        <div className='cut'></div>
        <label htmlFor='lastname' className='placeholder'>
          Last name
        </label>
      </div>
  
      {/* Nick Name */}
      <div className='input-container ic2'>
        <input
          id='nickname'
          className='input'
          type='text'
          placeholder=' '
          value={editedContact.nickName}
          required
          onChange={(e) => setEditedContact({ ...editedContact, nickName: e.target.value })}
        />
        <div className='cut'></div>
        <label htmlFor='nickname' className='placeholder'>
          Nick name
        </label>
      </div>
  
      {/* DOB */}
      <div className='input-container ic2'>
        <input
          id='DOB'
          className='input'
          type='date'
          placeholder=' '
          value={editedContact.DOB ? editedContact.DOB.slice(0, 10) : ''}
          required
          max={getCurrentDate()}
          onChange={(e) => setEditedContact({ ...editedContact, DOB: e.target.value })}
        />
        <div className='cut'></div>
        <label htmlFor='DOB' className='placeholder'>
          DOB
        </label>
      </div>
  
      {/* phone number */}
      {/* <div className='input-container ic2'>
            <div className="same-row">
            <input
          className='input'
          type='number'
          placeholder=' '
          value={contactData.mobileNumbers[0]}
          required
          onChange={(e) => {
            const updatedNumbers = [...contactData.mobileNumbers];
            updatedNumbers[0] = e.target.value;
            setContactData({ ...contactData, mobileNumbers: updatedNumbers });
          }}
        />
        <div className='cut'></div>
        <label htmlFor='Number' className='placeholder'>
          Number
        </label>
        <button type='button' className='add-button' onClick={handleAddPhoneNumber}>
        +
      </button>
        </div>
          </div> */}


          {/* numbers */}
      
      {editedContact.mobileNumbers.map((number, index) => (
          <div className='input-container ic2'>
            <div className="same-row">            
            <input
          className='input'
          type='number'
          placeholder=' '
          value={number}
          required
          onChange={(e) => {
            const updatedNumbers = [...editedContact.mobileNumbers];
            updatedNumbers[index] = e.target.value;
            setEditedContact({ ...editedContact, mobileNumbers: updatedNumbers });
          }}
        />
        <div className='cut'></div>
        <label htmlFor='number' className='placeholder'>
          Number
        </label>
        <button
          type='button'
          className='remove-button'
          onClick={() => handleRemovePhoneNumber(index)}
          disabled={index === 0}
        >
          -
        </button>
        </div>
          </div>
        ))}
        <button type='button' className='add-button' onClick={handleAddPhoneNumber}>
        <i class="fa-solid fa-plus"></i>
      </button>

  {editedContact.emails.map((email, index) => (
    <div className='input-container ic2'>
    <div className="same-row">  
    <input
          className='input'
          type='text'
          placeholder=' '
          value={email}
          required
          onChange={(e) => {
            const updatedEmails = [...editedContact.emails];
            updatedEmails[index] = e.target.value;
            setEditedContact({
              ...editedContact,
              emails: updatedEmails
            });
          }}
        />
         <div className='cut'></div>
        <label htmlFor='emails' className='placeholder'>
          Email
        </label>
        <button
          type='button'
          className='remove-button'
          onClick={() => handleRemoveEmails(index)}
          disabled={index === 0}
        >
          -
        </button>
    </div>
    </div>
       ))}
     <button type='button' className='add-button' onClick={handleAddEmails}>
     <i className="fa-solid fa-plus"></i>
  </button>
      <button type="text" className="submit">submit</button>

    </form>
    </div>
  </div>
  </>
  );
};

export default EditContact;
