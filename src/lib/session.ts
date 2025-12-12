
import type { IronSessionOptions } from 'iron-session';

export type SessionData = {
  isAdmin: boolean;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'cryptoseed-admin-session',
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
  },
};
