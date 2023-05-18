export interface Session {
  session: SessionClass;
}

export interface SessionClass {
  data: Data;
  status: string;
}

export interface Data {
  user: User;
  expires: string;
}

export interface User {
  name: string;
  email: string;
  image: string;
  createdAt: null;
  updatedAt: null;
  id: number;
  username: string;
  role: string;
  bio: string;
  followers: null;
  categories: any[];
  contentCreator: boolean;
  new: boolean;
  accessToken: string;
  tokenType: string;
  iat: number;
  exp: number;
  jti: string;
}
