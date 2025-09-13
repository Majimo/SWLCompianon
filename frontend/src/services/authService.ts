import api from "../interceptors/api";

export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await api.post('/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (response.data.access_token) {
    sessionStorage.setItem('accessToken', response.data.access_token);
  }

  return response.data;
};
