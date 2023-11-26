import { useState, createContext, useEffect } from "react";
// import firebase from "../../../../libs/firebaseConnection";
import firebase from "@/libs/firebaseConnection";

import { toast } from 'react-toastify'

export const AuthContext = createContext({});

export default function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);
    const [ loadingAuth, setLoadingAuth ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])

    // CADASTRANDO NOVO USUÁRIO
    async function signUp(email, pass, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then( async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
                criadoEm: new Date(Date.now()),
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null,
                    criadoEm: new Date(Date.now()),
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo a plataforma!', {
                    theme: "colored"
                  });
            })
        })
        .catch((error)=>{
            console.log(error);
            toast.error('Ops, algo deu errado!', {
                theme: "colored"
              });
            setLoadingAuth(false);
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    // FAZENDO LOGOUT DO USUÁRIO
    async function signout(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    // FAZENDO LOGIN DO USUÁRIO
    async function signIn(email, pass){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, pass)
        .then( async (value) => {

            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            //console.log(JSON.stringify(userProfile.data()) );

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email,
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo de volta", {
                theme: "colored"
              });
        })
        .catch((error)=> {
            console.log(error);
            toast.error("Ops, algo deu errado!", {
                theme: "colored"
              });
            setLoadingAuth(false);
        })
    }

    // BUSCA OS DADOS MAIS RECENTES DO USUÁRIO
    async function getProfileInfo(user){
        let uid = user.uid;
        const userProfile = await firebase.firestore().collection('users')
        .doc(uid).get();

        let data = {
            uid: uid,
            nome: userProfile.data().nome,
            avatarUrl: userProfile.data().avatarUrl,
            email: user.email,
        }
        setUser(data);
        storageUser(data);
        toast.success("Estes são os valores mais recentes!", {
            theme: "colored"
        });        
    }

    return(
         <AuthContext.Provider 
            value={{
                signed: !!user,
                user, loading,
                signUp,
                signout,
                signIn,
                loadingAuth,
                setUser,
                storageUser,
                getProfileInfo
            }}
        >
            { children }
         </AuthContext.Provider>
    )
}

// import clientPromise from "@/libs/mongoConnect";
// import {UserInfo} from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import {User} from '@/models/User';
// import NextAuth, {getServerSession} from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
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