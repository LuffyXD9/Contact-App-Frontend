import React from 'react'
// import { Button, Modal, Form } from 'react-bootstrap';

const ViewContact = ({contact, view, closeView}) => {

  if (!contact) {
    return null;
  }
    
  return (
    <>
    <div className='modal-wrapper'></div>
    <div className={view ? 'modal show' : 'modal hide'}>
    <div className="modal-container">
    <form onSubmit={closeView} className='form'>
      <div className='title'>
        Welcome <button className="closebtn" onClick={closeView}><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div className='subtitle'>View Contact Details</div>
  
      {/* First Name */}
      <div className='input-container ic1'>
        <input
          id='firstname'
          className='input'
          type='text'
          placeholder=' '
          value={contact.firstName}
          readOnly
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
          value={contact.lastName}
          readOnly
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
          value={contact.nickName}
          readOnly
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
          value={contact.DOB ? contact.DOB.slice(0, 10) : ''}
          readOnly
        />
        <div className='cut'></div>
        <label htmlFor='DOB' className='placeholder'>
          DOB
        </label>
      </div>
      
      {contact.mobileNumbers.map((number, index) => (
          <div className='input-container ic2'>
            <div className="same-row">            
            <input
          className='input'
          type='number'
          placeholder=' '
          value={number}
          readOnly
        />
        <div className='cut'></div>
        <label htmlFor='number' className='placeholder'>
          Number
        </label>
        
        </div>
          </div>
        ))}
       

  {contact.emails.map((email, index) => (
    <div className='input-container ic2'>
    <div className="same-row">  
    <input
          className='input'
          type='text'
          placeholder=' '
          value={email}
          readOnly
        />
         <div className='cut'></div>
        <label htmlFor='emails' className='placeholder'>
          Email
        </label>
        
    </div>
    </div>
       ))}
      <button type="text" className="submit"><i class="fa-solid fa-arrow-left"></i> Back</button>

    </form>
    </div>
    </div>
    </>
  )
}

export default ViewContact