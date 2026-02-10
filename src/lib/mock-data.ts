// =============================================================================
// Mock Data for Beberia - Korean Medical Tourism Platform
// Used as fallback when the database is not connected.
// All data is trilingual: Vietnamese (Vi), Korean (Ko), English (En).
// =============================================================================

// ---------------------------------------------------------------------------
// Shared hospital IDs and slugs
// ---------------------------------------------------------------------------
const HOSPITAL_IDS = {
  gangnamBeauty: "mock-hospital-1",
  seoulBrightEye: "mock-hospital-2",
  smileDental: "mock-hospital-3",
  kSkinDerma: "mock-hospital-4",
  hanbangOriental: "mock-hospital-5",
} as const;

// ---------------------------------------------------------------------------
// Base hospital data used by both listing and detail views
// ---------------------------------------------------------------------------
function baseHospitals() {
  const now = new Date().toISOString();

  return [
    {
      id: HOSPITAL_IDS.gangnamBeauty,
      slug: "gangnam-beauty-clinic",
      nameVi: "Phòng khám Thẩm mỹ Gangnam",
      nameKo: "강남뷰티클리닉",
      nameEn: "Gangnam Beauty Clinic",
      descriptionVi:
        "Phòng khám thẩm mỹ hàng đầu tại Gangnam chuyên về phẫu thuật tạo hình và chăm sóc da. Với hơn 15 năm kinh nghiệm, đội ngũ bác sĩ của chúng tôi đã thực hiện hơn 50.000 ca phẫu thuật thành công. Được tin tưởng bởi khách hàng từ hơn 30 quốc gia trên thế giới.",
      descriptionKo:
        "강남 최고의 성형외과 및 피부과 클리닉입니다. 15년 이상의 경험과 50,000건 이상의 성공적인 수술 경험을 보유하고 있으며, 전 세계 30개국 이상의 환자분들이 찾아오시는 신뢰할 수 있는 클리닉입니다.",
      descriptionEn:
        "Premier plastic surgery and dermatology clinic in Gangnam. With over 15 years of experience and more than 50,000 successful procedures, our team of board-certified surgeons is trusted by patients from over 30 countries worldwide.",
      categories: ["PLASTIC_SURGERY", "DERMATOLOGY"] as const,
      address: "서울특별시 강남구 테헤란로 123, 강남뷰티빌딩 3-5층",
      addressVi: "Tầng 3-5, Tòa nhà Gangnam Beauty, 123 Teheran-ro, Gangnam-gu, Seoul",
      district: "강남구",
      city: "Seoul",
      latitude: 37.5012,
      longitude: 127.0396,
      phone: "02-555-1234",
      website: "https://gangnambeauty.kr",
      operatingHours: {
        mon: "09:00-19:00",
        tue: "09:00-19:00",
        wed: "09:00-19:00",
        thu: "09:00-19:00",
        fri: "09:00-19:00",
        sat: "09:00-14:00",
        sun: "closed",
      },
      highlights: [
        "vietnamese_staff",
        "gangnam_location",
        "free_consultation",
        "airport_pickup",
        "post_surgery_care",
      ],
      ratingAvg: 4.9,
      reviewCount: 128,
      isFeatured: true,
      isActive: true,
      beberiaPartner: true,
      galleryUrls: [],
      thumbnailUrl: null,
      languagesSupported: ["vi", "ko", "en", "zh"],
      adminId: null,
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: HOSPITAL_IDS.seoulBrightEye,
      slug: "seoul-bright-eye",
      nameVi: "Nhãn khoa Seoul Bright",
      nameKo: "서울브라이트안과",
      nameEn: "Seoul Bright Eye Clinic",
      descriptionVi:
        "Trung tâm nhãn khoa chuyên về phẫu thuật LASIK, LASEK và cấy ghép thủy tinh thể. Sử dụng công nghệ laser mới nhất và thiết bị chẩn đoán tiên tiến nhất Hàn Quốc. Hơn 30.000 ca phẫu thuật mắt thành công.",
      descriptionKo:
        "라식, 라섹, 렌즈삽입술 전문 안과입니다. 최신 레이저 장비와 한국 최고의 진단 장비를 보유하고 있으며, 30,000건 이상의 성공적인 시력교정 수술을 시행했습니다.",
      descriptionEn:
        "Specialized ophthalmology center offering LASIK, LASEK and lens implant surgeries. Equipped with the latest laser technology and the most advanced diagnostic equipment in Korea. Over 30,000 successful eye surgeries performed.",
      categories: ["OPHTHALMOLOGY"] as const,
      address: "서울특별시 서초구 서초대로 456, 브라이트아이빌딩 7층",
      addressVi: "Tầng 7, Tòa nhà Bright Eye, 456 Seocho-daero, Seocho-gu, Seoul",
      district: "서초구",
      city: "Seoul",
      latitude: 37.4923,
      longitude: 127.0292,
      phone: "02-588-5678",
      website: "https://seoulbrighteye.kr",
      operatingHours: {
        mon: "08:30-18:00",
        tue: "08:30-18:00",
        wed: "08:30-18:00",
        thu: "08:30-18:00",
        fri: "08:30-18:00",
        sat: "09:00-13:00",
        sun: "closed",
      },
      highlights: [
        "vietnamese_staff",
        "latest_equipment",
        "free_consultation",
        "lifetime_warranty",
      ],
      ratingAvg: 4.8,
      reviewCount: 95,
      isFeatured: true,
      isActive: true,
      beberiaPartner: true,
      galleryUrls: [],
      thumbnailUrl: null,
      languagesSupported: ["vi", "ko", "en"],
      adminId: null,
      createdAt: "2024-02-10T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: HOSPITAL_IDS.smileDental,
      slug: "smile-dental-korea",
      nameVi: "Nha khoa Smile Dental Korea",
      nameKo: "스마일치과코리아",
      nameEn: "Smile Dental Korea",
      descriptionVi:
        "Phòng khám nha khoa cao cấp chuyên về cấy ghép implant, bọc răng sứ và chỉnh nha. Sử dụng công nghệ CAD/CAM kỹ thuật số để đảm bảo kết quả chính xác. Được chứng nhận bởi Hiệp hội Nha khoa Hàn Quốc.",
      descriptionKo:
        "임플란트, 세라믹 크라운, 교정 전문 프리미엄 치과입니다. 디지털 CAD/CAM 기술을 활용하여 정확한 결과를 보장하며, 대한치과의사협회 인증을 받았습니다.",
      descriptionEn:
        "Premium dental clinic specializing in implants, porcelain veneers, and orthodontics. Uses digital CAD/CAM technology for precision results. Certified by the Korean Dental Association.",
      categories: ["DENTISTRY"] as const,
      address: "서울특별시 강남구 압구정로 78, 스마일덴탈빌딩 2층",
      addressVi: "Tầng 2, Tòa nhà Smile Dental, 78 Apgujeong-ro, Gangnam-gu, Seoul",
      district: "강남구",
      city: "Seoul",
      latitude: 37.5271,
      longitude: 127.0286,
      phone: "02-511-9012",
      website: "https://smiledental.kr",
      operatingHours: {
        mon: "09:30-18:30",
        tue: "09:30-18:30",
        wed: "09:30-18:30",
        thu: "09:30-21:00",
        fri: "09:30-18:30",
        sat: "09:30-15:00",
        sun: "closed",
      },
      highlights: [
        "vietnamese_staff",
        "digital_cad_cam",
        "one_day_treatment",
        "gangnam_location",
      ],
      ratingAvg: 4.7,
      reviewCount: 76,
      isFeatured: true,
      isActive: true,
      beberiaPartner: true,
      galleryUrls: [],
      thumbnailUrl: null,
      languagesSupported: ["vi", "ko", "en", "zh"],
      adminId: null,
      createdAt: "2024-03-05T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: HOSPITAL_IDS.kSkinDerma,
      slug: "k-skin-dermatology",
      nameVi: "Phòng khám Da liễu K-Skin",
      nameKo: "K-스킨피부과",
      nameEn: "K-Skin Dermatology",
      descriptionVi:
        "Phòng khám da liễu chuyên về điều trị da bằng laser và các liệu trình chăm sóc da cao cấp. Chuyên gia trong điều trị nám, mụn, trẻ hóa da và các vấn đề da liễu phức tạp. Sử dụng thiết bị laser Pico thế hệ mới nhất.",
      descriptionKo:
        "레이저 피부 치료 및 프리미엄 스킨케어 전문 피부과입니다. 기미, 여드름, 피부 재생 등 복잡한 피부 문제 치료의 전문가이며, 최신 피코 레이저 장비를 사용합니다.",
      descriptionEn:
        "Dermatology clinic specializing in laser skin treatments and premium skincare. Expert in treating melasma, acne, skin rejuvenation, and complex dermatological conditions. Uses the latest generation Pico laser equipment.",
      categories: ["DERMATOLOGY"] as const,
      address: "서울특별시 강남구 선릉로 234, K-스킨빌딩 4층",
      addressVi: "Tầng 4, Tòa nhà K-Skin, 234 Seolleung-ro, Gangnam-gu, Seoul",
      district: "강남구",
      city: "Seoul",
      latitude: 37.5045,
      longitude: 127.0488,
      phone: "02-567-3456",
      website: "https://k-skin.kr",
      operatingHours: {
        mon: "10:00-19:00",
        tue: "10:00-19:00",
        wed: "10:00-19:00",
        thu: "10:00-19:00",
        fri: "10:00-19:00",
        sat: "10:00-15:00",
        sun: "closed",
      },
      highlights: [
        "pico_laser",
        "skin_analysis",
        "gangnam_location",
        "no_downtime_treatments",
      ],
      ratingAvg: 4.6,
      reviewCount: 62,
      isFeatured: true,
      isActive: true,
      beberiaPartner: false,
      galleryUrls: [],
      thumbnailUrl: null,
      languagesSupported: ["vi", "ko", "en"],
      adminId: null,
      createdAt: "2024-04-20T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: HOSPITAL_IDS.hanbangOriental,
      slug: "hanbang-oriental-clinic",
      nameVi: "Phòng khám Đông y Hanbang",
      nameKo: "한방한의원",
      nameEn: "Hanbang Oriental Medicine Clinic",
      descriptionVi:
        "Phòng khám Đông y truyền thống kết hợp y học cổ truyền Hàn Quốc với công nghệ hiện đại. Chuyên về châm cứu, thuốc bắc, giảm cân, điều trị đau mãn tính và chăm sóc da bằng phương pháp tự nhiên.",
      descriptionKo:
        "전통 한의학과 현대 기술을 결합한 한방 클리닉입니다. 침술, 한약, 다이어트, 만성 통증 치료 및 자연 피부 관리를 전문으로 합니다.",
      descriptionEn:
        "Traditional Korean medicine clinic combining ancient practices with modern technology. Specializes in acupuncture, herbal medicine, weight management, chronic pain treatment, and natural skincare.",
      categories: ["ORIENTAL_MEDICINE"] as const,
      address: "서울특별시 종로구 인사동길 56, 한방빌딩 1-2층",
      addressVi: "Tầng 1-2, Tòa nhà Hanbang, 56 Insadong-gil, Jongno-gu, Seoul",
      district: "종로구",
      city: "Seoul",
      latitude: 37.5735,
      longitude: 126.9858,
      phone: "02-733-7890",
      website: "https://hanbangclinic.kr",
      operatingHours: {
        mon: "09:00-18:00",
        tue: "09:00-18:00",
        wed: "09:00-18:00",
        thu: "09:00-18:00",
        fri: "09:00-18:00",
        sat: "09:00-13:00",
        sun: "closed",
      },
      highlights: [
        "vietnamese_staff",
        "traditional_medicine",
        "herbal_pharmacy",
        "insadong_location",
      ],
      ratingAvg: 4.5,
      reviewCount: 43,
      isFeatured: true,
      isActive: true,
      beberiaPartner: true,
      galleryUrls: [],
      thumbnailUrl: null,
      languagesSupported: ["vi", "ko", "en"],
      adminId: null,
      createdAt: "2024-05-12T00:00:00.000Z",
      updatedAt: now,
    },
  ];
}

