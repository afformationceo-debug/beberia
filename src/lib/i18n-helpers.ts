import type { Locale } from "@/i18n/routing";

/**
 * Get localized field value from a trilingual model.
 * Usage: getLocalizedField(hospital, "name", locale) -> hospital.nameVi / nameKo / nameEn
 */
export function getLocalizedField<
  T extends Record<string, unknown>,
>(
  obj: T,
  field: string,
  locale: Locale
): string {
  const suffixMap: Record<Locale, string> = {
    vi: "Vi",
    ko: "Ko",
    en: "En",
  };
  const key = `${field}${suffixMap[locale]}` as keyof T;
  const fallbackKey = `${field}En` as keyof T;
  return (obj[key] as string) || (obj[fallbackKey] as string) || "";
}

/**
 * Format price in locale-appropriate currency
 */
export function formatPrice(amount: number, locale: Locale = "vi"): string {
  const formatter = new Intl.NumberFormat(
    locale === "vi" ? "vi-VN" : locale === "ko" ? "ko-KR" : "en-US",
    {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }
  );
  return formatter.format(amount);
}

/**
 * Hospital category display names
 */
export const categoryLabels: Record<string, Record<Locale, string>> = {
  PLASTIC_SURGERY: { vi: "Phẫu thuật thẩm mỹ", ko: "성형외과", en: "Plastic Surgery" },
  OPHTHALMOLOGY: { vi: "Nhãn khoa", ko: "안과", en: "Ophthalmology" },
  DENTISTRY: { vi: "Nha khoa", ko: "치과", en: "Dentistry" },
  DERMATOLOGY: { vi: "Da liễu", ko: "피부과", en: "Dermatology" },
  ORIENTAL_MEDICINE: { vi: "Y học cổ truyền", ko: "한의원", en: "Oriental Medicine" },
};

export function getCategoryLabel(category: string, locale: Locale): string {
  return categoryLabels[category]?.[locale] || category;
}

/**
 * Highlight badge translations
 */
export const highlightLabels: Record<string, Record<Locale, string>> = {
  vietnamese_staff: { vi: "Nhân viên Việt Nam", ko: "베트남어 가능", en: "Vietnamese Staff" },
  gangnam: { vi: "Gangnam", ko: "강남", en: "Gangnam" },
  gangnam_location: { vi: "Vị trí Gangnam", ko: "강남 위치", en: "Gangnam Location" },
  top_rated: { vi: "Đánh giá cao", ko: "최고 평점", en: "Top Rated" },
  vip_service: { vi: "Dịch vụ VIP", ko: "VIP 서비스", en: "VIP Service" },
  beberia_partner: { vi: "Đối tác Beberia", ko: "베베리아 파트너", en: "Beberia Partner" },
  free_consultation: { vi: "Tư vấn miễn phí", ko: "무료 상담", en: "Free Consultation" },
  airport_pickup: { vi: "Đón sân bay", ko: "공항 픽업", en: "Airport Pickup" },
  post_surgery_care: { vi: "Chăm sóc sau PT", ko: "수술 후 관리", en: "Post-Surgery Care" },
  latest_equipment: { vi: "Thiết bị mới nhất", ko: "최신 장비", en: "Latest Equipment" },
  digital_cad_cam: { vi: "CAD/CAM kỹ thuật số", ko: "디지털 CAD/CAM", en: "Digital CAD/CAM" },
  one_day_treatment: { vi: "Điều trị 1 ngày", ko: "당일 치료", en: "One-Day Treatment" },
  pico_laser: { vi: "Laser Pico", ko: "피코 레이저", en: "Pico Laser" },
  skin_analysis: { vi: "Phân tích da", ko: "피부 분석", en: "Skin Analysis" },
  traditional_medicine: { vi: "Y học truyền thống", ko: "전통 의학", en: "Traditional Medicine" },
  herbal_pharmacy: { vi: "Nhà thuốc thảo dược", ko: "한약방", en: "Herbal Pharmacy" },
};

export function getHighlightLabel(highlight: string, locale: Locale): string {
  return highlightLabels[highlight]?.[locale] || highlight;
}
