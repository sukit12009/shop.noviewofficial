const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  data: T;
  error: { code: string; message: string } | null;
  meta: { page: number; total: number };
}

async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (json.error !== null) {
    throw new Error(json.error.message);
  }

  return json;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) =>
    apiFetch<T>(path, { method: 'GET', ...init }),
};
