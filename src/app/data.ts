export interface Hero {
  id?: string;
  name: string;
  subtitle: string;
  content: string;
  URL: string;
}

/*새로만든것
export interface User {
  id: string;
  name?: string;
  age?: number;
  address?: {};
  email: string;
  gender: number;
  history: History[];


}
*/


export interface User {
  uid: string;
  name: string;
  gender?: string;
  email: string;
  age?: number;
  zip?: string;
  addr?: string;
  addrEng?: string;
  birth?: string;

  
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
  address?: any;
  portion: number;
  grade?: number;
  imgURL?: string;
  victory?: Victory[];
}

export interface Victory {
  user: string;
  datetime: number;
}


