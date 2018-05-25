export interface Hero {
  id?: string;
  name: string;
  subtitle: string;
  content: string;
  URL: string;
}


export interface User {
  id: string;
  name?: string;
  age?: number;
  address?: {};
  email: string;
  gender: number;
  

}

export interface Food{
  name: string;
  price: number;
  category: string[];
  address: {};
  portion: number;
  grade: number;

}

