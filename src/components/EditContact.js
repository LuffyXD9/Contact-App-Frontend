import React, { useState, useEffect } from 'react';
import './addstyle.css'
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
        Edit Contact
      </div>

      <div className="content-col">
  
      {/* First Name */}
      <div className='input-container-new'>
      <label htmlFor='firstname' className='placeholder-new'>
          First name - required
        </label>
        <input
          id='firstname'
          className='input-new'
          type='text'
          placeholder='First name'
          value={editedContact.firstName}
          required
          onChange={(e) => setEditedContact({ ...editedContact, firstName: e.target.value })}
        />
      </div>
  
      {/* Last Name */}
      <div className='input-container-new'>
      <label htmlFor='lastname' className='placeholder-new'>
          Last name
        </label>
        <input
          id='lastname'
          className='input-new'
          type='text'
          placeholder='Last name'
          value={editedContact.lastName}
          onChange={(e) => setEditedContact({ ...editedContact, lastName: e.target.value })}
        />
      </div>
  
      {/* Nick Name */}
      <div className='input-container-new'>
      <label htmlFor='nickname' className='placeholder-new'>
          Nick name - required
        </label>
        <input
          id='nickname'
          className='input-new'
          type='text'
          placeholder='Nick name'
          value={editedContact.nickName}
          required
          onChange={(e) => setEditedContact({ ...editedContact, nickName: e.target.value })}
        />
      </div>
  
      {/* DOB */}
      <div className='input-container-new'>
      <label htmlFor='DOB' className='placeholder-new'>
          DOB - required
        </label>
        <input
          id='DOB'
          className='input-new'
          type='date'
          placeholder='Date of Birth'
          value={editedContact.DOB ? editedContact.DOB.slice(0, 10) : ''}
          required
          max={getCurrentDate()}
          onChange={(e) => setEditedContact({ ...editedContact, DOB: e.target.value })}
        />
      </div>

        {/* numbers */}
        <div className="number-box">
          <label htmlFor='Number' className='placeholder-new'>
          Number - required
        </label>
      {editedContact.mobileNumbers.map((number, index) => (
            <div className="same-row">            
            <input
          className='input-new'
          type='number'
          placeholder='Number'
          value={number}
          required
          onChange={(e) => {
            const updatedNumbers = [...editedContact.mobileNumbers];
            updatedNumbers[index] = e.target.value;
            setEditedContact({ ...editedContact, mobileNumbers: updatedNumbers });
          }}
        />
        <button
          type='button'
          className='cancel-btn'
          onClick={() => handleRemovePhoneNumber(index)}
          disabled={index === 0}
        >
          Remove
        </button>
        </div>
        ))}
        <button type='button' className='cancel-btn' onClick={handleAddPhoneNumber}>
        Add
      </button>
      </div>

    <div className="number-box">
      <label htmlFor='emails' className='placeholder-new'>
          Email - required
        </label>

  {editedContact.emails.map((email, index) => (
    <div className="same-row">  
    <input
          className='input-new'
          type='text'
          placeholder='Email'
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
        <button
          type='button'
          className='cancel-btn'
          onClick={() => handleRemoveEmails(index)}
          disabled={index === 0}
        >
          Remove
        </button>
    </div>
       ))}
     <button type='button' className='cancel-btn' onClick={handleAddEmails}>
     Add
  </button>
  </div>
  </div>
  <div className="cancel-add-btns">
      <button type="text" className="delete-btn">save</button>
    <button className="cancel-btn" onClick={closeEdit}>Cancel</button>
  </div>

    </form>
    </div>
  </div>
  </>
  )
}

export default EditContact;
