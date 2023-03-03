import React from 'react';
import { Link } from 'react-router-dom';
import { ProductInterface } from '../../types';
import PriceTag from './PriceTag';

function Product(product: ProductInterface) {
	return (
		<>
			<article className='border border-gray-200 rounded-sm shadow group'>
				<Link to={`${product.id}`}>
					<img src={product.imageUrl} alt={'picture of product'} className='w-full h-40 px-2 object-cover relative top-0 group-hover:-top-2 duration-300 ease-in-out' />
				</Link>
				<section className='px-2 pb-5'>
					<Link to={`${product.id}`} className='hover:text-orange-400'>
						<h2 className='text-lg font-semibold'>
							{product.title}
						</h2>
					</Link>
					<p className='text-gray-500'>
						No reviews
					</p>
					<p>
						<Link to={`${product.id}`} >
							<PriceTag product={product}/>
						</Link>
					</p>
				</section>
			</article>
		</>
	);
}

export default Product;
