import MainSection from '@/components/native/MainSection';
import ApiDocument from './components/ApiDocument';
import OutsideHeader from '@/components/native/OutsideHeader';
import MainFooter from '@/components/native/MainFooter';

export default function ApiDocumentPage() {
  return (
    <MainSection>
      <div className="flex-1">
        <OutsideHeader onlineGenerator={true} />

        <div className="flex mt-12 items-center px-4 flex-col pb-5">
          <ApiDocument />
        </div>
      </div>

      <MainFooter />
    </MainSection>
  );
}
