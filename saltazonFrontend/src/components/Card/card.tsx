import React from 'react';
import { Link } from 'react-router-dom';
import { CardInterface } from '../../types';
import useSearch from '../hooks/useSearch';

const Card = ({title, img, linkTitle, to, category}: CardInterface) => {
  const { setCategory } = useSearch();

  return (
    <article className='p-5 bg-white'>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <Link onClick={() => setCategory(category)} to={to}>{React.cloneElement(img, { className: 'card-image' })}</Link>
      <Link onClick={() => setCategory(category)} to={to} className='text-sm text-blue-500 hover:text-red-500 hover:underline'>{linkTitle}</Link>
    </article>
  )
};

export default Card;
