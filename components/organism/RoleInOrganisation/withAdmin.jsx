export const withAdmin = (router, role, session) => router === role && session;
