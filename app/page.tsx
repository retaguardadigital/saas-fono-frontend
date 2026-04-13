'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  async function loadUsers() {
    const { data } = await supabase.from('users').select('*');
    setUsers(data || []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

async function handleSubmit(e: any) {
  e.preventDefault();

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password }]);

  if (error) {
    alert(error.message);
    return;
  }

  alert('Usuário criado!');
  setName('');
  setEmail('');
  setPassword('');
}
    loadUsers();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Deseja excluir?');
    if (!confirmDelete) return;

    await supabase.from('users').delete().eq('id', id);

    loadUsers();
  }

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: 'auto' }}>
      <h1>Usuários</h1>

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

      <hr />

      <h2>Lista</h2>

      {users.map((u) => (
        <div key={u.id}>
          <strong>{u.name}</strong> ({u.email})
          <br />
          <button onClick={() => handleDelete(u.id)}>
            Excluir
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
