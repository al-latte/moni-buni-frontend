export interface User {
    _id: string;
    email: string;
    fullname: string;
    token?: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }