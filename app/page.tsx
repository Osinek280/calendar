import Pricing from "@/components/pricing";
import PageWrapper from "@/components/wrapper/page-wrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div>
        <Pricing />
      </div>
      <div className="flex justify-center items-center w-full my-[8rem]"></div>
    </PageWrapper>
  );
}
