import MainHeader from '@/components/native/MainHeader';
import MainSection from '@/components/native/MainSection';
import Dashboard from './components/Dashboard';

export default function DashbardPage() {
  return (
    <MainSection>
      <MainHeader />

      <div className="px-5 pb-8">
        <Dashboard />
      </div>
    </MainSection>
  );
}
