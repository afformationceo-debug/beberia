import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ServiceDetailLayout } from "@/components/services/service-detail-layout";
import { getServicesByType } from "@/lib/actions/services";
import { Hotel } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function AccommodationPage() {
  const locale = (await getLocale()) as Locale;

  const services = await getServicesByType("ACCOMMODATION");

  const labels = {
    vi: {
      title: "Lưu trú",
      description: "Khách sạn và nhà nghỉ tiện lợi gần bệnh viện, được kiểm chứng chất lượng.",
      pricing: "Bảng giá",
      howItWorks: "Cách thức hoạt động",
      faq: "Câu hỏi thường gặp",
      bookNow: "Đặt phòng lưu trú",
      perSession: "/ đêm",
    },
    ko: {
      title: "숙소",
      description: "병원 근처 편리하고 품질 검증된 호텔과 게스트하우스.",
      pricing: "요금표",
      howItWorks: "이용 방법",
      faq: "자주 묻는 질문",
      bookNow: "숙소 예약하기",
      perSession: "/ 박",
    },
    en: {
      title: "Accommodation",
      description: "Quality-verified hotels and guesthouses conveniently located near hospitals.",
      pricing: "Pricing",
      howItWorks: "How It Works",
      faq: "FAQ",
      bookNow: "Book Accommodation",
      perSession: "/ night",
    },
  };

  const howItWorksSteps = {
    vi: [
      { title: "Chọn loại phòng", description: "Standard, Premium hoặc Suite tùy nhu cầu" },
      { title: "Xác nhận đặt phòng", description: "Nhận xác nhận qua email và tin nhắn" },
      { title: "Check-in", description: "Nhận phòng thuận tiện, gần bệnh viện" },
      { title: "Hỗ trợ 24/7", description: "Liên hệ bất cứ lúc nào nếu cần hỗ trợ" },
    ],
    ko: [
      { title: "객실 유형 선택", description: "Standard, Premium, Suite 중 선택" },
      { title: "예약 확인", description: "이메일과 문자로 확인 받기" },
      { title: "체크인", description: "병원 근처 편리한 체크인" },
      { title: "24시간 지원", description: "언제든지 지원 요청 가능" },
    ],
    en: [
      { title: "Choose room type", description: "Standard, Premium, or Suite based on your needs" },
      { title: "Booking confirmed", description: "Receive confirmation via email and message" },
      { title: "Check-in", description: "Convenient check-in near the hospital" },
      { title: "24/7 support", description: "Contact us anytime for assistance" },
    ],
  };

  const faqs = {
    vi: [
      { question: "Khách sạn cách bệnh viện bao xa?", answer: "Tất cả đều trong vòng 15 phút đi bộ hoặc 5 phút taxi từ bệnh viện." },
      { question: "Có thể ở dài ngày không?", answer: "Có, giá ưu đãi cho lưu trú từ 7 đêm trở lên." },
      { question: "Có bữa ăn không?", answer: "Hầu hết khách sạn bao gồm bữa sáng. Gói Premium/Suite có thêm bữa phụ." },
    ],
    ko: [
      { question: "병원에서 얼마나 가까운가요?", answer: "모두 병원에서 도보 15분 또는 택시 5분 이내입니다." },
      { question: "장기 투숙 가능한가요?", answer: "네, 7박 이상 시 장기 투숙 할인이 적용됩니다." },
      { question: "식사가 포함되나요?", answer: "대부분 조식 포함이며, Premium/Suite는 추가 식사가 제공됩니다." },
    ],
    en: [
      { question: "How far from the hospital?", answer: "All within 15 minutes walking or 5 minutes by taxi from the hospital." },
      { question: "Can I stay for long periods?", answer: "Yes, discounted rates for stays of 7 nights or more." },
      { question: "Are meals included?", answer: "Most include breakfast. Premium/Suite packages include additional meals." },
    ],
  };

  const features = {
    vi: ["Gần bệnh viện (dưới 15 phút)", "Phòng sạch, tiện nghi đầy đủ", "Wi-Fi miễn phí", "Hỗ trợ tiếng Việt"],
    ko: ["병원 근처 (15분 이내)", "깨끗한 객실, 편의시설 완비", "무료 Wi-Fi", "베트남어 지원"],
    en: ["Near hospital (under 15 min)", "Clean rooms, full amenities", "Free Wi-Fi", "Vietnamese language support"],
  };

  return (
    <MobileContainer className="py-4">
      <ServiceDetailLayout
        icon={Hotel}
        iconColor="bg-purple-50 text-purple-600"
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
