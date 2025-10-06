import MainHeader from '@/components/native/MainHeader';
import MainSection from '@/components/native/MainSection';
import Dashboard from './components/Dashboard';
import MainFooter from '@/components/native/MainFooter';
import { AuthProvider } from '../providers/AuthContext';

export default function DashbardPage() {
  return (
    <AuthProvider>
      <MainSection>
        <div className="flex-1">
          <MainHeader />

          <div className="px-5 pb-8">
            <Dashboard />
          </div>
        </div>

        <MainFooter />
      </MainSection>
    </AuthProvider>
  );
}
