"use client";
import {useState, useContext} from "react";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { AuthContext } from '@/contexts/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    
    // setCreatingUser(true);
    // setError(false);
    // setUserCreated(false);
    
    // signUp(email, password, nome);

    // if (response.ok) {
    //   setUserCreated(true);
    // }
    // else {
    //   setError(true);
    // }
    // setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Registre-se
      </h1>
      {!loadingAuth && (
        <div className="my-4 text-center">
          Usuário criado com sucesso.<br />
          Agora acesse{' '}
          <Link className="underline" href={'/login'}>Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          Ocorreu um erro.<br />
          Por favor tente novamente
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="email" value={email}
               disabled={creatingUser}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="password" value={password}
               disabled={creatingUser}
                onChange={ev => setPassword(ev.target.value)}/>
        <button type="submit" disabled={creatingUser}>
          Registre-se
        </button>
        <div className="my-4 text-center text-gray-500">
          ou com o provedor
        </div>
        <button
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Entrar com Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '}
          <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div>
      </form>
    </section>
  );
}