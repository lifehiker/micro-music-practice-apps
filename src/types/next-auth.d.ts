import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      onboarded?: boolean;
      subscriptionStatus?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    onboarded?: boolean;
    subscriptionStatus?: string;
  }
}
