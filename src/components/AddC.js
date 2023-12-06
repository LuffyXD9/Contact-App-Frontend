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
        Welcome <button className="closebtn" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div className='subtitle'>Add Contact Details</div>
  
      {/* First Name */}
      <div className='input-container ic1'>
        <input
          id='firstname'
          className='input'
          type='text'
          placeholder=' '
          value={contactData.firstName}
          required
          onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
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
          value={contactData.lastName}
          onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
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
          value={contactData.nickName}
          required
          onChange={(e) => setContactData({ ...contactData, nickName: e.target.value })}
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
          value={contactData.DOB}
          required
          max={getCurrentDate()}
          onChange={(e) => setContactData({ ...contactData, DOB: e.target.value })}
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
      
      {contactData.mobileNumbers.map((number, index) => (
          <div className='input-container ic2'>
            <div className="same-row">            
            <input
          className='input'
          type='number'
          placeholder=' '
          value={number}
          required
          onChange={(e) => {
            const updatedNumbers = [...contactData.mobileNumbers];
            updatedNumbers[index] = e.target.value;
            setContactData({ ...contactData, mobileNumbers: updatedNumbers });
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

  {contactData.emails.map((email, index) => (
    <div className='input-container ic2'>
    <div className="same-row">  
    <input
          className='input'
          type='text'
          placeholder=' '
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
  )
}

export default AddC