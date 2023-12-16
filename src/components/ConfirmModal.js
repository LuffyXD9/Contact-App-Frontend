import React from 'react'
import './deletion.css'

const ConfirmModal = ({ show, onCancel, onConfirm }) => {
  return (
    <>
    <div className='modal-wrapper'></div>
    <div className={show ? 'modal show' : 'modal hide'}>
      <div className='modal-container'>
        <div className='modald-container'>
          <p>Are you sure you want to delete this contact?</p>
          <div className='modal-buttons'>
            <button className='cancel-btn' onClick={onCancel}>Cancel</button>
            <button className='delete-btn' onClick={onConfirm}>Delete</button>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default ConfirmModal