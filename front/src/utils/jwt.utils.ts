import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  username: string;
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
