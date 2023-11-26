'use client'
import { useState, createContext, useEffect } from "react";
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