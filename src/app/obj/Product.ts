import { OrderDetails } from './OrderDetails';
import { RegimenDetails } from './RegimenDetails';
import { ProductDetails } from './ProductDetails';
export class Product {
  productId: number;
  images: string;
  buy: number;
  country: string;
  details: string;
  name: string;
  sell: number;
  listProductDetails: ProductDetails[];
}
