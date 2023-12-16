import React from 'react'
import './addstyle.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddC = ({show, handleClose, onSaveContact}) => {
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
    <>
    <div className='modal-wrapper'></div>
    <div className={show ? 'modal show' : 'modal hide'}>
      <div className="modal-container">
    <form onSubmit={handleSubmit} className='form'>
      <div className='title'>
         Add Contact
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
          value={contactData.firstName}
          required
          onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
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
          value={contactData.lastName}
          onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
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
          value={contactData.nickName}
          required
          onChange={(e) => setContactData({ ...contactData, nickName: e.target.value })}
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
          value={contactData.DOB}
          required
          max={getCurrentDate()}
          onChange={(e) => setContactData({ ...contactData, DOB: e.target.value })}
        />
      </div>
    
          {/* numbers */}
    <div className="number-box">
          <label htmlFor='Number' className='placeholder-new'>
          Number - required
        </label>
      {contactData.mobileNumbers.map((number, index) => (
            <div className="same-row">            
            <input
          className='input-new'
          type='number'
          placeholder='Number'
          value={number}
          required
          onChange={(e) => {
            const updatedNumbers = [...contactData.mobileNumbers];
            updatedNumbers[index] = e.target.value;
            setContactData({ ...contactData, mobileNumbers: updatedNumbers });
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
  {contactData.emails.map((email, index) => (
    <div className="same-row">  
    <input
          className='input-new'
          type='text'
          placeholder='Email'
          value={email}
          required
          onChange={(e) => {
            const updatedEmails = [...contactData.emails];
            updatedEmails[index] = e.target.value;
            setContactData({
              ...contactData,
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
      <button type="text" className="delete-btn">Create</button>
    <button className="cancel-btn" onClick={handleClose}>Cancel</button>
  </div>
    </form>
    </div>
  </div>
  </>
  )
}

export default AddC