// ---------------------------------------------------------------------------
// Doctors keyed by hospital ID
// ---------------------------------------------------------------------------
function doctorsByHospitalId() {
  return {
    [HOSPITAL_IDS.gangnamBeauty]: [
      {
        id: "mock-doctor-1",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        nameVi: "BS. Park Min-jun",
        nameKo: "박민준 원장",
        nameEn: "Dr. Park Min-jun",
        specialty: "성형외과",
        bioVi:
          "Chuyên gia phẫu thuật tạo hình mũi và mắt với hơn 20 năm kinh nghiệm. Tốt nghiệp Đại học Y Seoul và tu nghiệp tại Mỹ. Đã thực hiện hơn 15.000 ca phẫu thuật thành công.",
        bioKo:
          "코 및 눈 성형 전문의로 20년 이상의 경력을 보유하고 있습니다. 서울대학교 의과대학 졸업 후 미국에서 연수하였으며, 15,000건 이상의 성공적인 수술을 시행했습니다.",
        bioEn:
          "Specialist in rhinoplasty and blepharoplasty with over 20 years of experience. Graduate of Seoul National University Medical School with training in the United States. Has performed over 15,000 successful surgeries.",
        credentials: [
          "서울대학교 의과대학 졸업",
          "대한성형외과학회 정회원",
          "미국 UCLA 메디컬센터 연수",
          "성형외과 전문의 자격",
        ],
        photoUrl: null,
        ratingAvg: 4.9,
        reviewCount: 87,
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "mock-doctor-2",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        nameVi: "BS. Kim Soo-yeon",
        nameKo: "김수연 부원장",
        nameEn: "Dr. Kim Soo-yeon",
        specialty: "피부과",
        bioVi:
          "Chuyên gia da liễu với chuyên môn sâu về laser trị liệu và trẻ hóa da. Được đào tạo tại Đại học Yonsei và có nhiều công trình nghiên cứu quốc tế về chăm sóc da.",
        bioKo:
          "레이저 치료 및 피부 재생 전문 피부과 전문의입니다. 연세대학교 의과대학에서 교육을 받았으며, 피부 관리에 관한 다수의 국제 연구 논문을 발표했습니다.",
        bioEn:
          "Dermatology specialist with deep expertise in laser therapy and skin rejuvenation. Trained at Yonsei University with numerous international research publications on skincare.",
        credentials: [
          "연세대학교 의과대학 졸업",
          "대한피부과학회 정회원",
          "레이저 치료 전문 자격",
          "국제 피부과 학회 논문 발표",
        ],
        photoUrl: null,
        ratingAvg: 4.8,
        reviewCount: 41,
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
    ],
    [HOSPITAL_IDS.seoulBrightEye]: [
      {
        id: "mock-doctor-3",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        nameVi: "BS. Lee Jong-hyun",
        nameKo: "이종현 원장",
        nameEn: "Dr. Lee Jong-hyun",
        specialty: "안과",
        bioVi:
          "Chuyên gia phẫu thuật LASIK/LASEK với kinh nghiệm hơn 18 năm. Đã thực hiện hơn 20.000 ca phẫu thuật mắt. Từng đào tạo tại Bệnh viện Johns Hopkins, Mỹ.",
        bioKo:
          "라식/라섹 수술 전문의로 18년 이상의 경험을 보유하고 있습니다. 20,000건 이상의 시력교정 수술을 시행했으며, 미국 존스홉킨스 병원에서 연수했습니다.",
        bioEn:
          "LASIK/LASEK surgery specialist with over 18 years of experience. Has performed over 20,000 vision correction surgeries. Trained at Johns Hopkins Hospital, USA.",
        credentials: [
          "고려대학교 의과대학 졸업",
          "대한안과학회 정회원",
          "미국 존스홉킨스 병원 연수",
          "안과 전문의 자격",
        ],
        photoUrl: null,
        ratingAvg: 4.9,
        reviewCount: 65,
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-02-10T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "mock-doctor-4",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        nameVi: "BS. Choi Yuna",
        nameKo: "최유나 부원장",
        nameEn: "Dr. Choi Yuna",
        specialty: "안과",
        bioVi:
          "Chuyên gia về cấy ghép thủy tinh thể và điều trị bệnh lý võng mạc. Tốt nghiệp Đại học Y Kyung Hee với nhiều nghiên cứu về phẫu thuật mắt tối thiểu xâm lấn.",
        bioKo:
          "렌즈삽입술 및 망막 질환 치료 전문의입니다. 경희대학교 의과대학을 졸업하였으며, 최소침습 안과 수술에 관한 다수의 연구를 수행했습니다.",
        bioEn:
          "Specialist in lens implant surgery and retinal disease treatment. Graduate of Kyung Hee University Medical School with extensive research on minimally invasive eye surgery.",
        credentials: [
          "경희대학교 의과대학 졸업",
          "대한안과학회 정회원",
          "렌즈삽입술 전문 자격",
          "최소침습 수술 연구",
        ],
        photoUrl: null,
        ratingAvg: 4.7,
        reviewCount: 30,
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-02-10T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
    ],
    [HOSPITAL_IDS.smileDental]: [
      {
        id: "mock-doctor-5",
        hospitalId: HOSPITAL_IDS.smileDental,
        nameVi: "BS. Jung Tae-woo",
        nameKo: "정태우 원장",
        nameEn: "Dr. Jung Tae-woo",
        specialty: "치과",
        bioVi:
          "Chuyên gia cấy ghép implant và phục hình răng sứ với hơn 15 năm kinh nghiệm. Là thành viên của Hiệp hội Implant Quốc tế (ICOI) và đã đào tạo tại Đức.",
        bioKo:
          "임플란트 및 보철 전문의로 15년 이상의 경력을 보유하고 있습니다. 국제구강임플란트학회(ICOI) 회원이며, 독일에서 연수했습니다.",
        bioEn:
          "Implant and prosthetic dentistry specialist with over 15 years of experience. Member of the International Congress of Oral Implantologists (ICOI), trained in Germany.",
        credentials: [
          "경북대학교 치과대학 졸업",
          "대한치과의사협회 정회원",
          "ICOI 국제 회원",
          "독일 프라이부르크 대학 연수",
        ],
        photoUrl: null,
        ratingAvg: 4.8,
        reviewCount: 52,
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-03-05T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "mock-doctor-6",
        hospitalId: HOSPITAL_IDS.smileDental,
        nameVi: "BS. Yoon Hee-jin",
        nameKo: "윤희진 부원장",
        nameEn: "Dr. Yoon Hee-jin",
        specialty: "치과",
        bioVi:
          "Chuyên gia chỉnh nha và răng sứ thẩm mỹ. Tốt nghiệp Đại học Nha khoa Seoul với bằng thạc sĩ về chỉnh nha. Chuyên về thiết kế nụ cười kỹ thuật số.",
        bioKo:
          "교정 및 심미보철 전문의입니다. 서울대학교 치과대학에서 교정학 석사를 취득하였으며, 디지털 스마일 디자인을 전문으로 합니다.",
        bioEn:
          "Orthodontics and cosmetic dentistry specialist. Master's degree in orthodontics from Seoul National University Dental School. Specializes in digital smile design.",
        credentials: [
          "서울대학교 치과대학 석사",
          "대한교정학회 정회원",
          "디지털 스마일 디자인 자격",
          "심미보철 전문의",
        ],
        photoUrl: null,
        ratingAvg: 4.7,
        reviewCount: 24,
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-03-05T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
    ],
    [HOSPITAL_IDS.kSkinDerma]: [
      {
        id: "mock-doctor-7",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        nameVi: "BS. Han Seo-jin",
        nameKo: "한서진 원장",
        nameEn: "Dr. Han Seo-jin",
        specialty: "피부과",
        bioVi:
          "Chuyên gia laser Pico và điều trị nám da với hơn 12 năm kinh nghiệm. Tốt nghiệp Đại học Y Korea và là tác giả của nhiều bài nghiên cứu về laser trị liệu.",
        bioKo:
          "피코 레이저 및 기미 치료 전문의로 12년 이상의 경력을 보유하고 있습니다. 고려대학교 의과대학을 졸업하였으며, 레이저 치료에 관한 다수의 연구 논문을 발표했습니다.",
        bioEn:
          "Pico laser and melasma treatment specialist with over 12 years of experience. Graduate of Korea University Medical School and author of numerous research papers on laser therapy.",
        credentials: [
          "고려대학교 의과대학 졸업",
          "대한피부과학회 정회원",
          "피코 레이저 전문 자격",
          "레이저 치료 연구 논문 다수",
        ],
        photoUrl: null,
        ratingAvg: 4.7,
        reviewCount: 40,
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-04-20T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "mock-doctor-8",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        nameVi: "BS. Shin Mi-rae",
        nameKo: "신미래 부원장",
        nameEn: "Dr. Shin Mi-rae",
        specialty: "피부과",
        bioVi:
          "Chuyên về trẻ hóa da và điều trị mụn. Kinh nghiệm 10 năm trong điều trị các vấn đề da liễu bằng phương pháp kết hợp laser và liệu trình chăm sóc da.",
        bioKo:
          "피부 재생 및 여드름 치료 전문의입니다. 레이저와 스킨케어를 결합한 피부 문제 치료에 10년의 경험을 보유하고 있습니다.",
        bioEn:
          "Specialist in skin rejuvenation and acne treatment. 10 years of experience treating skin conditions with combined laser and skincare approaches.",
        credentials: [
          "이화여자대학교 의과대학 졸업",
          "대한피부과학회 정회원",
          "피부 재생 전문 자격",
          "여드름 치료 전문",
        ],
        photoUrl: null,
        ratingAvg: 4.5,
        reviewCount: 22,
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-04-20T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
    ],
    [HOSPITAL_IDS.hanbangOriental]: [
      {
        id: "mock-doctor-9",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        nameVi: "BS. Seo Dong-wook",
        nameKo: "서동욱 원장",
        nameEn: "Dr. Seo Dong-wook",
        specialty: "한의학",
        bioVi:
          "Chuyên gia y học cổ truyền Hàn Quốc với hơn 25 năm kinh nghiệm. Tốt nghiệp Đại học Đông Y Kyung Hee. Chuyên về châm cứu, thuốc bắc và điều trị đau mãn tính.",
        bioKo:
          "25년 이상의 경력을 보유한 한의학 전문가입니다. 경희대학교 한의과대학을 졸업하였으며, 침술, 한약, 만성 통증 치료를 전문으로 합니다.",
        bioEn:
          "Traditional Korean medicine expert with over 25 years of experience. Graduate of Kyung Hee University of Korean Medicine. Specializes in acupuncture, herbal medicine, and chronic pain treatment.",
        credentials: [
          "경희대학교 한의과대학 졸업",
          "대한한의사협회 정회원",
          "침술 전문 자격",
          "한약 처방 전문의",
        ],
        photoUrl: null,
        ratingAvg: 4.6,
        reviewCount: 30,
        isActive: true,
        displayOrder: 1,
        createdAt: "2024-05-12T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "mock-doctor-10",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        nameVi: "BS. Baek Ji-hye",
        nameKo: "백지혜 부원장",
        nameEn: "Dr. Baek Ji-hye",
        specialty: "한의학",
        bioVi:
          "Chuyên gia về giảm cân bằng đông y và chăm sóc da tự nhiên. 15 năm kinh nghiệm kết hợp phương pháp đông y truyền thống với nghiên cứu hiện đại.",
        bioKo:
          "한방 다이어트 및 자연 피부 관리 전문의입니다. 전통 한의학과 현대 연구를 결합한 15년의 경험을 보유하고 있습니다.",
        bioEn:
          "Specialist in oriental medicine weight management and natural skincare. 15 years of experience combining traditional Korean medicine with modern research.",
        credentials: [
          "동국대학교 한의과대학 졸업",
          "대한한의사협회 정회원",
          "한방 다이어트 전문",
          "자연 피부 관리 연구",
        ],
        photoUrl: null,
        ratingAvg: 4.4,
        reviewCount: 13,
        isActive: true,
        displayOrder: 2,
        createdAt: "2024-05-12T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Procedures keyed by hospital ID
// ---------------------------------------------------------------------------
function proceduresByHospitalId() {
  const now = new Date().toISOString();

  return {
    [HOSPITAL_IDS.gangnamBeauty]: [
      {
        id: "mock-procedure-1",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        categoryId: "mock-category-plastic",
        nameVi: "Nâng mũi cấu trúc",
        nameKo: "구조적 코성형",
        nameEn: "Structural Rhinoplasty",
        descriptionVi:
          "Phẫu thuật nâng mũi cấu trúc toàn diện sử dụng sụn tự thân. Bao gồm tư vấn trước phẫu thuật, mô phỏng 3D, phẫu thuật và theo dõi sau phẫu thuật.",
        descriptionKo:
          "자가 연골을 사용한 종합 구조적 코성형 수술입니다. 수술 전 상담, 3D 시뮬레이션, 수술 및 수술 후 관리가 포함됩니다.",
        descriptionEn:
          "Comprehensive structural rhinoplasty using autologous cartilage. Includes pre-surgery consultation, 3D simulation, surgery, and post-operative care.",
        originalPrice: 5000000,
        discountedPrice: 3500000,
        beberiaPrice: 2800000,
        durationMinutes: 120,
        recoveryDays: 14,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-plastic",
          slug: "plastic-surgery",
          nameVi: "Phẫu thuật thẩm mỹ",
          nameKo: "성형외과",
          nameEn: "Plastic Surgery",
          icon: "scissors",
          parentId: null,
          order: 1,
        },
      },
      {
        id: "mock-procedure-2",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        categoryId: "mock-category-plastic",
        nameVi: "Cắt mí mắt trên + dưới",
        nameKo: "상하안검 성형",
        nameEn: "Upper + Lower Blepharoplasty",
        descriptionVi:
          "Phẫu thuật cắt mí mắt trên và dưới giúp đôi mắt to hơn và trẻ trung hơn. Kỹ thuật vi phẫu không để lại sẹo, kết quả tự nhiên.",
        descriptionKo:
          "더 크고 젊은 눈매를 위한 상하안검 성형 수술입니다. 흉터 없는 미세수술 기법으로 자연스러운 결과를 제공합니다.",
        descriptionEn:
          "Upper and lower eyelid surgery for larger, more youthful eyes. Microsurgical technique leaves no visible scars with natural-looking results.",
        originalPrice: 3000000,
        discountedPrice: 2100000,
        beberiaPrice: 1800000,
        durationMinutes: 60,
        recoveryDays: 7,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-plastic",
          slug: "plastic-surgery",
          nameVi: "Phẫu thuật thẩm mỹ",
          nameKo: "성형외과",
          nameEn: "Plastic Surgery",
          icon: "scissors",
          parentId: null,
          order: 1,
        },
      },
      {
        id: "mock-procedure-pico",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        categoryId: "mock-category-derma",
        nameVi: "Laser Pico",
        nameKo: "피코 레이저",
        nameEn: "Pico Laser",
        descriptionVi:
          "Điều trị da bằng laser Pico thế hệ mới nhất, hiệu quả trong trị nám, tàn nhang, xóa xăm và trẻ hóa da. Không gây đau, không thời gian nghỉ dưỡng.",
        descriptionKo:
          "최신 피코 레이저로 기미, 주근깨, 문신 제거, 피부 재생에 효과적입니다. 통증이 없고 다운타임이 없습니다.",
        descriptionEn:
          "Latest generation Pico laser treatment effective for melasma, freckles, tattoo removal, and skin rejuvenation. Painless with no downtime.",
        originalPrice: 500000,
        discountedPrice: 350000,
        beberiaPrice: null,
        durationMinutes: 30,
        recoveryDays: 1,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-01-15T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-derma",
          slug: "dermatology",
          nameVi: "Da liễu",
          nameKo: "피부과",
          nameEn: "Dermatology",
          icon: "sparkles",
          parentId: null,
          order: 4,
        },
      },
    ],
    [HOSPITAL_IDS.seoulBrightEye]: [
      {
        id: "mock-procedure-3",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        categoryId: "mock-category-eye",
        nameVi: "Phẫu thuật LASIK",
        nameKo: "라식 수술",
        nameEn: "LASIK Surgery",
        descriptionVi:
          "Phẫu thuật chỉnh tật khúc xạ bằng laser LASIK thế hệ mới nhất. Bao gồm khám mắt toàn diện, phẫu thuật hai mắt và theo dõi sau phẫu thuật trong 1 năm.",
        descriptionKo:
          "최신 라식 레이저를 이용한 굴절 교정 수술입니다. 종합 안과 검진, 양안 수술, 1년간 수술 후 관리가 포함됩니다.",
        descriptionEn:
          "Refractive correction surgery using the latest LASIK laser. Includes comprehensive eye examination, bilateral surgery, and 1-year post-operative follow-up.",
        originalPrice: 2500000,
        discountedPrice: 1800000,
        beberiaPrice: 1500000,
        durationMinutes: 30,
        recoveryDays: 3,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-02-10T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-eye",
          slug: "ophthalmology",
          nameVi: "Nhãn khoa",
          nameKo: "안과",
          nameEn: "Ophthalmology",
          icon: "eye",
          parentId: null,
          order: 2,
        },
      },
      {
        id: "mock-procedure-lasek",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        categoryId: "mock-category-eye",
        nameVi: "Phẫu thuật LASEK",
        nameKo: "라섹 수술",
        nameEn: "LASEK Surgery",
        descriptionVi:
          "Phẫu thuật chỉnh tật khúc xạ bằng laser LASEK, phù hợp với bệnh nhân có giác mạc mỏng. Bao gồm khám toàn diện và theo dõi sau phẫu thuật.",
        descriptionKo:
          "얇은 각막을 가진 환자에게 적합한 라섹 레이저 굴절 교정 수술입니다. 종합 검진 및 수술 후 관리가 포함됩니다.",
        descriptionEn:
          "LASEK laser refractive surgery suitable for patients with thin corneas. Includes comprehensive examination and post-operative care.",
        originalPrice: 2200000,
        discountedPrice: 1600000,
        beberiaPrice: 1300000,
        durationMinutes: 30,
        recoveryDays: 5,
        isPopular: false,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-02-10T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-eye",
          slug: "ophthalmology",
          nameVi: "Nhãn khoa",
          nameKo: "안과",
          nameEn: "Ophthalmology",
          icon: "eye",
          parentId: null,
          order: 2,
        },
      },
    ],
    [HOSPITAL_IDS.smileDental]: [
      {
        id: "mock-procedure-4",
        hospitalId: HOSPITAL_IDS.smileDental,
        categoryId: "mock-category-dental",
        nameVi: "Cấy ghép Implant",
        nameKo: "임플란트",
        nameEn: "Dental Implant",
        descriptionVi:
          "Cấy ghép implant nha khoa sử dụng vật liệu Titanium cao cấp từ Đức. Bao gồm chẩn đoán CT 3D, cấy ghép, trụ và mão sứ. Bảo hành 10 năm.",
        descriptionKo:
          "독일산 고급 티타늄 소재를 사용한 치과 임플란트입니다. 3D CT 진단, 임플란트 식립, 어버트먼트 및 크라운이 포함됩니다. 10년 보증.",
        descriptionEn:
          "Dental implant using premium German Titanium material. Includes 3D CT diagnosis, implant placement, abutment, and porcelain crown. 10-year warranty.",
        originalPrice: 2000000,
        discountedPrice: 1500000,
        beberiaPrice: 1200000,
        durationMinutes: 90,
        recoveryDays: 14,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-03-05T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-dental",
          slug: "dentistry",
          nameVi: "Nha khoa",
          nameKo: "치과",
          nameEn: "Dentistry",
          icon: "tooth",
          parentId: null,
          order: 3,
        },
      },
      {
        id: "mock-procedure-6",
        hospitalId: HOSPITAL_IDS.smileDental,
        categoryId: "mock-category-dental",
        nameVi: "Răng sứ Veneer",
        nameKo: "포세린 비니어",
        nameEn: "Porcelain Veneer",
        descriptionVi:
          "Dán mặt sứ Veneer thẩm mỹ siêu mỏng cho răng đẹp tự nhiên. Sử dụng công nghệ CAD/CAM để đảm bảo độ chính xác và thẩm mỹ tối đa. Giá cho 1 răng.",
        descriptionKo:
          "자연스러운 아름다운 치아를 위한 초박형 포세린 비니어입니다. CAD/CAM 기술을 사용하여 최대의 정확도와 심미성을 보장합니다. 1개 기준 가격.",
        descriptionEn:
          "Ultra-thin porcelain veneer for naturally beautiful teeth. Uses CAD/CAM technology for maximum precision and aesthetics. Price per tooth.",
        originalPrice: 800000,
        discountedPrice: 600000,
        beberiaPrice: 500000,
        durationMinutes: 60,
        recoveryDays: 2,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-03-05T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-dental",
          slug: "dentistry",
          nameVi: "Nha khoa",
          nameKo: "치과",
          nameEn: "Dentistry",
          icon: "tooth",
          parentId: null,
          order: 3,
        },
      },
      {
        id: "mock-procedure-ortho",
        hospitalId: HOSPITAL_IDS.smileDental,
        categoryId: "mock-category-dental",
        nameVi: "Niềng răng trong suốt",
        nameKo: "투명 교정",
        nameEn: "Clear Aligners",
        descriptionVi:
          "Niềng răng trong suốt thẩm mỹ không mắc cài. Liệu trình 6-12 tháng tùy theo mức độ lệch. Bao gồm toàn bộ bộ khay niềng.",
        descriptionKo:
          "브래킷 없는 투명 교정 시스템입니다. 부정교합 정도에 따라 6-12개월 치료 기간. 전체 교정 키트 포함.",
        descriptionEn:
          "Invisible clear aligner system without brackets. 6-12 month treatment depending on severity. Full aligner kit included.",
        originalPrice: 4000000,
        discountedPrice: 3200000,
        beberiaPrice: 2800000,
        durationMinutes: 30,
        recoveryDays: 0,
        isPopular: false,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-03-05T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-dental",
          slug: "dentistry",
          nameVi: "Nha khoa",
          nameKo: "치과",
          nameEn: "Dentistry",
          icon: "tooth",
          parentId: null,
          order: 3,
        },
      },
    ],
    [HOSPITAL_IDS.kSkinDerma]: [
      {
        id: "mock-procedure-5",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        categoryId: "mock-category-derma",
        nameVi: "Laser Pico",
        nameKo: "피코 레이저",
        nameEn: "Pico Laser",
        descriptionVi:
          "Điều trị da bằng laser Pico thế hệ mới nhất, hiệu quả trong trị nám, tàn nhang, xóa xăm và trẻ hóa da. Không gây đau, không thời gian nghỉ dưỡng.",
        descriptionKo:
          "최신 피코 레이저로 기미, 주근깨, 문신 제거, 피부 재생에 효과적입니다. 통증이 없고 다운타임이 없습니다.",
        descriptionEn:
          "Latest generation Pico laser treatment effective for melasma, freckles, tattoo removal, and skin rejuvenation. Painless with no downtime.",
        originalPrice: 500000,
        discountedPrice: 350000,
        beberiaPrice: null,
        durationMinutes: 30,
        recoveryDays: 1,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-04-20T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-derma",
          slug: "dermatology",
          nameVi: "Da liễu",
          nameKo: "피부과",
          nameEn: "Dermatology",
          icon: "sparkles",
          parentId: null,
          order: 4,
        },
      },
      {
        id: "mock-procedure-aqua",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        categoryId: "mock-category-derma",
        nameVi: "Aqua Peel + Tái tạo da",
        nameKo: "아쿠아필 + 피부재생",
        nameEn: "Aqua Peel + Skin Regeneration",
        descriptionVi:
          "Liệu trình chăm sóc da toàn diện bao gồm Aqua Peel làm sạch sâu kết hợp liệu trình tái tạo da bằng tế bào gốc.",
        descriptionKo:
          "아쿠아필 딥클렌징과 줄기세포 피부재생 프로그램을 결합한 종합 스킨케어 프로그램입니다.",
        descriptionEn:
          "Comprehensive skincare treatment combining Aqua Peel deep cleansing with stem cell skin regeneration therapy.",
        originalPrice: 400000,
        discountedPrice: 300000,
        beberiaPrice: null,
        durationMinutes: 60,
        recoveryDays: 0,
        isPopular: false,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-04-20T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-derma",
          slug: "dermatology",
          nameVi: "Da liễu",
          nameKo: "피부과",
          nameEn: "Dermatology",
          icon: "sparkles",
          parentId: null,
          order: 4,
        },
      },
    ],
    [HOSPITAL_IDS.hanbangOriental]: [
      {
        id: "mock-procedure-acupuncture",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        categoryId: "mock-category-oriental",
        nameVi: "Châm cứu trị liệu",
        nameKo: "치료 침술",
        nameEn: "Therapeutic Acupuncture",
        descriptionVi:
          "Liệu trình châm cứu truyền thống Hàn Quốc để điều trị đau mãn tính, căng thẳng và các vấn đề sức khỏe khác. Bao gồm tư vấn và 10 buổi điều trị.",
        descriptionKo:
          "만성 통증, 스트레스 및 기타 건강 문제 치료를 위한 전통 한국식 침술 프로그램입니다. 상담 및 10회 치료가 포함됩니다.",
        descriptionEn:
          "Traditional Korean acupuncture therapy for chronic pain, stress, and other health issues. Includes consultation and 10 treatment sessions.",
        originalPrice: 1500000,
        discountedPrice: 1200000,
        beberiaPrice: 1000000,
        durationMinutes: 60,
        recoveryDays: 0,
        isPopular: true,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-05-12T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-oriental",
          slug: "oriental-medicine",
          nameVi: "Y học cổ truyền",
          nameKo: "한의학",
          nameEn: "Oriental Medicine",
          icon: "leaf",
          parentId: null,
          order: 5,
        },
      },
      {
        id: "mock-procedure-herbal",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        categoryId: "mock-category-oriental",
        nameVi: "Thuốc bắc giảm cân",
        nameKo: "한방 다이어트 한약",
        nameEn: "Herbal Weight Management",
        descriptionVi:
          "Liệu trình giảm cân bằng thuốc bắc truyền thống kết hợp tư vấn dinh dưỡng. Bao gồm 1 tháng thuốc bắc và 4 buổi tư vấn.",
        descriptionKo:
          "전통 한약과 영양 상담을 결합한 한방 다이어트 프로그램입니다. 1개월 한약 및 4회 상담이 포함됩니다.",
        descriptionEn:
          "Traditional herbal medicine weight management program combined with nutritional counseling. Includes 1-month herbal prescription and 4 consultations.",
        originalPrice: 800000,
        discountedPrice: 650000,
        beberiaPrice: 550000,
        durationMinutes: 30,
        recoveryDays: 0,
        isPopular: false,
        isActive: true,
        thumbnailUrl: null,
        beforeAfterUrls: null,
        createdAt: "2024-05-12T00:00:00.000Z",
        updatedAt: now,
        category: {
          id: "mock-category-oriental",
          slug: "oriental-medicine",
          nameVi: "Y học cổ truyền",
          nameKo: "한의학",
          nameEn: "Oriental Medicine",
          icon: "leaf",
          parentId: null,
          order: 5,
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Reviews keyed by hospital ID
// ---------------------------------------------------------------------------
function reviewsByHospitalId() {
  return {
    [HOSPITAL_IDS.gangnamBeauty]: [
      {
        id: "mock-review-1",
        userId: "mock-user-1",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        doctorId: "mock-doctor-1",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 5,
        ratingFacilities: 4,
        title: "Kết quả tuyệt vời - mũi rất tự nhiên!",
        content:
          "Tôi đã phẫu thuật nâng mũi tại Gangnam Beauty Clinic và hoàn toàn hài lòng với kết quả. Bác sĩ Park rất tận tâm và có tay nghề cao. Nhân viên biết tiếng Việt nên giao tiếp rất dễ dàng. Beberia đã giúp tôi được giá tốt hơn nhiều so với giá niêm yết.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: "Cảm ơn bạn đã tin tưởng và lựa chọn Gangnam Beauty Clinic! Chúng tôi rất vui khi bạn hài lòng với kết quả.",
        hospitalReplyAt: "2024-12-20T00:00:00.000Z",
        likeCount: 24,
        createdAt: "2024-12-15T00:00:00.000Z",
        updatedAt: "2024-12-20T00:00:00.000Z",
        user: {
          id: "mock-user-1",
          name: "Nguyen Thi Mai",
          avatar: null,
        },
      },
      {
        id: "mock-review-2",
        userId: "mock-user-2",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        doctorId: "mock-doctor-2",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 5,
        title: "Da mịn màng sau laser Pico",
        content:
          "Mình làm laser Pico để trị nám và rất hài lòng. Bác sĩ Kim rất nhẹ nhàng, không đau chút nào. Sau 3 buổi da mình sáng hẳn lên. Phòng khám rất sạch sẽ và hiện đại.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 18,
        createdAt: "2025-01-05T00:00:00.000Z",
        updatedAt: "2025-01-05T00:00:00.000Z",
        user: {
          id: "mock-user-2",
          name: "Tran Van Duc",
          avatar: null,
        },
      },
      {
        id: "mock-review-3",
        userId: "mock-user-3",
        hospitalId: HOSPITAL_IDS.gangnamBeauty,
        doctorId: "mock-doctor-1",
        bookingId: null,
        rating: 4,
        ratingService: 4,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 4,
        title: "Cắt mí mắt - hồi phục nhanh",
        content:
          "Phẫu thuật cắt mí rất nhanh, chỉ khoảng 1 tiếng. Kết quả rất tự nhiên, bạn bè tôi đều khen đẹp. Thời gian hồi phục khoảng 1 tuần như bác sĩ nói. Chỉ tiếc là thời gian chờ hơi lâu.",
        beforeImages: [],
        afterImages: [],
        isVerified: false,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 11,
        createdAt: "2025-01-20T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
        user: {
          id: "mock-user-3",
          name: "Le Hoang Anh",
          avatar: null,
        },
      },
    ],
    [HOSPITAL_IDS.seoulBrightEye]: [
      {
        id: "mock-review-4",
        userId: "mock-user-4",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        doctorId: "mock-doctor-3",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 5,
        ratingFacilities: 5,
        title: "LASIK thay doi cuoc doi toi!",
        content:
          "Tôi bị cận 8 độ và đã phẫu thuật LASIK tại Seoul Bright Eye. Kết quả thật tuyệt vời - thị lực 20/20 chỉ sau 1 ngày! Bác sĩ Lee rất chuyên nghiệp và giải thích rõ ràng từng bước. Giá qua Beberia rẻ hơn nhiều.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: "Chúng tôi rất vui vì bạn hài lòng! Hẹn gặp lại trong buổi tái khám 6 tháng nhé.",
        hospitalReplyAt: "2024-11-20T00:00:00.000Z",
        likeCount: 32,
        createdAt: "2024-11-15T00:00:00.000Z",
        updatedAt: "2024-11-20T00:00:00.000Z",
        user: {
          id: "mock-user-4",
          name: "Pham Minh Tu",
          avatar: null,
        },
      },
      {
        id: "mock-review-5",
        userId: "mock-user-5",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        doctorId: "mock-doctor-4",
        bookingId: null,
        rating: 5,
        ratingService: 4,
        ratingResult: 5,
        ratingCommunication: 5,
        ratingFacilities: 4,
        title: "Rat hai long voi ket qua",
        content:
          "Mình đã từng lo lắng rất nhiều trước khi phẫu thuật nhưng bác sĩ Choi đã tư vấn rất kỹ và trấn an mình. Ca phẫu thuật diễn ra rất nhanh và không đau. Bây giờ mình không cần đeo kính nữa!",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 15,
        createdAt: "2025-01-10T00:00:00.000Z",
        updatedAt: "2025-01-10T00:00:00.000Z",
        user: {
          id: "mock-user-5",
          name: "Vo Thi Lan",
          avatar: null,
        },
      },
      {
        id: "mock-review-6",
        userId: "mock-user-6",
        hospitalId: HOSPITAL_IDS.seoulBrightEye,
        doctorId: "mock-doctor-3",
        bookingId: null,
        rating: 4,
        ratingService: 4,
        ratingResult: 4,
        ratingCommunication: 4,
        ratingFacilities: 4,
        title: "Dich vu tot, ket qua on",
        content:
          "Phẫu thuật LASEK ổn, thị lực cải thiện rõ rệt. Quá trình hồi phục mất khoảng 5 ngày, hơi khó chịu 2 ngày đầu nhưng sau đó tốt dần. Nhân viên phòng khám rất thân thiện.",
        beforeImages: [],
        afterImages: [],
        isVerified: false,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 8,
        createdAt: "2024-10-25T00:00:00.000Z",
        updatedAt: "2024-10-25T00:00:00.000Z",
        user: {
          id: "mock-user-6",
          name: "Do Quang Huy",
          avatar: null,
        },
      },
    ],
    [HOSPITAL_IDS.smileDental]: [
      {
        id: "mock-review-7",
        userId: "mock-user-7",
        hospitalId: HOSPITAL_IDS.smileDental,
        doctorId: "mock-doctor-5",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 5,
        ratingFacilities: 5,
        title: "Implant chat luong cao",
        content:
          "Bác sĩ Jung rất giỏi và tận tâm. Mình cấy 2 implant và kết quả rất tốt, không đau và ăn nhai bình thường. Công nghệ CAD/CAM rất hiện đại, mão răng vừa khít ngay lần đầu.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: "Cảm ơn bạn! Đừng quên đến tái khám sau 6 tháng nhé.",
        hospitalReplyAt: "2024-09-15T00:00:00.000Z",
        likeCount: 20,
        createdAt: "2024-09-10T00:00:00.000Z",
        updatedAt: "2024-09-15T00:00:00.000Z",
        user: {
          id: "mock-user-7",
          name: "Bui Thanh Ha",
          avatar: null,
        },
      },
      {
        id: "mock-review-8",
        userId: "mock-user-8",
        hospitalId: HOSPITAL_IDS.smileDental,
        doctorId: "mock-doctor-6",
        bookingId: null,
        rating: 4,
        ratingService: 4,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 4,
        title: "Rang su rat dep",
        content:
          "Mình làm 8 cái veneer và kết quả rất đẹp, nụ cười của mình thay đổi hoàn toàn. Bác sĩ Yoon thiết kế nụ cười rất tỉ mỉ và phù hợp với khuôn mặt mình. Giá hợp lý qua Beberia.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 14,
        createdAt: "2024-11-28T00:00:00.000Z",
        updatedAt: "2024-11-28T00:00:00.000Z",
        user: {
          id: "mock-user-8",
          name: "Hoang Thi Ngoc",
          avatar: null,
        },
      },
      {
        id: "mock-review-9",
        userId: "mock-user-9",
        hospitalId: HOSPITAL_IDS.smileDental,
        doctorId: "mock-doctor-5",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 5,
        title: "Se quay lai lan sau!",
        content:
          "Phòng khám rất hiện đại và sạch sẽ. Bác sĩ Jung cấy implant rất nhanh và chính xác. Nhân viên biết tiếng Việt giúp mình yên tâm hơn nhiều. Chắc chắn sẽ giới thiệu bạn bè.",
        beforeImages: [],
        afterImages: [],
        isVerified: false,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 9,
        createdAt: "2025-01-15T00:00:00.000Z",
        updatedAt: "2025-01-15T00:00:00.000Z",
        user: {
          id: "mock-user-9",
          name: "Dang Van Long",
          avatar: null,
        },
      },
    ],
    [HOSPITAL_IDS.kSkinDerma]: [
      {
        id: "mock-review-10",
        userId: "mock-user-10",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        doctorId: "mock-doctor-7",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 4,
        title: "Tri nam hieu qua",
        content:
          "Mình bị nám lâu năm và đã thử nhiều cách nhưng không hết. Sau khi điều trị 5 buổi Pico Laser tại K-Skin, nám giảm đáng kể. Bác sĩ Han rất am hiểu về da và tư vấn rất tận tình.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 16,
        createdAt: "2024-08-20T00:00:00.000Z",
        updatedAt: "2024-08-20T00:00:00.000Z",
        user: {
          id: "mock-user-10",
          name: "Ly Thi Huong",
          avatar: null,
        },
      },
      {
        id: "mock-review-11",
        userId: "mock-user-11",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        doctorId: "mock-doctor-8",
        bookingId: null,
        rating: 4,
        ratingService: 4,
        ratingResult: 4,
        ratingCommunication: 4,
        ratingFacilities: 5,
        title: "Da dep hon han",
        content:
          "Chương trình Aqua Peel + tái tạo da rất tuyệt. Da mình mềm mịn và sáng hơn sau khi làm. Bác sĩ Shin rất nhẹ nhàng và giải thích kỹ về quy trình.",
        beforeImages: [],
        afterImages: [],
        isVerified: false,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 7,
        createdAt: "2024-12-05T00:00:00.000Z",
        updatedAt: "2024-12-05T00:00:00.000Z",
        user: {
          id: "mock-user-11",
          name: "Ngo Minh Chau",
          avatar: null,
        },
      },
      {
        id: "mock-review-12",
        userId: "mock-user-12",
        hospitalId: HOSPITAL_IDS.kSkinDerma,
        doctorId: "mock-doctor-7",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 4,
        ratingCommunication: 5,
        ratingFacilities: 5,
        title: "Phong kham hien dai",
        content:
          "Phòng khám rất đẹp và hiện đại. Thiết bị laser Pico mới nhất, nhân viên chuyên nghiệp. Mình rất ấn tượng với quy trình phân tích da bằng máy trước khi điều trị.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: "Cảm ơn bạn rất nhiều! Hẹn gặp lại bạn trong buổi điều trị tiếp theo.",
        hospitalReplyAt: "2025-01-25T00:00:00.000Z",
        likeCount: 12,
        createdAt: "2025-01-22T00:00:00.000Z",
        updatedAt: "2025-01-25T00:00:00.000Z",
        user: {
          id: "mock-user-12",
          name: "Truong Quoc Bao",
          avatar: null,
        },
      },
    ],
    [HOSPITAL_IDS.hanbangOriental]: [
      {
        id: "mock-review-13",
        userId: "mock-user-13",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        doctorId: "mock-doctor-9",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 4,
        ratingCommunication: 5,
        ratingFacilities: 4,
        title: "Cham cuu tri dau lung hieu qua",
        content:
          "Mình bị đau lưng mãn tính và đã thử nhiều cách. Sau 5 buổi châm cứu tại Hanbang, cơn đau giảm hẳn. Bác sĩ Seo rất tận tâm, giải thích rõ về phương pháp điều trị bằng đông y.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 10,
        createdAt: "2024-10-10T00:00:00.000Z",
        updatedAt: "2024-10-10T00:00:00.000Z",
        user: {
          id: "mock-user-13",
          name: "Vu Thi Thanh",
          avatar: null,
        },
      },
      {
        id: "mock-review-14",
        userId: "mock-user-14",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        doctorId: "mock-doctor-10",
        bookingId: null,
        rating: 4,
        ratingService: 4,
        ratingResult: 4,
        ratingCommunication: 5,
        ratingFacilities: 4,
        title: "Thuoc bac giam can tot",
        content:
          "Mình dùng thuốc bắc giảm cân của bác sĩ Baek và giảm được 5kg trong 1 tháng. Thuốc uống dễ, không có tác dụng phụ. Bác sĩ tư vấn dinh dưỡng rất kỹ.",
        beforeImages: [],
        afterImages: [],
        isVerified: false,
        hospitalReply: null,
        hospitalReplyAt: null,
        likeCount: 6,
        createdAt: "2024-11-05T00:00:00.000Z",
        updatedAt: "2024-11-05T00:00:00.000Z",
        user: {
          id: "mock-user-14",
          name: "Dinh Thi Hoa",
          avatar: null,
        },
      },
      {
        id: "mock-review-15",
        userId: "mock-user-15",
        hospitalId: HOSPITAL_IDS.hanbangOriental,
        doctorId: "mock-doctor-9",
        bookingId: null,
        rating: 5,
        ratingService: 5,
        ratingResult: 5,
        ratingCommunication: 4,
        ratingFacilities: 4,
        title: "Trai nghiem dong y tuyet voi",
        content:
          "Lần đầu trải nghiệm đông y Hàn Quốc và rất ấn tượng. Phòng khám ở Insadong rất đẹp và yên tĩnh. Châm cứu kết hợp thuốc bắc giúp mình ngủ ngon hơn và bớt stress.",
        beforeImages: [],
        afterImages: [],
        isVerified: true,
        hospitalReply: "Cảm ơn bạn! Đông y Hàn Quốc kết hợp nhiều phương pháp để mang lại hiệu quả tốt nhất. Hẹn gặp lại!",
        hospitalReplyAt: "2025-02-02T00:00:00.000Z",
        likeCount: 8,
        createdAt: "2025-01-30T00:00:00.000Z",
        updatedAt: "2025-02-02T00:00:00.000Z",
        user: {
          id: "mock-user-15",
          name: "Mai Xuan Truong",
          avatar: null,
        },
      },
    ],
  };
}

// =============================================================================
// PUBLIC EXPORTS
// =============================================================================

/**
 * Returns 5 featured hospitals for the homepage.
 * Matches the shape returned by `getFeaturedHospitals()` in hospitals.ts,
 * including a `procedures` array and `_count` field.
 */
export function getMockFeaturedHospitals() {
  const hospitals = baseHospitals();
  const allProcedures = proceduresByHospitalId();

  return hospitals.map((h) => ({
    ...h,
    procedures: (allProcedures[h.id] ?? [])
      .filter((p) => p.isPopular && p.isActive)
      .slice(0, 3),
    _count: { reviews: h.reviewCount },
  }));
}

/**
 * Returns all 5 hospitals for the listing page.
 * Same shape as `getMockFeaturedHospitals` but semantically "all" rather than
 * only featured ones.
 */
export function getMockAllHospitals() {
  const hospitals = baseHospitals();
  const allProcedures = proceduresByHospitalId();

  return {
    hospitals: hospitals.map((h) => ({
      ...h,
      procedures: (allProcedures[h.id] ?? [])
        .filter((p) => p.isActive)
        .slice(0, 3),
      _count: { reviews: h.reviewCount, favorites: 0 },
    })),
    total: hospitals.length,
    page: 1,
    pageSize: 10,
    hasMore: false,
  };
}

/**
 * Returns 6 popular procedures for the homepage.
 * Matches the shape returned by `getPopularProcedures()` in procedures.ts,
 * including a nested `hospital` select and full `category`.
 */
export function getMockPopularProcedures() {
  const hospitals = baseHospitals();
  const allProcedures = proceduresByHospitalId();

  // Flatten and pick the 6 canonical popular procedures in the requested order
  const popularIds = [
    "mock-procedure-1",  // Structural Rhinoplasty
    "mock-procedure-2",  // Upper+Lower Blepharoplasty
    "mock-procedure-3",  // LASIK Surgery
    "mock-procedure-4",  // Dental Implant
    "mock-procedure-5",  // Pico Laser (k-skin version)
    "mock-procedure-6",  // Porcelain Veneer
  ];

  const flat = Object.values(allProcedures).flat();

  return popularIds.map((pid) => {
    const proc = flat.find((p) => p.id === pid)!;
    const hosp = hospitals.find((h) => h.id === proc.hospitalId)!;

    return {
      ...proc,
      hospital: {
        id: hosp.id,
        slug: hosp.slug,
        nameVi: hosp.nameVi,
        nameKo: hosp.nameKo,
        nameEn: hosp.nameEn,
        beberiaPartner: hosp.beberiaPartner,
      },
    };
  });
}

/**
 * Returns a full hospital detail by slug.
 * Matches the shape returned by `getHospitalBySlug()` in hospitals.ts,
 * including `doctors`, `procedures` (with `category`), `reviews` (with `user`),
 * and `_count`.
 */
export function getMockHospitalBySlug(slug: string) {
  const hospitals = baseHospitals();
  const hospital = hospitals.find((h) => h.slug === slug);

  if (!hospital) return null;

  const doctors = doctorsByHospitalId()[hospital.id] ?? [];
  const procedures = proceduresByHospitalId()[hospital.id] ?? [];
  const reviews = reviewsByHospitalId()[hospital.id] ?? [];

  return {
    ...hospital,
    doctors,
    procedures: procedures.sort((a, b) => {
      if (a.isPopular !== b.isPopular) return a.isPopular ? -1 : 1;
      return a.originalPrice - b.originalPrice;
    }),
    reviews: reviews.slice(0, 10),
    _count: {
      reviews: hospital.reviewCount,
      favorites: 0,
    },
  };
}

/**
 * Returns 3 service packages.
 * Matches the shape returned by `getServicePackages()` / `getFeaturedPackages()`
 * in services.ts, including nested `hospital` select and `items` with `service`.
 */
export function getMockServicePackages() {
  const hospitals = baseHospitals();
  const now = new Date().toISOString();

  const gangnam = hospitals.find((h) => h.id === HOSPITAL_IDS.gangnamBeauty)!;
  const eye = hospitals.find((h) => h.id === HOSPITAL_IDS.seoulBrightEye)!;
  const dental = hospitals.find((h) => h.id === HOSPITAL_IDS.smileDental)!;

  const additionalServices = getMockAdditionalServices();
  const airportService = additionalServices.find((s) => s.type === "AIRPORT_PICKUP")!;
  const translationService = additionalServices.find((s) => s.type === "TRANSLATION")!;
  const accommodationService = additionalServices.find((s) => s.type === "ACCOMMODATION")!;
  const postCareService = additionalServices.find((s) => s.type === "POST_CARE")!;

  return [
    {
      id: "mock-package-1",
      hospitalId: HOSPITAL_IDS.gangnamBeauty,
      nameVi: "Trọn gói Thẩm mỹ Gangnam",
      nameKo: "강남 뷰티 올인원 패키지",
      nameEn: "Gangnam Beauty All-in-One",
      descriptionVi:
        "Gói dịch vụ trọn gói bao gồm phẫu thuật nâng mũi cấu trúc + cắt mí mắt + đưa đón sân bay + phiên dịch tiếng Việt + khách sạn 5 đêm + chăm sóc sau phẫu thuật.",
      descriptionKo:
        "구조적 코성형 + 쌍꺼풀 수술 + 공항 픽업 + 베트남어 통역 + 5박 숙박 + 수술 후 관리를 포함한 올인원 패키지입니다.",
      descriptionEn:
        "All-in-one package including structural rhinoplasty + blepharoplasty + airport pickup + Vietnamese interpreter + 5-night accommodation + post-surgery care.",
      originalTotal: 6530000,
      packagePrice: 5200000,
      beberiaPrice: 4800000,
      thumbnailUrl: null,
      isActive: true,
      isFeatured: true,
      createdAt: "2024-06-01T00:00:00.000Z",
      updatedAt: now,
      hospital: {
        id: gangnam.id,
        slug: gangnam.slug,
        nameVi: gangnam.nameVi,
        nameKo: gangnam.nameKo,
        nameEn: gangnam.nameEn,
        thumbnailUrl: gangnam.thumbnailUrl,
        ratingAvg: gangnam.ratingAvg,
        reviewCount: gangnam.reviewCount,
      },
      items: [
        {
          id: "mock-pkg-item-1",
          packageId: "mock-package-1",
          serviceId: airportService.id,
          service: airportService,
        },
        {
          id: "mock-pkg-item-2",
          packageId: "mock-package-1",
          serviceId: translationService.id,
          service: translationService,
        },
        {
          id: "mock-pkg-item-3",
          packageId: "mock-package-1",
          serviceId: accommodationService.id,
          service: accommodationService,
        },
        {
          id: "mock-pkg-item-4",
          packageId: "mock-package-1",
          serviceId: postCareService.id,
          service: postCareService,
        },
      ],
    },
    {
      id: "mock-package-2",
      hospitalId: HOSPITAL_IDS.seoulBrightEye,
      nameVi: "Gói Mắt Seoul Bright",
      nameKo: "서울 브라이트 아이 패키지",
      nameEn: "Seoul Bright Eye Package",
      descriptionVi:
        "Gói dịch vụ phẫu thuật LASIK bao gồm khám mắt toàn diện + phẫu thuật LASIK hai mắt + đưa đón sân bay + phiên dịch + 3 đêm khách sạn.",
      descriptionKo:
        "종합 안과 검진 + 양안 라식 수술 + 공항 픽업 + 통역 + 3박 숙박을 포함한 아이 패키지입니다.",
      descriptionEn:
        "Eye package including comprehensive eye exam + bilateral LASIK surgery + airport pickup + interpreter + 3-night accommodation.",
      originalTotal: 2130000,
      packagePrice: 1800000,
      beberiaPrice: 1600000,
      thumbnailUrl: null,
      isActive: true,
      isFeatured: true,
      createdAt: "2024-07-15T00:00:00.000Z",
      updatedAt: now,
      hospital: {
        id: eye.id,
        slug: eye.slug,
        nameVi: eye.nameVi,
        nameKo: eye.nameKo,
        nameEn: eye.nameEn,
        thumbnailUrl: eye.thumbnailUrl,
        ratingAvg: eye.ratingAvg,
        reviewCount: eye.reviewCount,
      },
      items: [
        {
          id: "mock-pkg-item-5",
          packageId: "mock-package-2",
          serviceId: airportService.id,
          service: airportService,
        },
        {
          id: "mock-pkg-item-6",
          packageId: "mock-package-2",
          serviceId: translationService.id,
          service: translationService,
        },
        {
          id: "mock-pkg-item-7",
          packageId: "mock-package-2",
          serviceId: accommodationService.id,
          service: accommodationService,
        },
      ],
    },
    {
      id: "mock-package-3",
      hospitalId: HOSPITAL_IDS.smileDental,
      nameVi: "Gói Nha khoa Cao cấp",
      nameKo: "프리미엄 치과 패키지",
      nameEn: "Premium Dental Package",
      descriptionVi:
        "Gói nha khoa cao cấp bao gồm cấy ghép 1 implant + 4 veneer sứ + đưa đón sân bay + phiên dịch + 3 đêm khách sạn + chăm sóc sau điều trị.",
      descriptionKo:
        "임플란트 1개 + 포세린 비니어 4개 + 공항 픽업 + 통역 + 3박 숙박 + 치료 후 관리를 포함한 프리미엄 치과 패키지입니다.",
      descriptionEn:
        "Premium dental package including 1 implant + 4 porcelain veneers + airport pickup + interpreter + 3-night accommodation + post-treatment care.",
      originalTotal: 2530000,
      packagePrice: 2000000,
      beberiaPrice: 1800000,
      thumbnailUrl: null,
      isActive: true,
      isFeatured: true,
      createdAt: "2024-08-20T00:00:00.000Z",
      updatedAt: now,
      hospital: {
        id: dental.id,
        slug: dental.slug,
        nameVi: dental.nameVi,
        nameKo: dental.nameKo,
        nameEn: dental.nameEn,
        thumbnailUrl: dental.thumbnailUrl,
        ratingAvg: dental.ratingAvg,
        reviewCount: dental.reviewCount,
      },
      items: [
        {
          id: "mock-pkg-item-8",
          packageId: "mock-package-3",
          serviceId: airportService.id,
          service: airportService,
        },
        {
          id: "mock-pkg-item-9",
          packageId: "mock-package-3",
          serviceId: translationService.id,
          service: translationService,
        },
        {
          id: "mock-pkg-item-10",
          packageId: "mock-package-3",
          serviceId: accommodationService.id,
          service: accommodationService,
        },
        {
          id: "mock-pkg-item-11",
          packageId: "mock-package-3",
          serviceId: postCareService.id,
          service: postCareService,
        },
      ],
    },
  ];
}

/**
 * Returns 4 additional services (airport pickup, translation, accommodation, post-care).
 * Matches the `AdditionalService` Prisma model shape.
 */
export function getMockAdditionalServices() {
  const now = new Date().toISOString();

  return [
    {
      id: "mock-service-1",
      type: "AIRPORT_PICKUP" as const,
      nameVi: "Đưa đón sân bay",
      nameKo: "공항 픽업",
      nameEn: "Airport Pickup",
      descriptionVi:
        "Dịch vụ đưa đón từ sân bay Incheon đến khách sạn/bệnh viện bằng xe riêng. Nhân viên chào đón tại cổng đến với bảng tên. Bao gồm cả chiều đi và chiều về.",
      descriptionKo:
        "인천공항에서 호텔/병원까지 전용 차량 픽업 서비스입니다. 도착 게이트에서 이름표를 든 직원이 맞이합니다. 왕복 포함.",
      descriptionEn:
        "Private car pickup service from Incheon Airport to hotel/hospital. Staff greets you at the arrival gate with a name board. Round-trip included.",
      price: 80000,
      options: {
        vehicles: ["sedan", "suv", "van"],
        includesReturn: true,
      },
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: "mock-service-2",
      type: "TRANSLATION" as const,
      nameVi: "Phiên dịch tiếng Việt",
      nameKo: "베트남어 통역",
      nameEn: "Vietnamese Translation",
      descriptionVi:
        "Phiên dịch viên chuyên nghiệp tiếng Việt-Hàn đi cùng trong suốt quá trình tư vấn và điều trị. Hỗ trợ giao tiếp với bác sĩ và nhân viên bệnh viện.",
      descriptionKo:
        "상담 및 치료 과정 전반에 걸쳐 동행하는 전문 베트남어-한국어 통역 서비스입니다. 의사 및 병원 직원과의 소통을 지원합니다.",
      descriptionEn:
        "Professional Vietnamese-Korean interpreter accompanying you throughout the consultation and treatment process. Assists with communication with doctors and hospital staff.",
      price: 150000,
      options: {
        languages: ["vi-ko", "vi-en"],
        perDay: true,
      },
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: "mock-service-3",
      type: "ACCOMMODATION" as const,
      nameVi: "Khách sạn",
      nameKo: "숙박",
      nameEn: "Accommodation",
      descriptionVi:
        "Đặt phòng khách sạn gần bệnh viện với mức giá ưu đãi. Phòng tiêu chuẩn với đầy đủ tiện nghi, bao gồm Wi-Fi và bữa sáng. Giá mỗi đêm.",
      descriptionKo:
        "병원 근처 호텔 예약을 특별 가격으로 제공합니다. Wi-Fi와 조식이 포함된 풀옵션 스탠다드 룸. 1박 기준 가격.",
      descriptionEn:
        "Hotel booking near the hospital at a special rate. Standard room with full amenities including Wi-Fi and breakfast. Price per night.",
      price: 100000,
      options: {
        roomTypes: ["standard", "deluxe", "suite"],
        perNight: true,
        includesBreakfast: true,
      },
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: "mock-service-4",
      type: "POST_CARE" as const,
      nameVi: "Chăm sóc sau phẫu thuật",
      nameKo: "수술 후 관리",
      nameEn: "Post-Surgery Care",
      descriptionVi:
        "Dịch vụ chăm sóc sau phẫu thuật bao gồm thay băng, rửa vết thương, theo dõi hồi phục và liên lạc với bác sĩ. Nhân viên y tế đến tận khách sạn.",
      descriptionKo:
        "드레싱 교체, 상처 세척, 회복 모니터링, 의사 연락을 포함한 수술 후 관리 서비스입니다. 의료진이 호텔로 직접 방문합니다.",
      descriptionEn:
        "Post-surgery care service including bandage change, wound cleaning, recovery monitoring, and doctor communication. Medical staff visits your hotel.",
      price: 200000,
      options: {
        includesNurse: true,
        visitsPerDay: 1,
        doctorOnCall: true,
      },
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: now,
    },
  ];
}

// ============= Community Posts =============
export function getMockCommunityPosts(type?: string) {
  const now = new Date();
  const past = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

  const posts = [
    {
      id: "mock-post-1", userId: "mock-user-1", type: "REVIEW" as const,
      title: "Kinh nghiệm phẫu thuật đường viền hàm tại Hàn Quốc",
      content: "Xin chào các chị em! Mình vừa hoàn thành ca phẫu thuật đường viền hàm V-line tại Gangnam Beauty. Chia sẻ kinh nghiệm cho ai đang cần tham khảo...",
      images: [] as string[], likeCount: 45, commentCount: 12, viewCount: 320, isPinned: false, isPublished: true,
      user: { id: "mock-user-1", name: "Nguyễn Thị Hoa", avatar: null, isBeberiaMember: true },
      _count: { comments: 12 },
      createdAt: past(10), updatedAt: past(10),
    },
    {
      id: "mock-post-2", userId: "mock-user-2", type: "QA" as const,
      title: "Nên chọn LASIK hay SMILE? Ai có kinh nghiệm chia sẻ giúp",
      content: "Mình đang muốn phẫu thuật mắt nhưng phân vân giữa LASIK và SMILE. Ai đã trải qua cho mình xin ý kiến với ạ.",
      images: [] as string[], likeCount: 23, commentCount: 8, viewCount: 189, isPinned: false, isPublished: true,
      user: { id: "mock-user-2", name: "Trần Minh Anh", avatar: null, isBeberiaMember: true },
      _count: { comments: 8 },
      createdAt: past(5), updatedAt: past(3),
    },
    {
      id: "mock-post-3", userId: "mock-user-3", type: "BEFORE_AFTER" as const,
      title: "Before/After cắt mí mắt - 3 tháng sau",
      content: "Chia sẻ ảnh before/after cắt mí mắt tại Banobagi. Sau 3 tháng mắt đã hoàn toàn tự nhiên. Rất hài lòng với kết quả!",
      images: [] as string[], likeCount: 67, commentCount: 15, viewCount: 512, isPinned: false, isPublished: true,
      user: { id: "mock-user-3", name: "Lê Phương Thảo", avatar: null, isBeberiaMember: false },
      _count: { comments: 15 },
      createdAt: past(7), updatedAt: past(7),
    },
    {
      id: "mock-post-4", userId: "mock-user-4", type: "DISCUSSION" as const,
      title: "Tips du lịch y tế Hàn Quốc - Chuẩn bị gì trước khi đi?",
      content: "Mình đã đi Hàn Quốc 3 lần để điều trị da liễu. Chia sẻ một số tips cho các chị em...",
      images: [] as string[], likeCount: 34, commentCount: 6, viewCount: 267, isPinned: true, isPublished: true,
      user: { id: "mock-user-4", name: "Phạm Thanh Tâm", avatar: null, isBeberiaMember: true },
      _count: { comments: 6 },
      createdAt: past(20), updatedAt: past(18),
    },
    {
      id: "mock-post-5", userId: "mock-user-5", type: "QA" as const,
      title: "Chi phí trồng răng Implant ở Hàn Quốc bao nhiêu?",
      content: "Mình muốn hỏi chi phí trồng 2 răng Implant ở Hàn Quốc. Thành viên Beberia có giảm giá không ạ?",
      images: [] as string[], likeCount: 19, commentCount: 5, viewCount: 145, isPinned: false, isPublished: true,
      user: { id: "mock-user-5", name: "Đỗ Văn Hùng", avatar: null, isBeberiaMember: false },
      _count: { comments: 5 },
      createdAt: past(3), updatedAt: past(2),
    },
  ];

  if (type) return { posts: posts.filter((p) => p.type === type), total: posts.filter((p) => p.type === type).length };
  return { posts, total: posts.length };
}

// ============= Procedure Categories =============
export function getMockProcedureCategories() {
  return [
    { id: "mock-cat-1", slug: "plastic-surgery", nameVi: "Phẫu thuật thẩm mỹ", nameKo: "성형외과", nameEn: "Plastic Surgery", icon: "scissors", parentId: null, order: 1, children: [], _count: { procedures: 8 } },
    { id: "mock-cat-2", slug: "ophthalmology", nameVi: "Nhãn khoa", nameKo: "안과", nameEn: "Ophthalmology", icon: "eye", parentId: null, order: 2, children: [], _count: { procedures: 4 } },
    { id: "mock-cat-3", slug: "dentistry", nameVi: "Nha khoa", nameKo: "치과", nameEn: "Dentistry", icon: "smile", parentId: null, order: 3, children: [], _count: { procedures: 5 } },
    { id: "mock-cat-4", slug: "dermatology", nameVi: "Da liễu", nameKo: "피부과", nameEn: "Dermatology", icon: "sparkles", parentId: null, order: 4, children: [], _count: { procedures: 4 } },
    { id: "mock-cat-5", slug: "oriental-medicine", nameVi: "Y học cổ truyền", nameKo: "한의학", nameEn: "Oriental Medicine", icon: "leaf", parentId: null, order: 5, children: [], _count: { procedures: 3 } },
  ];
}

// ============= Districts =============
export function getMockDistricts() {
  return ["강남구", "서초구", "종로구", "마포구", "용산구"];
}
