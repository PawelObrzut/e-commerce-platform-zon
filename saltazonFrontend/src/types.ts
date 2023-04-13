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

export interface CardInterface {
	title: string,
	img: React.ReactElement,
	linkTitle: string,
	to?: string,
}

export interface CartItem {
  id: number,
  imageUrl: string,
  title: string,
  price: string,
  stock: number,
  quantity: number,
}

export interface UserInterface {
  id: number,
  emailAddress: string,
  role: string,
  storeId?: number,
	accessToken: string,
}

export interface ProductPageInterface {
  responseData: ProductInterface,
}