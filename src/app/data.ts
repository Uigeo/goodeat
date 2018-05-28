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
<<<<<<< HEAD:src/app/data.ts
=======
  gender: number;
  history: History[];
>>>>>>> d6ce512af8126cf24ba0446fead6cb0bcabd0a13:src/app/data.ts


}
*/

//원래꺼
export interface User {
  uid: string;
  name: string;
  gender?: string;
  email: string;
  age?: number;
  address?: string;
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


