import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD as string,
    password: '42b44658-0a4c-4c87-9534-d4b229426fd1',
    cookieName: 'user',
    cookieOptions: {secure: false}
  });
}
