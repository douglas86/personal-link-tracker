import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
    providers: [
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
