import CguButton from '@/components/cgu/CguButton'
import React from 'react'

const CguCheckBox = () => {
  return (
    <div className="flex items-center justify-center my-4 w-4/5">
      <input
        id="cgu"
        name="cgu"
        type="checkbox"
        className="mr-2"
        required
      />
      <label className='flex' htmlFor="cgu">J'accepte les <span><CguButton /></span></label>
    </div>
  )
}

export default CguCheckBox