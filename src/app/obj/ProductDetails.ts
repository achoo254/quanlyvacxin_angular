import { Categories } from './Categories';
import { Product } from './Product';
import { Regimen } from './Regimen';
import { RegimenDetails } from './RegimenDetails';
export class ProductDetails {
  productDetailsId: number;
  lote: string;
  date: Date;
  quantity: number;
  productDetailsProduct : Product;
  productDetailsCategories: Categories;
  listRegimenDetails: RegimenDetails[];
}
