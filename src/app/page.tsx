import DocumentsComponent from '@/components/native/home/Documents';
import MainFooter from '@/components/native/MainFooter';
import MainSection from '@/components/native/MainSection';
import OutsideHeader from '@/components/native/OutsideHeader';

export default function Home() {
  return (
    <MainSection>
      <div className="flex-1">
        <OutsideHeader />

        <div className="py-5 flex items-center justify-center px-4 mt-12">
          <DocumentsComponent />
        </div>
      </div>

      <MainFooter />
    </MainSection>
  );
}
