'use client';

import { User } from '@/types/user';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { http } from '@/app/api/http';
import { usePathname } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const pathname = usePathname();
  const setUser = (newUser: User) => setUserState(newUser);
  const clearUser = () => setUserState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await http.get('/api/user');
        setUser(data.content);
      } catch {
        clearUser();
      }
    };

    if (!pathname.includes('authenticate') && !user) {
      fetchUser();
    }
  }, [pathname, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
