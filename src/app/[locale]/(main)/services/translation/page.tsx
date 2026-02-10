import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ServiceDetailLayout } from "@/components/services/service-detail-layout";
import { getServicesByType } from "@/lib/actions/services";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function TranslationPage() {
  const locale = (await getLocale()) as Locale;

  const services = await getServicesByType("TRANSLATION");

  const labels = {
    vi: {
      title: "Phiên dịch",
      description: "Phiên dịch viên chuyên nghiệp Việt-Hàn đi cùng bạn suốt quá trình khám và điều trị.",
      pricing: "Bảng giá",
      howItWorks: "Cách thức hoạt động",
      faq: "Câu hỏi thường gặp",
      bookNow: "Đặt dịch vụ phiên dịch",
      perSession: "/ ngày",
    },
    ko: {
      title: "통역 서비스",
      description: "전문 베트남어-한국어 통역사가 진료 및 치료 과정에 동행합니다.",
      pricing: "요금표",
      howItWorks: "이용 방법",
      faq: "자주 묻는 질문",
      bookNow: "통역 서비스 예약하기",
      perSession: "/ 일",
    },
    en: {
      title: "Translation Service",
      description: "Professional Vietnamese-Korean interpreter accompanies you through consultations and treatments.",
      pricing: "Pricing",
      howItWorks: "How It Works",
      faq: "FAQ",
      bookNow: "Book Translation Service",
      perSession: "/ day",
    },
  };

  const howItWorksSteps = {
    vi: [
      { title: "Đặt dịch vụ", description: "Chọn dịch vụ phiên dịch khi đặt lịch khám" },
      { title: "Phân công phiên dịch viên", description: "Phiên dịch viên chuyên ngành y tế được phân công" },
      { title: "Đồng hành", description: "Phiên dịch viên đi cùng bạn tại bệnh viện" },
      { title: "Hỗ trợ sau khám", description: "Hỗ trợ dịch thuật đơn thuốc và hướng dẫn chăm sóc" },
    ],
    ko: [
      { title: "서비스 예약", description: "진료 예약 시 통역 서비스를 선택하세요" },
      { title: "통역사 배정", description: "의료 전문 통역사가 배정됩니다" },
      { title: "동행", description: "병원에서 통역사가 함께합니다" },
      { title: "진료 후 지원", description: "처방전 및 관리 안내 번역 지원" },
    ],
    en: [
      { title: "Book the service", description: "Select translation service when making your booking" },
      { title: "Interpreter assigned", description: "A medical specialist interpreter is assigned" },
      { title: "Accompaniment", description: "Interpreter accompanies you at the hospital" },
      { title: "Post-visit support", description: "Help translating prescriptions and care instructions" },
    ],
  };

  const faqs = {
    vi: [
      { question: "Phiên dịch viên có chuyên môn y tế không?", answer: "Có, tất cả phiên dịch viên đều được đào tạo về thuật ngữ y tế." },
      { question: "Có thể đặt nửa ngày không?", answer: "Giá trên là cho nguyên ngày. Liên hệ để biết giá nửa ngày." },
      { question: "Hỗ trợ ngôn ngữ nào?", answer: "Chủ yếu Việt-Hàn, cũng có Việt-Anh và Hàn-Anh." },
    ],
    ko: [
      { question: "의료 전문 통역사인가요?", answer: "네, 모든 통역사는 의료 용어 교육을 받았습니다." },
      { question: "반일 예약도 가능한가요?", answer: "위 가격은 종일 기준입니다. 반일 가격은 문의해주세요." },
      { question: "어떤 언어를 지원하나요?", answer: "주로 베트남어-한국어, 베트남어-영어, 한국어-영어도 가능합니다." },
    ],
    en: [
      { question: "Are interpreters medically trained?", answer: "Yes, all interpreters are trained in medical terminology." },
      { question: "Can I book for half a day?", answer: "The price above is for a full day. Contact us for half-day pricing." },
      { question: "What languages are supported?", answer: "Primarily Vietnamese-Korean, also Vietnamese-English and Korean-English." },
    ],
  };

  const features = {
    vi: ["Phiên dịch viên chuyên ngành y tế", "Đi cùng suốt quá trình khám", "Hỗ trợ dịch tài liệu", "Có sẵn Việt-Hàn, Việt-Anh"],
    ko: ["의료 전문 통역사", "진료 전 과정 동행", "문서 번역 지원", "베트남어-한국어, 베트남어-영어 가능"],
    en: ["Medical specialist interpreters", "Accompaniment through entire visit", "Document translation support", "Vietnamese-Korean and Vietnamese-English available"],
  };

  return (
    <MobileContainer className="py-4">
      <ServiceDetailLayout
        icon={Languages}
        iconColor="bg-green-50 text-green-600"
        services={services}
        locale={locale}
        labels={labels[locale]}
        howItWorksSteps={howItWorksSteps[locale]}
        faqs={faqs[locale]}
        features={features[locale]}
      />
    </MobileContainer>
  );
}
