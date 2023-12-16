import React from 'react'
import './view.css'
import img from '.././dr5qp.jpg'
const ViewC = ({contact, view, closeView}) => {

  if (!contact) {
    return null;
  }
    
  return (
    <>
    <div className='modal-wrapper'></div>
    <div className={view ? 'modal show' : 'modal hide'}>
        <div className="modal-container">
    <div class="card-container">
	<button class="pro" onClick={closeView}><i className="fa-solid fa-arrow-left"/></button>
	<img class="round" src={img} alt="user" />
	<h3>{contact.firstName + ' ' + contact.lastName}</h3>
	<h6>{contact.nickName}</h6>
	<p>{contact.DOB ? contact.DOB.slice(0, 10) : ''}</p>
	<div class="skills">
		<h6>Numbers</h6>
		{contact.mobileNumbers.map((number, index) => (
          <div className='input-container ic2'>
            <div className="same-row">            
            <input
          className='input-d'
          type='number'
          placeholder=' '
          value={number}
          readOnly
        />
        </div>
          </div>
        ))}
	</div>
  <div className="skill">
    <div class="skills-e">
		<h6>Emails</h6>
		{contact.emails.map((email, index) => (
    <div className='input-container ic2'>
    <div className="same-row">  
    <input
          className='input-d'
          type='text'
          placeholder=' '
          value={email}
          readOnly
        />
    </div>
    </div>
       ))}
	</div>
  </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default ViewC