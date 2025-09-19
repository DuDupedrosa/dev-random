import DocumentsComponent from "@/components/native/home/Documents";
import MainHeader from "@/components/native/MainHeader";
import MainSection from "@/components/native/MainSection";

export default function Home() {
  return (
    <MainSection>
      <MainHeader />

      <div className="py-5 flex items-center justify-center px-4 mt-12">
        <DocumentsComponent />
      </div>
    </MainSection>
  );
}
