import React from 'react'

const SuccessScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-stone-50 bg-opacity-20 h-screen'>
      <h2 className='text-4xl text-green-600 font-bold mb-4'>Payment Successfull!</h2>
      <p className='text-lg text-gray-600'>Thank you for your purchase</p>
    </div>
  )
}

export default SuccessScreen
