'use client';

import { AuthService } from '@/services/rest.service';
import type { LoginResponse } from '@/types/api/auth.types';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function LoginForm() {
  const router = useRouter();
  const { setLoading } = useLoading();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || username.length > 20) {
      setError('El nombre de usuario debe tener entre 3 y 20 caracteres.');
      return;
    }
    if (password.length < 4 || password.length > 50) {
      setError('La contraseña debe tener entre 4 y 50 caracteres.');
      return;
    }

    setLoading(true);
    try {
      const response: LoginResponse = await AuthService.login(username, password);
      const token = response.data.access_token;

      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Lax`;

      router.replace('/home');
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Nombre de usuario</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={20}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
            maxLength={50}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Icon
              icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
              width="22"
              height="22"
              className='cursor-pointer'
            />
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        Ingresar
      </button>
    </form>
  );
}
