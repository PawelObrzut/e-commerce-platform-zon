import React from 'react';
import { ProductInterface } from '../../types';

interface PriceTagInterface {
  product: ProductInterface
}

const PriceLabel = ({product}: PriceTagInterface) => {
  return (
    <>
      <sup className='text-xs'>{product.price[0]}</sup>
      <span className='text-xl'>{product.price.slice(1)}</span>
    </>
  )
}

export default PriceLabel;
