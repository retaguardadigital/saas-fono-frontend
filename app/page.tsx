'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  async function loadUsers() {
    const { data } = await supabase.from('users').select('*').order('id', { ascending: false });
    setUsers(data || []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const { error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) {
      setMessage('❌ Erro ao criar usuário');
      return;
    }

    setMessage('✅ Usuário criado com sucesso!');
    setName('');
    setEmail('');
    setPassword('');

    loadUsers();
  }

  async function handleDelete(id: number) {
    await supabase.from('users').delete().eq('id', id);
    loadUsers();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Usuários</h1>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Criar
          </button>
        </form>

        <hr className="my-6" />

        <h2 className="text-lg font-semibold mb-3">Lista</h2>

        <div className="space-y-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>

              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
