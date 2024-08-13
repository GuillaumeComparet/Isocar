import React from 'react'

type Props = {
  comment: string,
  closeModal: () => void
}

const ShowModal = ({comment, closeModal}: Props) => {

  return (
  <>
    <div onClick={closeModal} className='fixed inset-0 bg-slate-800/75'></div>
    <div>
    
        <div className='show-modal'>
          <button className='close-modal-btn' onClick={closeModal}>X</button>
          <div className='flex flex-col justify-center items-center gap-4'> 
            <h2 className='title'>Message du client :</h2>
            <p>{comment}</p>
          </div>
        </div>
      </div>
      </>
  )
}

export default ShowModal