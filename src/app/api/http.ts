import axios, { HttpStatusCode } from 'axios';
import { toast } from 'sonner';

export const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // <--- envia cookies automaticamente
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Trata 401 em qualquer rota
      if (status === HttpStatusCode.Unauthorized) {
        window.location.href = `/user/authenticate?error=unauthorized`;
      }

      if (status === HttpStatusCode.InternalServerError) {
        toast.error(
          'Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      }
    }

    return Promise.reject(error);
  }
);
