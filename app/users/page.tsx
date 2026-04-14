'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);

  async function loadUsers() {
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: false });

    setUsers(data || []);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (editingUser) {
      const { error } = await supabase
        .from('users')
        .update({ name, email, password })
        .eq('id', editingUser.id);

      if (error) {
        setMessage('❌ Erro ao atualizar');
        return;
      }

      setMessage('✅ Usuário atualizado!');
      setEditingUser(null);
    } else {
      const { error } = await supabase
        .from('users')
        .insert([{ name, email, password }]);

      if (error) {
        setMessage('❌ Erro ao criar usuário');
        return;
      }

      setMessage('✅ Usuário criado!');
    }

    setName('');
    setEmail('');
    setPassword('');
    loadUsers();
  }

  function handleEdit(user: any) {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setMessage('');
  }

  async function handleDelete(id: number) {
    await supabase.from('users').delete().eq('id', id);
    loadUsers();
  }

  function cancelEdit() {
    setEditingUser(null);
    setName('');
    setEmail('');
    setPassword('');
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
            className={`w-full py-2 rounded-lg text-white transition ${
              editingUser
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingUser ? 'Atualizar' : 'Criar'}
          </button>

          {editingUser && (
            <button
              type="button"
              onClick={cancelEdit}
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              Cancelar edição
            </button>
          )}
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

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
