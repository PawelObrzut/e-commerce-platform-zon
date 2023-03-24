export interface ProductInterface {
	id: number,
	title: string,
	description: string,
	imageUrl: string,
	quantity: number,
	price: string,
	category: string,
	storeId: number,
}

export interface PaginateDetailsInterface {
  limit?: number,
  page?: number,
  next?: number,
  count?: number,
}

