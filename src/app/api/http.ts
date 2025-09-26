import axios, { HttpStatusCode } from 'axios';
import { toast } from 'sonner';

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    config.headers
      ? (config.headers.Authorization = `Bearer ${token}`)
      : (config.headers =
          config.headers || `Bearer ${token}` || 'application/json');
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    //const requestUrl = error?.config?.url;

    if (error.response) {
      const { status } = error.response;

      // Trata 401 em qualquer rota
      if (status === HttpStatusCode.Unauthorized) {
        window.location.href = `/user/authenticate?error=unauthorized`;
        window.localStorage.clear();
      }

      // Só mostra toast de erro 500 se NÃO for a rota que queremos ignorar
      // const isIgnored500 =
      //   requestUrl?.includes("/api/user/change-language") &&
      //   status === HttpStatusCode.InternalServerError;

      if (status === HttpStatusCode.InternalServerError) {
        toast.error(
          'Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      }
    }

    return Promise.reject(error);
  }
);
