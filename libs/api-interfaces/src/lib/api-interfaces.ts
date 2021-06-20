export interface Message {
  message: string;
}


export interface BasicUser {
  name?: string;
  email: string;
  password: string;   
}

export interface User extends BasicUser {
  userpic: string;
}

export interface RegisteringUser extends BasicUser {
  repeatPassword: string;
}

export interface Token {
  
}