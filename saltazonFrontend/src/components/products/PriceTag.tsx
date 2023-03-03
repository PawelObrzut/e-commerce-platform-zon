import React from 'react'

const PriceTag = ({product}) => {
  return (
    <>
      <sup className='text-xs'>{product.price[0]}</sup>
      <span className='text-xl'>{product.price.slice(1)}</span>
    </>
  )
}

export default PriceTag