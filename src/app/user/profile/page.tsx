import MainHeader from '@/components/native/MainHeader';
import MainSection from '@/components/native/MainSection';
import Profile from './components/Profile';

export default function ProfilePage() {
  return (
    <MainSection>
      <MainHeader />

      <div className="px-5 pb-8">
        <Profile />
      </div>
    </MainSection>
  );
}
