import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';

export async function getUserIdByToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token is missing or invalid format');
    }

    const token = authHeader.split(' ')[1];

    const data = verifyToken(token);

    if (!data.valid || !data.decoded) {
      throw new Error('Token is invalid or expired');
    }

    return data.decoded.id;
  } catch (err) {
    throw new Error(`Error extracting user ID from token: ${err}`);
  }
}
