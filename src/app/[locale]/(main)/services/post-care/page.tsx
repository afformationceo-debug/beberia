import { getLocale } from "next-intl/server";
import { MobileContainer } from "@/components/layout/mobile-container";
import { ServiceDetailLayout } from "@/components/services/service-detail-layout";
import { getServicesByType } from "@/lib/actions/services";
import { HeartPulse } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export default async function PostCarePage() {
  const locale = (await getLocale()) as Locale;

  const services = await getServicesByType("POST_CARE");

  const labels = {
    vi: {
      title: "Chăm sóc sau",
      description: "Dịch vụ theo dõi và chăm sóc sức khỏe chuyên nghiệp sau phẫu thuật tại Hàn Quốc.",
      pricing: "Bảng giá",
      howItWorks: "Cách thức hoạt động",
      faq: "Câu hỏi thường gặp",
      bookNow: "Đặt dịch vụ chăm sóc sau",
      perSession: "/ gói",
    },
    ko: {
      title: "사후 관리",
      description: "한국에서의 수술 후 전문적인 건강 모니터링 및 관리 서비스.",
      pricing: "요금표",
      howItWorks: "이용 방법",
      faq: "자주 묻는 질문",
      bookNow: "사후 관리 예약하기",
      perSession: "/ 패키지",
    },
    en: {
      title: "Post Care",
      description: "Professional health monitoring and care service after surgery in Korea.",
      pricing: "Pricing",
      howItWorks: "How It Works",
      faq: "FAQ",
      bookNow: "Book Post Care",
      perSession: "/ package",
    },
  };

  const howItWorksSteps = {
    vi: [
      { title: "Đăng ký gói chăm sóc", description: "Chọn gói 3, 7 hoặc 14 ngày phù hợp" },
      { title: "Khám theo lịch", description: "Tái khám định kỳ theo lịch của bác sĩ" },
      { title: "Theo dõi hàng ngày", description: "Nhân viên liên hệ kiểm tra tình trạng mỗi ngày" },
      { title: "Hỗ trợ khẩn cấp", description: "Đường dây nóng 24/7 cho trường hợp khẩn cấp" },
    ],
    ko: [
      { title: "관리 패키지 선택", description: "3일, 7일, 14일 패키지 중 선택" },
      { title: "정기 진료", description: "의사 스케줄에 따른 정기 진료" },
      { title: "일일 모니터링", description: "매일 담당자가 상태를 확인합니다" },
      { title: "긴급 지원", description: "24시간 긴급 연락 가능" },
    ],
    en: [
      { title: "Choose care package", description: "Select 3, 7, or 14-day package" },
      { title: "Scheduled check-ups", description: "Regular follow-ups per doctor's schedule" },
      { title: "Daily monitoring", description: "Staff checks on your condition every day" },
      { title: "Emergency support", description: "24/7 hotline for emergencies" },
    ],
  };

  const faqs = {
    vi: [
      { question: "Gói nào phù hợp cho tôi?", answer: "Gói 3 ngày cho thủ thuật nhẹ, 7 ngày cho phẫu thuật vừa, 14 ngày cho phẫu thuật lớn." },
      { question: "Có bao gồm thuốc không?", answer: "Thuốc kê đơn của bác sĩ được bao gồm trong gói." },
      { question: "Sau khi về Việt Nam thì sao?", answer: "Hỗ trợ tư vấn online trong 1 tháng sau khi về nước." },
    ],
    ko: [
      { question: "어떤 패키지가 적합한가요?", answer: "3일은 간단한 시술, 7일은 중간 수술, 14일은 대수술에 적합합니다." },
      { question: "약이 포함되나요?", answer: "의사 처방약이 패키지에 포함됩니다." },
      { question: "귀국 후에는?", answer: "귀국 후 1개월간 온라인 상담을 지원합니다." },
    ],
    en: [
      { question: "Which package suits me?", answer: "3 days for minor procedures, 7 days for medium surgery, 14 days for major surgery." },
      { question: "Are medications included?", answer: "Doctor-prescribed medications are included in the package." },
      { question: "What about after returning home?", answer: "Online consultation support for 1 month after returning home." },
    ],
  };

  const features = {
    vi: ["Tái khám định kỳ miễn phí", "Theo dõi sức khỏe hàng ngày", "Đường dây nóng 24/7", "Tư vấn online sau khi về nước"],
    ko: ["무료 정기 진료", "매일 건강 모니터링", "24시간 긴급 연락", "귀국 후 온라인 상담"],
    en: ["Free scheduled follow-ups", "Daily health monitoring", "24/7 emergency hotline", "Online consultation after returning home"],
  };

  return (
    <MobileContainer className="py-4">
      <ServiceDetailLayout
        icon={HeartPulse}
        iconColor="bg-red-50 text-red-600"
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
