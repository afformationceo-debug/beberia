import { PrismaClient, HospitalCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Procedure Categories
  const categories = await Promise.all([
    prisma.procedureCategory.create({
      data: {
        slug: "plastic-surgery",
        nameVi: "Phẫu thuật thẩm mỹ",
        nameKo: "성형외과",
        nameEn: "Plastic Surgery",
        icon: "scissors",
        order: 1,
      },
    }),
    prisma.procedureCategory.create({
      data: {
        slug: "ophthalmology",
        nameVi: "Nhãn khoa",
        nameKo: "안과",
        nameEn: "Ophthalmology",
        icon: "eye",
        order: 2,
      },
    }),
    prisma.procedureCategory.create({
      data: {
        slug: "dentistry",
        nameVi: "Nha khoa",
        nameKo: "치과",
        nameEn: "Dentistry",
        icon: "smile-plus",
        order: 3,
      },
    }),
    prisma.procedureCategory.create({
      data: {
        slug: "dermatology",
        nameVi: "Da liễu",
        nameKo: "피부과",
        nameEn: "Dermatology",
        icon: "sparkles",
        order: 4,
      },
    }),
    prisma.procedureCategory.create({
      data: {
        slug: "oriental-medicine",
        nameVi: "Y học cổ truyền",
        nameKo: "한의원",
        nameEn: "Oriental Medicine",
        icon: "leaf",
        order: 5,
      },
    }),
  ]);

  // Hospitals
  const hospitals = await Promise.all([
    prisma.hospital.create({
      data: {
        slug: "gangnam-beauty-clinic",
        nameVi: "Phòng khám Thẩm mỹ Gangnam",
        nameKo: "강남 뷰티 클리닉",
        nameEn: "Gangnam Beauty Clinic",
        descriptionVi:
          "Phòng khám thẩm mỹ hàng đầu tại Gangnam với hơn 15 năm kinh nghiệm. Chuyên về nâng mũi, cắt mí và phẫu thuật hàm mặt.",
        descriptionKo:
          "15년 이상의 경험을 가진 강남 최고의 성형외과. 코 성형, 눈 성형, 안면윤곽 전문.",
        descriptionEn:
          "Premier plastic surgery clinic in Gangnam with over 15 years of experience. Specializing in rhinoplasty, blepharoplasty, and facial contouring.",
        categories: [HospitalCategory.PLASTIC_SURGERY, HospitalCategory.DERMATOLOGY],
        address: "123 Gangnam-daero, Gangnam-gu, Seoul",
        addressVi: "123 Gangnam-daero, Quận Gangnam, Seoul",
        district: "Gangnam",
        city: "Seoul",
        latitude: 37.4979,
        longitude: 127.0276,
        phone: "+82-2-1234-5678",
        operatingHours: {
          mon: "09:00-18:00",
          tue: "09:00-18:00",
          wed: "09:00-18:00",
          thu: "09:00-18:00",
          fri: "09:00-18:00",
          sat: "09:00-13:00",
          sun: "Closed",
        },
        highlights: ["vietnamese_staff", "gangnam", "top_rated"],
        ratingAvg: 4.9,
        reviewCount: 128,
        isFeatured: true,
        beberiaPartner: true,
        languagesSupported: ["vi", "ko", "en"],
        thumbnailUrl: "/images/hospitals/gangnam-beauty.jpg",
        galleryUrls: [
          "/images/hospitals/gangnam-beauty-1.jpg",
          "/images/hospitals/gangnam-beauty-2.jpg",
          "/images/hospitals/gangnam-beauty-3.jpg",
        ],
      },
    }),
    prisma.hospital.create({
      data: {
        slug: "seoul-bright-eye",
        nameVi: "Bệnh viện Mắt Seoul Bright",
        nameKo: "서울 브라이트 안과",
        nameEn: "Seoul Bright Eye Hospital",
        descriptionVi:
          "Bệnh viện mắt chuyên nghiệp với công nghệ laser tiên tiến nhất. Chuyên về LASIK, LASEK và phẫu thuật đục thủy tinh thể.",
        descriptionKo:
          "최신 레이저 기술의 전문 안과. 라식, 라섹, 백내장 수술 전문.",
        descriptionEn:
          "Professional eye hospital with the latest laser technology. Specializing in LASIK, LASEK, and cataract surgery.",
        categories: [HospitalCategory.OPHTHALMOLOGY],
        address: "456 Teheran-ro, Gangnam-gu, Seoul",
        addressVi: "456 Teheran-ro, Quận Gangnam, Seoul",
        district: "Gangnam",
        city: "Seoul",
        latitude: 37.5087,
        longitude: 127.0632,
        phone: "+82-2-2345-6789",
        operatingHours: {
          mon: "09:00-18:00",
          tue: "09:00-18:00",
          wed: "09:00-18:00",
          thu: "09:00-18:00",
          fri: "09:00-18:00",
          sat: "09:00-14:00",
          sun: "Closed",
        },
        highlights: ["vietnamese_staff", "gangnam"],
        ratingAvg: 4.8,
        reviewCount: 95,
        isFeatured: true,
        beberiaPartner: true,
        languagesSupported: ["vi", "ko", "en", "zh"],
        thumbnailUrl: "/images/hospitals/seoul-bright-eye.jpg",
        galleryUrls: [],
      },
    }),
    prisma.hospital.create({
      data: {
        slug: "smile-dental-korea",
        nameVi: "Nha khoa Smile Korea",
        nameKo: "스마일 치과 코리아",
        nameEn: "Smile Dental Korea",
        descriptionVi:
          "Nha khoa cao cấp chuyên về trồng răng implant, niềng răng và bọc sứ. Dịch vụ VIP cho khách hàng quốc tế.",
        descriptionKo:
          "임플란트, 교정, 라미네이트 전문 프리미엄 치과. 해외 환자 VIP 서비스.",
        descriptionEn:
          "Premium dental clinic specializing in implants, orthodontics, and veneers. VIP service for international patients.",
        categories: [HospitalCategory.DENTISTRY],
        address: "789 Apgujeong-ro, Gangnam-gu, Seoul",
        addressVi: "789 Apgujeong-ro, Quận Gangnam, Seoul",
        district: "Gangnam",
        city: "Seoul",
        latitude: 37.5271,
        longitude: 127.0398,
        phone: "+82-2-3456-7890",
        operatingHours: {
          mon: "10:00-19:00",
          tue: "10:00-19:00",
          wed: "10:00-19:00",
          thu: "10:00-19:00",
          fri: "10:00-19:00",
          sat: "10:00-15:00",
          sun: "Closed",
        },
        highlights: ["vietnamese_staff", "gangnam", "vip_service"],
        ratingAvg: 4.7,
        reviewCount: 76,
        isFeatured: false,
        beberiaPartner: true,
        languagesSupported: ["vi", "ko", "en"],
        thumbnailUrl: "/images/hospitals/smile-dental.jpg",
        galleryUrls: [],
      },
    }),
    prisma.hospital.create({
      data: {
        slug: "k-skin-dermatology",
        nameVi: "Da liễu K-Skin",
        nameKo: "K-스킨 피부과",
        nameEn: "K-Skin Dermatology",
        descriptionVi:
          "Trung tâm da liễu với các liệu trình chăm sóc da hàng đầu Hàn Quốc. Chuyên về trị mụn, trẻ hóa da và laser.",
        descriptionKo:
          "한국 최고의 스킨케어 프로그램. 여드름 치료, 피부 재생, 레이저 전문.",
        descriptionEn:
          "Dermatology center with Korea's top skincare programs. Specializing in acne treatment, skin rejuvenation, and laser.",
        categories: [HospitalCategory.DERMATOLOGY],
        address: "321 Sinsa-dong, Gangnam-gu, Seoul",
        addressVi: "321 Sinsa-dong, Quận Gangnam, Seoul",
        district: "Gangnam",
        city: "Seoul",
        latitude: 37.5166,
        longitude: 127.0198,
        phone: "+82-2-4567-8901",
        operatingHours: {
          mon: "10:00-20:00",
          tue: "10:00-20:00",
          wed: "10:00-20:00",
          thu: "10:00-20:00",
          fri: "10:00-20:00",
          sat: "10:00-16:00",
          sun: "Closed",
        },
        highlights: ["gangnam", "late_hours"],
        ratingAvg: 4.6,
        reviewCount: 62,
        isFeatured: true,
        beberiaPartner: false,
        languagesSupported: ["ko", "en"],
        thumbnailUrl: "/images/hospitals/k-skin.jpg",
        galleryUrls: [],
      },
    }),
    prisma.hospital.create({
      data: {
        slug: "hanbang-oriental-clinic",
        nameVi: "Phòng khám Đông y Hanbang",
        nameKo: "한방 한의원",
        nameEn: "Hanbang Oriental Medicine Clinic",
        descriptionVi:
          "Phòng khám đông y truyền thống kết hợp y học hiện đại. Chuyên về châm cứu, thuốc đông y và chăm sóc sức khỏe toàn diện.",
        descriptionKo:
          "전통 한의학과 현대 의학의 결합. 침술, 한약, 종합 건강 관리 전문.",
        descriptionEn:
          "Traditional oriental medicine combined with modern healthcare. Specializing in acupuncture, herbal medicine, and holistic wellness.",
        categories: [HospitalCategory.ORIENTAL_MEDICINE],
        address: "555 Myeongdong-gil, Jung-gu, Seoul",
        addressVi: "555 Myeongdong-gil, Quận Jung, Seoul",
        district: "Jung-gu",
        city: "Seoul",
        latitude: 37.5636,
        longitude: 126.986,
        phone: "+82-2-5678-9012",
        operatingHours: {
          mon: "09:00-18:00",
          tue: "09:00-18:00",
          wed: "09:00-18:00",
          thu: "09:00-18:00",
          fri: "09:00-18:00",
          sat: "09:00-13:00",
          sun: "Closed",
        },
        highlights: ["traditional", "holistic"],
        ratingAvg: 4.5,
        reviewCount: 43,
        isFeatured: false,
        beberiaPartner: true,
        languagesSupported: ["vi", "ko", "en"],
        thumbnailUrl: "/images/hospitals/hanbang.jpg",
        galleryUrls: [],
      },
    }),
  ]);

  // Doctors
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        hospitalId: hospitals[0].id,
        nameVi: "BS. Park Joon-ho",
        nameKo: "박준호 원장",
        nameEn: "Dr. Park Joon-ho",
        specialty: "Rhinoplasty",
        bioVi: "Hơn 20 năm kinh nghiệm trong phẫu thuật nâng mũi. Đã thực hiện hơn 10,000 ca phẫu thuật.",
        bioKo: "코 성형 20년 이상 경력. 10,000건 이상의 수술 경험.",
        bioEn: "Over 20 years of experience in rhinoplasty. Performed over 10,000 surgeries.",
        credentials: { education: "Seoul National University Medical School", certifications: ["Korean Board of Plastic Surgery"] },
        ratingAvg: 4.9,
        reviewCount: 85,
        displayOrder: 1,
      },
    }),
    prisma.doctor.create({
      data: {
        hospitalId: hospitals[0].id,
        nameVi: "BS. Kim Min-ji",
        nameKo: "김민지 원장",
        nameEn: "Dr. Kim Min-ji",
        specialty: "Blepharoplasty",
        bioVi: "Chuyên gia cắt mí và phẫu thuật vùng mắt hàng đầu Hàn Quốc.",
        bioKo: "한국 최고의 눈 성형 전문의.",
        bioEn: "Korea's top specialist in eye surgery and blepharoplasty.",
        credentials: { education: "Yonsei University Medical School", certifications: ["Korean Board of Plastic Surgery"] },
        ratingAvg: 4.8,
        reviewCount: 62,
        displayOrder: 2,
      },
    }),
    prisma.doctor.create({
      data: {
        hospitalId: hospitals[1].id,
        nameVi: "BS. Lee Sung-woo",
        nameKo: "이성우 원장",
        nameEn: "Dr. Lee Sung-woo",
        specialty: "LASIK/LASEK",
        bioVi: "Chuyên gia phẫu thuật mắt LASIK với tỷ lệ thành công 99.8%.",
        bioKo: "99.8% 성공률의 라식 전문의.",
        bioEn: "LASIK surgery specialist with 99.8% success rate.",
        credentials: { education: "Korea University Medical School" },
        ratingAvg: 4.9,
        reviewCount: 71,
        displayOrder: 1,
      },
    }),
    prisma.doctor.create({
      data: {
        hospitalId: hospitals[2].id,
        nameVi: "BS. Choi Hyun-woo",
        nameKo: "최현우 원장",
        nameEn: "Dr. Choi Hyun-woo",
        specialty: "Dental Implants",
        bioVi: "Chuyên gia trồng răng implant với công nghệ 3D tiên tiến.",
        bioKo: "3D 기술의 임플란트 전문의.",
        bioEn: "Dental implant specialist with advanced 3D technology.",
        credentials: { education: "Seoul National University Dental School" },
        ratingAvg: 4.7,
        reviewCount: 48,
        displayOrder: 1,
      },
    }),
  ]);

  // Procedures
  await Promise.all([
    // Gangnam Beauty Clinic procedures
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[0].id,
        categoryId: categories[0].id,
        nameVi: "Nâng mũi cấu trúc",
        nameKo: "구조적 코 성형",
        nameEn: "Structural Rhinoplasty",
        descriptionVi: "Nâng mũi cấu trúc toàn diện sử dụng sụn tự thân, cho kết quả tự nhiên và lâu dài.",
        descriptionKo: "자가 연골을 사용한 구조적 코 성형으로 자연스럽고 오래가는 결과.",
        descriptionEn: "Comprehensive structural rhinoplasty using autologous cartilage for natural, long-lasting results.",
        originalPrice: 5000000,
        discountedPrice: 3500000,
        beberiaPrice: 2800000,
        durationMinutes: 120,
        recoveryDays: 14,
        isPopular: true,
      },
    }),
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[0].id,
        categoryId: categories[0].id,
        nameVi: "Cắt mí mắt trên + dưới",
        nameKo: "상하 눈꺼풀 수술",
        nameEn: "Upper + Lower Blepharoplasty",
        descriptionVi: "Cắt mí mắt trên và dưới để tạo đôi mắt to tròn, trẻ trung.",
        descriptionKo: "크고 밝은 눈을 위한 상하 눈꺼풀 수술.",
        descriptionEn: "Upper and lower eyelid surgery for bigger, brighter eyes.",
        originalPrice: 3000000,
        discountedPrice: 2100000,
        beberiaPrice: 1800000,
        durationMinutes: 60,
        recoveryDays: 7,
        isPopular: true,
      },
    }),
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[0].id,
        categoryId: categories[0].id,
        nameVi: "Gọt cằm V-line",
        nameKo: "V라인 턱 성형",
        nameEn: "V-line Jaw Surgery",
        originalPrice: 8000000,
        discountedPrice: 6000000,
        beberiaPrice: 5000000,
        durationMinutes: 180,
        recoveryDays: 21,
        isPopular: false,
      },
    }),
    // Seoul Bright Eye procedures
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[1].id,
        categoryId: categories[1].id,
        nameVi: "Phẫu thuật LASIK",
        nameKo: "라식 수술",
        nameEn: "LASIK Surgery",
        descriptionVi: "Phẫu thuật laser LASIK sử dụng công nghệ tiên tiến nhất, an toàn và hiệu quả.",
        descriptionKo: "최신 기술의 안전하고 효과적인 라식 수술.",
        descriptionEn: "LASIK laser surgery using the latest technology, safe and effective.",
        originalPrice: 2500000,
        discountedPrice: 1800000,
        beberiaPrice: 1500000,
        durationMinutes: 30,
        recoveryDays: 3,
        isPopular: true,
      },
    }),
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[1].id,
        categoryId: categories[1].id,
        nameVi: "Phẫu thuật LASEK",
        nameKo: "라섹 수술",
        nameEn: "LASEK Surgery",
        originalPrice: 2000000,
        discountedPrice: 1500000,
        beberiaPrice: 1200000,
        durationMinutes: 30,
        recoveryDays: 5,
        isPopular: true,
      },
    }),
    // Smile Dental procedures
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[2].id,
        categoryId: categories[2].id,
        nameVi: "Trồng răng Implant (1 răng)",
        nameKo: "임플란트 (1개)",
        nameEn: "Dental Implant (1 tooth)",
        originalPrice: 2000000,
        discountedPrice: 1500000,
        beberiaPrice: 1200000,
        durationMinutes: 90,
        recoveryDays: 14,
        isPopular: true,
      },
    }),
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[2].id,
        categoryId: categories[2].id,
        nameVi: "Bọc sứ Veneer (1 răng)",
        nameKo: "라미네이트 (1개)",
        nameEn: "Porcelain Veneer (1 tooth)",
        originalPrice: 800000,
        discountedPrice: 600000,
        beberiaPrice: 500000,
        durationMinutes: 60,
        recoveryDays: 2,
        isPopular: true,
      },
    }),
    // K-Skin procedures
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[3].id,
        categoryId: categories[3].id,
        nameVi: "Trẻ hóa da bằng laser Pico",
        nameKo: "피코 레이저 피부 재생",
        nameEn: "Pico Laser Skin Rejuvenation",
        originalPrice: 500000,
        discountedPrice: 350000,
        durationMinutes: 30,
        recoveryDays: 1,
        isPopular: true,
      },
    }),
    // Hanbang procedures
    prisma.procedure.create({
      data: {
        hospitalId: hospitals[4].id,
        categoryId: categories[4].id,
        nameVi: "Gói châm cứu thẩm mỹ",
        nameKo: "미용 침술 패키지",
        nameEn: "Cosmetic Acupuncture Package",
        originalPrice: 300000,
        discountedPrice: 200000,
        beberiaPrice: 150000,
        durationMinutes: 60,
        recoveryDays: 0,
        isPopular: false,
      },
    }),
  ]);

  // Additional Services
  await Promise.all([
    prisma.additionalService.create({
      data: {
        type: "AIRPORT_PICKUP",
        nameVi: "Đón sân bay Incheon",
        nameKo: "인천공항 픽업",
        nameEn: "Incheon Airport Pickup",
        descriptionVi: "Dịch vụ đưa đón từ sân bay Incheon đến khách sạn hoặc bệnh viện",
        descriptionKo: "인천공항에서 호텔 또는 병원까지 픽업 서비스",
        descriptionEn: "Transfer service from Incheon Airport to hotel or hospital",
        price: 80000,
        options: { vehicleTypes: ["sedan", "van"], includesReturn: false },
      },
    }),
    prisma.additionalService.create({
      data: {
        type: "TRANSLATION",
        nameVi: "Phiên dịch viên Việt-Hàn",
        nameKo: "베트남어-한국어 통역사",
        nameEn: "Vietnamese-Korean Interpreter",
        descriptionVi: "Phiên dịch viên chuyên nghiệp đi cùng trong suốt quá trình khám",
        descriptionKo: "전문 통역사가 진료 과정에 동행",
        descriptionEn: "Professional interpreter accompanying during the entire visit",
        price: 150000,
        options: { duration: "full_day", languages: ["vi-ko", "vi-en"] },
      },
    }),
    prisma.additionalService.create({
      data: {
        type: "ACCOMMODATION",
        nameVi: "Khách sạn gần bệnh viện",
        nameKo: "병원 근처 호텔",
        nameEn: "Hotel Near Hospital",
        descriptionVi: "Đặt phòng khách sạn tiện lợi gần bệnh viện",
        descriptionKo: "병원 근처 편리한 호텔 예약",
        descriptionEn: "Convenient hotel booking near the hospital",
        price: 100000,
        options: { types: ["standard", "premium", "suite"] },
      },
    }),
    prisma.additionalService.create({
      data: {
        type: "POST_CARE",
        nameVi: "Chăm sóc sau phẫu thuật",
        nameKo: "수술 후 관리",
        nameEn: "Post-Surgery Care",
        descriptionVi: "Theo dõi và chăm sóc sức khỏe sau phẫu thuật tại Hàn Quốc",
        descriptionKo: "한국에서의 수술 후 건강 모니터링 및 관리",
        descriptionEn: "Health monitoring and care after surgery in Korea",
        price: 200000,
        options: { duration: ["3_days", "7_days", "14_days"] },
      },
    }),
  ]);

  // Service Packages
  const allServices = await prisma.additionalService.findMany();
  const pickupService = allServices.find((s) => s.type === "AIRPORT_PICKUP");
  const translationService = allServices.find((s) => s.type === "TRANSLATION");
  const accommodationService = allServices.find((s) => s.type === "ACCOMMODATION");
  const postCareService = allServices.find((s) => s.type === "POST_CARE");

  await Promise.all([
    prisma.servicePackage.create({
      data: {
        hospitalId: hospitals[0].id,
        nameVi: "Gói Thẩm mỹ Gangnam All-in-One",
        nameKo: "강남 성형 올인원 패키지",
        nameEn: "Gangnam Beauty All-in-One Package",
        descriptionVi: "Phẫu thuật thẩm mỹ tại Gangnam Beauty Clinic kèm đầy đủ dịch vụ hỗ trợ",
        descriptionKo: "강남 뷰티 클리닉 성형 수술 + 전체 지원 서비스 포함",
        descriptionEn: "Plastic surgery at Gangnam Beauty Clinic with full support services included",
        originalTotal: 6530000,
        packagePrice: 5200000,
        beberiaPrice: 4800000,
        isFeatured: true,
        items: {
          create: [
            ...(pickupService ? [{ serviceId: pickupService.id }] : []),
            ...(translationService ? [{ serviceId: translationService.id }] : []),
            ...(accommodationService ? [{ serviceId: accommodationService.id }] : []),
            ...(postCareService ? [{ serviceId: postCareService.id }] : []),
          ],
        },
      },
    }),
    prisma.servicePackage.create({
      data: {
        hospitalId: hospitals[1].id,
        nameVi: "Gói Mắt Seoul Bright",
        nameKo: "서울 브라이트 안과 패키지",
        nameEn: "Seoul Bright Eye Package",
        descriptionVi: "LASIK/LASEK tại Seoul Bright Eye + Đón sân bay + Phiên dịch + Lưu trú",
        descriptionKo: "서울 브라이트 안과 라식/라섹 + 공항 픽업 + 통역 + 숙소",
        descriptionEn: "LASIK/LASEK at Seoul Bright Eye + Airport Pickup + Translation + Stay",
        originalTotal: 2130000,
        packagePrice: 1800000,
        beberiaPrice: 1600000,
        isFeatured: true,
        items: {
          create: [
            ...(pickupService ? [{ serviceId: pickupService.id }] : []),
            ...(translationService ? [{ serviceId: translationService.id }] : []),
            ...(accommodationService ? [{ serviceId: accommodationService.id }] : []),
          ],
        },
      },
    }),
    prisma.servicePackage.create({
      data: {
        hospitalId: hospitals[2].id,
        nameVi: "Gói Nha khoa Premium",
        nameKo: "프리미엄 치과 패키지",
        nameEn: "Premium Dental Package",
        descriptionVi: "Trồng răng Implant tại Smile Dental + Dịch vụ hỗ trợ toàn diện",
        descriptionKo: "스마일 치과 임플란트 + 종합 지원 서비스",
        descriptionEn: "Dental Implant at Smile Dental + Comprehensive support services",
        originalTotal: 2530000,
        packagePrice: 2000000,
        beberiaPrice: 1800000,
        isFeatured: false,
        items: {
          create: [
            ...(pickupService ? [{ serviceId: pickupService.id }] : []),
            ...(translationService ? [{ serviceId: translationService.id }] : []),
            ...(accommodationService ? [{ serviceId: accommodationService.id }] : []),
            ...(postCareService ? [{ serviceId: postCareService.id }] : []),
          ],
        },
      },
    }),
  ]);

  // Promotions
  await Promise.all([
    prisma.promotion.create({
      data: {
        code: "BEBERIA2024",
        nameVi: "Ưu đãi thành viên Beberia",
        nameKo: "베베리아 회원 할인",
        nameEn: "Beberia Member Discount",
        descriptionVi: "Giảm 10% cho tất cả thành viên Beberia",
        descriptionKo: "베베리아 회원 전체 10% 할인",
        descriptionEn: "10% off for all Beberia members",
        discountType: "PERCENTAGE",
        discountValue: 10,
        beberiaOnly: true,
        requiredTier: "BEBERIA_MEMBER",
        validFrom: new Date("2024-01-01"),
        validTo: new Date("2025-12-31"),
        maxUsage: 1000,
        isActive: true,
      },
    }),
    prisma.promotion.create({
      data: {
        code: "WELCOME50",
        nameVi: "Ưu đãi chào mừng",
        nameKo: "웰컴 할인",
        nameEn: "Welcome Discount",
        descriptionVi: "Giảm ₩50,000 cho đặt lịch đầu tiên",
        descriptionKo: "첫 예약 ₩50,000 할인",
        descriptionEn: "₩50,000 off your first booking",
        discountType: "FIXED_AMOUNT",
        discountValue: 50000,
        beberiaOnly: false,
        validFrom: new Date("2024-01-01"),
        validTo: new Date("2025-12-31"),
        maxUsage: 500,
        isActive: true,
      },
    }),
  ]);

  console.log("Seed completed successfully!");
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${hospitals.length} hospitals`);
  console.log(`Created ${doctors.length} doctors`);
  console.log("Created procedures, services, packages, and promotions");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
