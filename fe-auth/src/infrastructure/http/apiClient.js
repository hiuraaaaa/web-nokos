const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

/**
 * Core request — token opsional, diambil dari localStorage kalau tidak dikirim eksplisit.
 */
async function request(path, options = {}, token) {
  const t = token || localStorage.getItem('auth_token');

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
      },
      ...options,
    });
  } catch {
    throw new Error('Tidak bisa konek ke server. Cek koneksi atau alamat backend.');
  }

  const json = await res.json().catch(() => null);

  // Token expired/invalid — paksa logout
  if (res.status === 401) {
    localStorage.removeItem('auth_token');
    window.dispatchEvent(new Event('auth:logout'));
    throw new Error(json?.message || 'Sesi habis, silakan login kembali.');
  }

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Request gagal (${res.status})`);
  }

  return json.data;
}

export const apiClient = {
  get: (path, token) => request(path, {}, token),
  post: (path, body, token) => request(path, { method: 'POST', body: JSON.stringify(body) }, token),
};
