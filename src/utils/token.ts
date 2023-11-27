import jwt, { Secret } from 'jsonwebtoken';
import { FormValues } from '../Components/Auth/RegistrationForm';

interface TokenPayload {
  user: FormValues;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as Secret, {
    expiresIn: '1d',
  });
};

export const veryfyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.TOKEN_SECRET as Secret) as TokenPayload;
};
