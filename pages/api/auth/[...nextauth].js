import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: process.env.NEXTAUTH_EMAIL_SERVER,
            from: process.env.NEXTAUTH_EMAIL_FROM,
            maxAge: 0 * 0 * 0 * 60,
        }),
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                return true;
            } else {
                return false;
            }
        },
    },
});
