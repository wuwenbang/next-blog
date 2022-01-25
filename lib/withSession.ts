import { withIronSession } from 'next-iron-session';

export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'user',
    cookieOptions: { secure: false },
  });
}
