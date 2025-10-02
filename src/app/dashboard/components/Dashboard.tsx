'use client';

import { useEffect, useState } from 'react';
import DashboardWithKey from './DashboardWithKey';
import DashboardWithoutKey from './DashboardWithoutKey';
import { http } from '@/app/api/http';
import PageLoading from '@/components/native/PageLoading';
import { motion } from 'framer-motion';
import { ApiKeyType } from '@/types/apiKeyType';
import { useAuth } from '@/app/providers/AuthContext';

export function DashboardWithKeyAnimated({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // começa invisível e levemente para baixo
      animate={{ opacity: 1, y: 0 }} // aparece e sobe suavemente
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function DashboardWithoutKeyAnimated({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const [apiKeyData, setApiKeyData] = useState<ApiKeyType | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    const fetchApiKeyData = async () => {
      try {
        const { data } = await http.get('/api/api-key');
        setApiKeyData(data.content);
      } catch (err) {
        void err;
      } finally {
        setLoadingData(false);
      }
    };

    if (!apiKeyData) {
      fetchApiKeyData();
    }
  }, []);

  return (
    <>
      {(loadingData || loading) && <PageLoading />}
      {!loadingData && !loading && user && (
        <div>
          {apiKeyData ? (
            <DashboardWithKeyAnimated>
              <DashboardWithKey
                //onDeleteSuccess={() => setApiKeyData(null)}
                apiKeyData={apiKeyData}
              />
            </DashboardWithKeyAnimated>
          ) : (
            <DashboardWithKeyAnimated>
              <DashboardWithoutKey
                onAddApiKey={(data) => setApiKeyData(data)}
                user={user}
              />
            </DashboardWithKeyAnimated>
          )}
        </div>
      )}
    </>
  );
}
