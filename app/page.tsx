'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();

    const { error } = await supabase.from('users').insert([
      { email, name, password }
    ]);

    if (error) {
      alert('Erro: ' + error.message);
      return;
    }

    alert('Usuário criado!');
    setEmail('');
    setName('');
    setPassword('');
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Criar Usuário</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
