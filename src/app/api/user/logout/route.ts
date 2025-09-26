import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout realizado' });

  // Limpa o cookie do token
  response.headers.set(
    'Set-Cookie',
    'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure'
  );

  return response;
}
