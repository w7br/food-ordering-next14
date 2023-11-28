'use client';
// import { useContext } from 'react';
// import {signIn} from "next-auth/react";
import { signIn } from 'next-auth/client'
import Image from "next/image";
import {useState} from "react";

// import firebase from "@/libs/firebaseConnection";
// import { app, auth, firestore } from "@/app/api/auth/[...nextauth]/route";

// import { useAuth } from '@/contexts/authContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  // const { signIn, loadingAuth } = useContext(AuthContext);
  // const { login } = useAuth()

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await login(email, password)
    setLoginInProgress(false);
    history.push("/")
    // setLoginInProgress(true);
    // // await signIn({email, password});
    // setLoginInProgress(false);
  }

  async function handLoginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider).then((result) => {

    })
    try {
      setError("")
      setLoading(true)
      history.push("/")
    } catch {
      setError("Algo deu errado, tente novamente");
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login 
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
               disabled={loginInProgress}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
               disabled={loginInProgress}
               onChange={ev => setPassword(ev.target.value)}/>
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google')}
                className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}