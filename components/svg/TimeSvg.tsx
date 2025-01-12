import React from 'react'

type Props ={
  className: string
}

const TimeSvg = ({className}:Props) => {
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    </>
  )
}

export default TimeSvg