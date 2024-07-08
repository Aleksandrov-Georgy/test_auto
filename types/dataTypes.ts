export interface FilterTypes {
  result: number;
  brands: Brands;
  models: Models;
  tarif: Tarif;
}
interface Tarif {
  name: string;
  type: string;
  values: Values;
}
interface Values {
  "13": string;
  "14": string;
  "22": string;
  "26": string;
}
interface Models {
  name: string;
  type: string;
  values: Value[];
}
interface Value {
  brand: string;
  models: string[];
}
interface Brands {
  name: string;
  code: string;
  values: string[];
}

export interface AllCarsProps {
  result: number;
  page: number;
  pages: number;
  per_page: number;
  list: Car[];
}
export interface Car {
  id: number;
  brand: string;
  model: string;
  number: string;
  price: number;
  image?: string | undefined;
  tarif: string[];
}

export interface CarById {
  result: number;
  item: CarId;
}

export interface CarId {
  brand: string;
  model: string;
  id: number;
  price?: number;
  images?: Image[];
  tarif: string[];
}
export interface Image {
  id: string;
  image: string;
}
