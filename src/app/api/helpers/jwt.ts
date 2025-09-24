import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET!;

export function generateToken(userId: string, email: string): string {
  const token = jwt.sign({ id: userId, email }, SECRET_KEY, {
    expiresIn: '30m',
  });

  return token;
}

// method to verify token
// to get user data, use:
// const result = verifyToken(token);
// if (result.valid)
// console.log("ID:", result.decoded.id);
// console.log("Email:", result.decoded.email);
// else
// console.log("Token inválido");
export function verifyToken(token: string, request?: NextRequest) {
  try {
    let tokenToVerify = token;

    if (!token && request) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, decoded: null };
      }
      tokenToVerify = authHeader.split(' ')[1];
    }

    const decoded = jwt.verify(tokenToVerify, SECRET_KEY) as {
      id: string;
      email: string;
      iat: number;
      exp: number;
    };

    return { valid: true, decoded };
  } catch (err) {
    void err;
    return { valid: false, decoded: null };
  }
}
