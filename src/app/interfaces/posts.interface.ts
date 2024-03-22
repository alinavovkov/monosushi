export interface IPost {
  id: number;
  date: Date;
  title: string;
  headline: string;
  text: string;
  img: string;
}

export interface IPostRequest {
  date: Date;
  title: string;
  headline: string;
  text: string;
  img: string;
}


export interface IPostResponse extends IPostRequest {
  id: number;
}

export interface ICategory {
  id: number;
  title: string;
  way: string;
  img: string;
}

export interface ICategoryRequest {
  title: string;
  way: string;
  img: string;
}


export interface ICategoryResponse extends ICategoryRequest {
  id: number;
}

export interface IProduct {
  id: number;
  category: string;
  title: string;
  ingridients: string;
  weight: number;
  price: number;
  img: string;
}

export interface IProductRequest {
  category: string;
  title: string;
  ingridients: string;
  weight: number;
  price: number;
  img: string;
}


export interface IProductResponse extends IProductRequest {
  id: number;
}