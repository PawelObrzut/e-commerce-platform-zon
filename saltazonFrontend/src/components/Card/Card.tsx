import React from 'react';
import { Link } from 'react-router-dom';
import { CardInterface } from '../../types';

const Card = ({title, img, linkTitle, to}: CardInterface) => {
  return (
    <article className='p-5 bg-white'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <Link to={to}>{React.cloneElement(img, { className: 'card-image' })}</Link>
      <Link to={to} className='text-sm text-blue-500 hover:text-red-500 hover:underline'>{linkTitle}</Link>
    </article>
  )
};

export default Card;
