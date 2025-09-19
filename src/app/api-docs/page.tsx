import MainHeader from "@/components/native/MainHeader";
import MainSection from "@/components/native/MainSection";
import ApiDocument from "./components/ApiDocument";

export default function ApiDocumentPage() {
  return (
    <MainSection>
      <MainHeader onlineGenerator={true} />
      <div className="flex mt-12 items-center px-4 flex-col pb-5">
        <ApiDocument />
      </div>
    </MainSection>
  );
}
