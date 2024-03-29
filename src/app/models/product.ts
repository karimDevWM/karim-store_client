export interface Product {
  id: number
  name: string
  description: string
  price: number
  photo: string
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
  publicId: string
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[]; 
  pageNumber: number;
  pageSize: number;
}