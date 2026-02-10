import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ServiceDetailLayout } from "@/components/services/service-detail-layout";
import { getServicesByType } from "@/lib/actions/services";
import { Plane } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function PickupPage() {
  const locale = (await getLocale()) as Locale;

  const services = await getServicesByType("AIRPORT_PICKUP");

  const labels = {
    vi: {
      title: "Đón sân bay",
      description: "Dịch vụ đưa đón thoải mái từ sân bay Incheon đến khách sạn hoặc bệnh viện của bạn.",
      pricing: "Bảng giá",
      howItWorks: "Cách thức hoạt động",
      faq: "Câu hỏi thường gặp",
      bookNow: "Đặt dịch vụ đón sân bay",
      perSession: "/ lượt",
    },
    ko: {
      title: "공항 픽업",
      description: "인천공항에서 호텔 또는 병원까지 편안한 이동 서비스를 제공합니다.",
      pricing: "요금표",
      howItWorks: "이용 방법",
      faq: "자주 묻는 질문",
      bookNow: "공항 픽업 예약하기",
      perSession: "/ 편도",
    },
    en: {
      title: "Airport Pickup",
      description: "Comfortable transfer service from Incheon Airport to your hotel or hospital.",
      pricing: "Pricing",
      howItWorks: "How It Works",
      faq: "FAQ",
      bookNow: "Book Airport Pickup",
      perSession: "/ trip",
    },
  };

  const howItWorksSteps = {
    vi: [
      { title: "Đặt dịch vụ", description: "Cung cấp thông tin chuyến bay khi đặt lịch" },
      { title: "Xác nhận", description: "Nhận xác nhận và thông tin tài xế qua tin nhắn" },
      { title: "Đón tại sân bay", description: "Tài xế chờ sẵn tại cổng đến với biển tên" },
      { title: "Di chuyển", description: "Thoải mái di chuyển đến khách sạn/bệnh viện" },
    ],
    ko: [
      { title: "서비스 예약", description: "예약 시 항공편 정보를 제공해주세요" },
      { title: "확인", description: "문자로 확인 및 기사님 정보를 받으세요" },
      { title: "공항 미팅", description: "도착 게이트에서 이름표를 든 기사가 대기" },
      { title: "이동", description: "호텔/병원까지 편안하게 이동" },
    ],
    en: [
      { title: "Book the service", description: "Provide your flight information when booking" },
      { title: "Confirmation", description: "Receive confirmation and driver info via message" },
      { title: "Airport meeting", description: "Driver waits at arrival gate with name sign" },
      { title: "Transfer", description: "Comfortable ride to your hotel/hospital" },
    ],
  };

  const faqs = {
    vi: [
      { question: "Có thể đón chuyến bay đêm không?", answer: "Có, chúng tôi hoạt động 24/7 phục vụ mọi chuyến bay." },
      { question: "Bao gồm cả chuyến về không?", answer: "Giá trên là cho 1 lượt. Đặt thêm chuyến về với giá ưu đãi." },
      { question: "Nếu chuyến bay bị delay?", answer: "Chúng tôi theo dõi chuyến bay và điều chỉnh thời gian đón tự động." },
    ],
    ko: [
      { question: "심야 비행편도 가능한가요?", answer: "네, 24시간 모든 비행편에 대응합니다." },
      { question: "왕복 포함인가요?", answer: "위 가격은 편도 기준입니다. 왕복은 할인 가격으로 추가 예약 가능합니다." },
      { question: "비행기 지연시?", answer: "항공편을 실시간 추적하여 자동으로 픽업 시간을 조정합니다." },
    ],
    en: [
      { question: "Available for late-night flights?", answer: "Yes, we operate 24/7 for all flights." },
      { question: "Does it include return trip?", answer: "The price is for one way. Book a return trip at a discounted rate." },
      { question: "What if my flight is delayed?", answer: "We monitor flights in real-time and adjust pickup time automatically." },
    ],
  };

  const features = {
    vi: ["Đón tại cổng đến sân bay Incheon", "Xe sedan hoặc van thoải mái", "Wi-Fi miễn phí trên xe", "Hỗ trợ hành lý"],
    ko: ["인천공항 도착 게이트 미팅", "세단 또는 밴 선택 가능", "차량 내 무료 Wi-Fi", "짐 운반 도움"],
    en: ["Meet at Incheon Airport arrival gate", "Sedan or van options", "Free Wi-Fi in vehicle", "Luggage assistance"],
  };

  return (
    <MobileContainer className="py-4">
      <ServiceDetailLayout
        icon={Plane}
        iconColor="bg-blue-50 text-blue-600"
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
