

import Result from "@/types/ApiResultType";
import DecodedLoginApiTokenResult from "@/types/LoginResponseType/DecodedLoginApiTokenResult";
import LoginResponseType from "@/types/LoginResponseType/LoginResponseType";
import jwt from 'jsonwebtoken';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: string;
  token: string;
  refreshToken: string;
  phoneNumber:string
}

const handler = NextAuth({
  secret: process.env.SECRET_KEY,
  session: {
    strategy: 'jwt',
    maxAge: 187200,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
 
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
          const apiDomen = process.env.apiDomen;
       console.error(apiDomen)
          const res = await fetch(`${apiDomen}api/Auth/Login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          let errors = "<ul>";
      if (res.status==401) {
        errors += `<li>UnAuthorized</li>`;
      }
          if (res.ok) {

            const result: Result<LoginResponseType> = await res.json();
          
            const userData: DecodedLoginApiTokenResult = jwt.decode(result.response.accessToken) as DecodedLoginApiTokenResult;

           
            return {
              id: userData.Id ,         
              phoneNumber:userData.PhoneNumber,
              email: userData.Email, 
              username: userData.UserName , 
              firstName: userData.FirstName , 
              lastName: userData.LastName , 
              role: userData.Roles ,
              token: result.response.accessToken,
              refreshToken: result.response.refreshToken,
            } as User;
          } else if (res.status!==401){
            const result:Result<null>=await res.json();
           
           
              if (Array.isArray(result.messages)) {
              
                  result.messages.forEach((message:string)=> {
                      errors += `<li>${message}</li>`;
                  });
              } else if (result.message) {
               
                  errors += `<li>${result.message}</li>`;
              }
              errors += "</ul>";
         
            throw new Error(`${errors}`);
          }
          throw new Error(`${errors}`);
      }
      
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
     
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Merge token data into session object
 

  session.user = {
    id: token.id as string, 
    email: token.email as string , 
    username: token.username as string , 
    firstName: token.firstName as string , 
    lastName: token.lastName as string , 
    role: token.role as string , 
    token: token.token as string , 
    refreshToken: token.refreshToken as string ,
  };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
