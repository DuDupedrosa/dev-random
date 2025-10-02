import DocumentsComponent from '@/components/native/home/Documents';
import MainSection from '@/components/native/MainSection';
import OutsideHeader from '@/components/native/OutsideHeader';

export default function Home() {
  return (
    <MainSection>
      <OutsideHeader />

      <div className="py-5 flex items-center justify-center px-4 mt-12">
        <DocumentsComponent />
      </div>
    </MainSection>
  );
}
