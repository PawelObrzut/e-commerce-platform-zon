import React from 'react';
import { Link } from 'react-router-dom';

export interface ProductInterface {
	id: number,
	title: string,
	description: string,
	imageUrl: string,
	quantity: number,
	price: string,
	category: string,
	storeId: 5,
}

function Product(product: ProductInterface, addToCart: (id: number) => void) {
	return (
		<>
				<article className='border border-gray-200 rounded-sm shadow'>
					<Link to={`${product.id}`}>
						<img src={product.imageUrl} alt={'picture of product'} className='w-full h-2/4 object-cover' />
					</Link>
					<section className='p-2'>

						<h1 className='text-xl font-semibold'>
						<Link to={`${product.id}`} className='hover:text-orange-400'>
							{product.title}, {product.description}
						</Link>
						</h1>
						<p>
							{ product.quantity > 0 ? 'InStock' : 'Sign me on a wish list'}
						</p>
						<p>
							<sup className='text-xs'>{ product.price[0] }</sup><span className='text-xl'>{product.price.slice(1)}</span>
						</p>
					</section>

				</article>
		</>
	);
}

export default Product;
