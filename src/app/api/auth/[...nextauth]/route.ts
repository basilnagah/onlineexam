/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import Githubprovider from "next-auth/providers/github";
import axios from "axios";
import { options } from "@/lib/optionsAuth";



const handler = NextAuth(options);

export { handler as GET, handler as POST };
