'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  async function loadUsers() {
    const res = await fetch('http://161.97.147.252:3001/users');
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch('http://161.97.147.252:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    if (!res.ok) {
      alert('Erro ao criar');
      return;
    }

    setName('');
    setEmail('');
    setPassword('');

    loadUsers();
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Deseja excluir?');

    if (!confirmDelete) return;

    await fetch(`http://161.97.147.252:3001/users/${id}`, {
      method: 'DELETE',
    });

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
        <div key={u.id} style={{ marginBottom: 10 }}>
          <strong>{u.name}</strong> ({u.email})
          <br />
          <button onClick={() => handleDelete(u.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}
