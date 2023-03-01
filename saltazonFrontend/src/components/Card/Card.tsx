import React from 'react'

interface CardInterface {
  title: string,
  img: React.ReactElement,
  linkTitle: string
}

const Card = ({title, img, linkTitle}: CardInterface) => {
  return (
    <article className='p-5 bg-white'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      {React.cloneElement(img, { className: 'card-image' })}
      <a href="#" className='text-sm text-blue-500 hover:text-red-500 hover:underline'>{linkTitle}</a>
    </article>
  )
}

export default Card