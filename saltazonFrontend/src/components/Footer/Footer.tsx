import React from 'react'

const Footer = () => {
  return (
    <>
      <div onClick={() => { window.scrollTo(0, 0) }} className='text-sm text-white text-center bg-gray-700 w-full p-4 cursor-pointer hover:bg-gray-600'>
        Back to top
      </div>
      <footer className='w-full bg-gray-800 text-center text-white text-xl p-32'>
        To Be Implemented soon
      </footer>
      <div className='w-full bg-gray-900 text-center text-white text-xl p-20'>

      </div>
    </>
  )
}

export default Footer