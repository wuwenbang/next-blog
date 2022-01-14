import { GetServerSideProps, NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
  console.log(process.env.SECRET_COOKIE_PASSWORD);
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'user',
    cookieOptions: { secure: false },
  });
}
