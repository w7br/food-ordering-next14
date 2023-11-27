import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";

import {firebase} from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCQ8BepZRTgUwe50TZGC8gIAeMExac0Vno",
  authDomain: "voleggio2.firebaseapp.com",
  databaseURL: "https://voleggio2-default-rtdb.firebaseio.com",
  projectId: "voleggio2",
  storageBucket: "voleggio2.appspot.com",
  messagingSenderId: "169850048518",
  appId: "1:169850048518:web:40e4f13ce5a6a755bef387",
  measurementId: "G-K7V90ZTQDM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, "uniqueAppName");
} else {
  firebase.app("uniqueAppName");
}


// Inicialize o Firebase
// const app = initializeApp(firebaseConfig);

// Agora você pode usar os serviços do Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);

export const authOptions = {
    secret: process.env.SECRET,
    adapter: FirebaseAdapter(firestore),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // const email = credentials?.email;
          // const password = credentials?.password; 
  
          // mongoose.connect(process.env.MONGO_URL);
          // const user = await User.findOne({email});
          // const passwordOk = user && bcrypt.compareSync(password, user.password);
  
          // if (passwordOk) {
          //   return user;
          // }
  
          return null
        }
      })
    ],
  };





export async function isAdmin() {
    // const session = await getServerSession(authOptions);
    // const userEmail = session?.user?.email;
    // if (!userEmail) {
    //   return false;
    // }
    // const userInfo = await UserInfo.findOne({email:userEmail});
    // if (!userInfo) {
    //   return false;
    // }
    // return userInfo.admin;
    return false;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }


// import clientPromise from "@/libs/mongoConnect";
// import {UserInfo} from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import {User} from '@/models/User';
// import NextAuth, {getServerSession, providers} from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// import { SessionProvider } from 'next-auth/react'

// import Providers from 'next-auth/providers'
// import { FirebaseAdapter } from '@next-auth/firebase-adapter'
// import firebase from 'firebase/app'
// import 'firebase/firestore';

// const firestore = firebase.firestore()

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: FirebaseAdapter(firestore),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({email});
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null
//       }
//     })
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({email:userEmail});
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }