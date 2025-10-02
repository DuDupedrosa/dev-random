'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { http } from '@/app/api/http';
import { usePathname } from 'next/navigation';
import { UserType } from '@/types/userType';

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserType | null>(null);
  const pathname = usePathname();
  const setUser = (newUser: UserType) => setUserState(newUser);
  const clearUser = () => setUserState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await http.get('/api/user');
        setUser(data.content);
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    const routerToSkipFetchUser = ['/user/authenticate', '/', '/api-docs'];

    if (!routerToSkipFetchUser.includes(pathname) && !user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
