import MainHeader from '@/components/native/MainHeader';
import MainSection from '@/components/native/MainSection';
import Profile from './components/Profile';
import MainFooter from '@/components/native/MainFooter';
import { AuthProvider } from '@/app/providers/AuthContext';

export default function ProfilePage() {
  return (
    <AuthProvider>
      <MainSection>
        <div className="flex-1">
          <MainHeader />

          <div className="px-5 pb-8">
            <Profile />
          </div>
        </div>

        <MainFooter />
      </MainSection>
    </AuthProvider>
  );
}
