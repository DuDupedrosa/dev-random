import { nanoid } from 'nanoid';

export function getRandomUser(): {
  email: string;
  password: string;
  name: string;
  lastName: string;
} {
  return {
    email: `teste${nanoid(3)}@example.com`,
    password: nanoid(6),
    name: 'Usuário',
    lastName: 'Teste',
  };
}
