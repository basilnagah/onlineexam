/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import Githubprovider from "next-auth/providers/github";
import axios from "axios";


export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Githubprovider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const options = {
            url: "https://exam.elevateegy.com/api/v1/auth/signin",
            method: "POST",
            data: {
              email: credentials?.email,
              password: credentials?.password,
            },
          };
          const res = await axios.request(options);

          if (res.data) {
            return res.data;
          } else {
            return null;
          }
        } catch (error: any) {
          if (error.response) {
            throw new Error("Invalid email or password.");
          }
        }
      },
      credentials: {
        email: {
          label: "email",
          placeholder: "please enter your email",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "please enter your password",
          type: "password",
        },
      },
    }),
  ],
};
