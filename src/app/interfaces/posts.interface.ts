export interface IPost {
  id: number | string;
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
  id: number | string;
}

export interface ICategoryRequest {
  title: string;
  way: string;
  img: string;
}


export interface ICategoryResponse extends ICategoryRequest {
  id: number | string;
}


export interface IProductRequest {
  category: ICategoryResponse;
  title: string;
  ingridients: string;
  weight: number;
  price: number;
  img: string;
  count: number;
}


export interface IProductResponse extends IProductRequest {
  id: number | string;
}
