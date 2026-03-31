import { InquiryWizard } from "@/components/InquiryWizard";
import Index from "./Index";

export default function StartInquiry() {
  return (
    <>
      <Index />
      <InquiryWizard openOnMount redirectOnClose="/" />
    </>
  );
}
