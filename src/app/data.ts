export interface Hero {
  id?: string;
  name: string;
  subtitle: string;
  content: string;
  URL: string;
}

export interface User {
  uid: string;
  name?: string;
  age?: number;
  address?: {};
  email: string;
  gender: number;
  history: History[];

}

export interface History {
  datetime: string;
  winner: string;
}

export interface Food {
  name: string;
  store: string;
  register: string;
  price: number;
  category: string[];
  address: {};
  portion: number;
  grade: number;
  victory: Victory[];
}

export interface Victory {
  user: string;
  datetime: string;
}


