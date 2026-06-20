import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiClient } from '../infrastructure/http/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true); // cek token saat mount

  // Fetch profil user pakai token yang ada
  const fetchMe = useCallback(async (t) => {
    try {
      const data = await apiClient.get('/auth/me', t);
      setUser(data);
    } catch {
      // Token invalid/expired — hapus
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchMe(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, fetchMe]);

  const login = useCallback(async ({ email, password }) => {
    const data = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    const data = await apiClient.post('/auth/register', { username, email, password });
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  }, []);

  // Refresh user data (misal setelah topup)
  const refreshUser = useCallback(() => {
    if (token) fetchMe(token);
  }, [token, fetchMe]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return ctx;
}
