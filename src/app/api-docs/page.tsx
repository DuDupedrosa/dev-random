import MainSection from '@/components/native/MainSection';
import ApiDocument from './components/ApiDocument';
import OutsideHeader from '@/components/native/OutsideHeader';

export default function ApiDocumentPage() {
  return (
    <MainSection>
      <OutsideHeader onlineGenerator={true} />

      <div className="flex mt-12 items-center px-4 flex-col pb-5">
        <ApiDocument />
      </div>
    </MainSection>
  );
}
