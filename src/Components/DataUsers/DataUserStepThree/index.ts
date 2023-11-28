export interface UserSession {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  userData: string;
}
