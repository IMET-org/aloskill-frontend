/* eslint-disable no-console */

import { config as envConfig } from "@/config/env";
import { authService } from "@/lib/api/auth.service.ts";
import { jwtDecode } from "jwt-decode";
import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
      status: UserStatus;
      isEmailVerified: boolean;
      profilePicture?: string | null;
      name?: string | null;
      image?: string | null;
      provider: string;
    };
    accessToken: string | null;
    accessTokenExpires?: number | undefined;
    error?: string | null;
  }
  interface User {
    email: string;
    role: string;
    profilePicture?: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Profile {
    given_name: string;
    family_name: string;
    picture: string;
  }
}

// Type definitions
export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
}

type RefreshResponseType = ReturnType<typeof authService.refreshToken>;
type RefreshResolvedType = Awaited<RefreshResponseType>;

// semantic: serialize refresh requests per token
const refreshCache = new Map<string, {
  promise: RefreshResponseType;
  timestamp: number;
  result?: RefreshResolvedType;
}>();
const REFRESH_CACHE_TTL_MS = 3000;

const getRefreshedTokens = async (refreshToken: string): Promise<RefreshResolvedType> => {
  const now = Date.now();
  const existing = refreshCache.get(refreshToken);

  if (existing) {
    if (existing.result && now - existing.timestamp < REFRESH_CACHE_TTL_MS) {
      return existing.result;
    }

    return existing.promise;
  }

  const promise = authService.refreshToken(refreshToken);
  refreshCache.set(refreshToken, { promise, timestamp: now });

  try {
    const result = await promise;
    refreshCache.set(refreshToken, {
      promise: Promise.resolve(result),
      timestamp: Date.now(),
      result,
    });

    return result;
  } catch (error) {
    refreshCache.delete(refreshToken);
    throw error;
  } finally {
    setTimeout(() => {
      const entry = refreshCache.get(refreshToken);
      if (entry && Date.now() - entry.timestamp >= REFRESH_CACHE_TTL_MS) {
        refreshCache.delete(refreshToken);
      }
    }, REFRESH_CACHE_TTL_MS);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        console.log("Credials Request : ", req);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const { email, password } = credentials;

        const apiRes = await authService.login({ email, password });

        if (!apiRes.success) {
          throw new Error(apiRes.message);
        }

        const user = apiRes.data;

        if (!user) {
          throw new Error(apiRes.message || "Authentication failed");
        }

        try {
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            profilePicture: user.profilePicture as string,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication failed");
          }
          throw new Error("Authentication failed");
        }
      },
    }),

    GoogleProvider({
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 15 * 60,
  },

  jwt: {
    maxAge: 15 * 60,
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(
        `signIn callback called for ${user.email}, account: ${JSON.stringify(account)}, profile: ${JSON.stringify(profile)}`
      );
      if (account?.provider !== "google") return true;

      try {
        const userFromDB = await authService.login({
          email: user.email,
          googleId: profile?.sub as string,
        });

        let result;
        if (!userFromDB.success) {
          console.log(`User ${user.email} not found, creating new user...`);

          const registerResponse = await authService.register({
            firstName: profile?.given_name || profile?.given_name || "",
            lastName: profile?.family_name || profile?.family_name || "",
            email: user.email,
            googleId: profile?.sub || account.providerAccountId || "",
            profilePicture: user?.image ?? null,
          });

          if (!registerResponse.success) {
            result = {
              success: false,
              message: `Registration failed for ${user.email}`,
              data: null,
            };
            return "/auth/error?error=AutoRegisterFailed";
          }

          result = registerResponse.data;
        } else {
          result = userFromDB.data;
        }

        if (result) {
          user.id = result.id;
          user.email = result.email;
          user.role = result.role;
          user.name = `${result.firstName} ${result.lastName}`;
          user.profilePicture = result.profilePicture ?? "";
          user.accessToken = result.accessToken;
          user.refreshToken = result.refreshToken;

          return true;
        }

        console.error(`Backend login/register failed for ${user.email}`);
        return "/auth/error?error=GoogleAuthFailed";
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return "/auth/error?error=VerificationFailed";
      }
    },

    async jwt({ token, user, account }) {
      if (token["accessToken"]) {
        const decodedToken = jwtDecode(token["accessToken"] as string);
        if (decodedToken.exp) {
          token["accessTokenExpires"] = decodedToken.exp * 1000;
        } else {
          token["accessTokenExpires"] = Date.now() + 15 * 60 * 1000;
        }
      }
      if (account && user) {
        token["id"] = user.id;
        token["accessToken"] = user.accessToken;
        token["refreshToken"] = user.refreshToken;

        if (user) {
          token["name"] = user.name as string;
          token["email"] = user.email as string;
          token["role"] = user.role;
          token["profilePicture"] = user.profilePicture;
        }
      }

      // Check if access token needs refresh (with 1-minute buffer)
      const shouldRefresh =
        token["accessTokenExpires"] && Date.now() > Number(token["accessTokenExpires"]) - 60 * 1000;

      if (shouldRefresh) {
        try {
          console.log("Attempting to refresh access token with : ", {
            time: new Date().toLocaleTimeString(),
            token: token["refreshToken"],
          });
          const refreshTokenValue = token["refreshToken"] as string;
          const refreshResponse = await getRefreshedTokens(refreshTokenValue);

          console.log("Refreshed successfully at: ", {
            time: new Date().toLocaleTimeString(),
            data: refreshResponse.data,
          });

          if (refreshResponse.success) {
            token["accessToken"] = refreshResponse.data?.accessToken;
            token["refreshToken"] = refreshResponse.data?.refreshToken;

            const decodedNewToken = jwtDecode(token["accessToken"] as string);
            if (decodedNewToken.exp) {
              token["accessTokenExpires"] = decodedNewToken.exp * 1000;
            } else {
              token["accessTokenExpires"] = Date.now() + 15 * 60 * 1000;
            }
          } else {
            token["error"] = "RefreshAccessTokenError";
            return {
              ...token,
              error: "RefreshAccessTokenError",
              accessToken: null,
            };
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
          token["error"] = "RefreshAccessTokenError";
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session token refreshed successfully token : ", token["refreshToken"]);
      if (token) {
        session.user.id = token["id"] as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token["role"] as UserRole;
        session.user.profilePicture =
          typeof token["profilePicture"] === "string" ? token["profilePicture"] : null;
        session.accessToken = token["accessToken"] as string;
        if (token["error"]) {
          session.error = (token["error"] as string) || null;
        }
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  events: {
    async signIn({ user, account }) {
      console.log(`✅ User ${user.email} signed in via ${account?.provider}`);
    },

    async signOut({ token }) {
      console.log("signOut method triggered", token);
    },
  },
  secret: envConfig.NEXTAUTH_SECRET,

  // debug: envConfig.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
