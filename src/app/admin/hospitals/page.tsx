import { getAllHospitals } from "@/lib/actions/admin";
import { HospitalActions } from "./hospital-actions";
import {
  Building2,
  Star,
  MessageSquare,
  Stethoscope,
  UserRound,
  CheckCircle,
  XCircle,
  Award,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  PLASTIC_SURGERY: "성형외과",
  OPHTHALMOLOGY: "안과",
  DENTISTRY: "치과",
  DERMATOLOGY: "피부과",
  ORIENTAL_MEDICINE: "한의원",
};

export default async function AdminHospitalsPage() {
  let hospitals: Awaited<ReturnType<typeof getAllHospitals>> = [];
  try {
    hospitals = await getAllHospitals();
  } catch {
    // DB connection error handled gracefully
  }

  const activeCount = hospitals.filter((h) => h.isActive).length;
  const partnerCount = hospitals.filter((h) => h.beberiaPartner).length;
  const featuredCount = hospitals.filter((h) => h.isFeatured).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">병원 관리</h1>
        <p className="text-muted-foreground">파트너 병원 관리 및 설정</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border p-3">
          <p className="text-xs text-muted-foreground">전체</p>
          <p className="text-xl font-bold">{hospitals.length}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <p className="text-xs text-muted-foreground">활성</p>
          </div>
          <p className="text-xl font-bold text-green-700">{activeCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3 text-pink-600" />
            <p className="text-xs text-muted-foreground">베베리아 파트너</p>
          </div>
          <p className="text-xl font-bold text-pink-700">{partnerCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-600" />
            <p className="text-xs text-muted-foreground">추천 병원</p>
          </div>
          <p className="text-xl font-bold text-yellow-700">{featuredCount}</p>
        </div>
      </div>

      {/* Hospital List */}
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">병원</th>
                <th className="px-4 py-3 text-left font-medium">카테고리</th>
                <th className="px-4 py-3 text-center font-medium">평점</th>
                <th className="px-4 py-3 text-center font-medium">예약</th>
                <th className="px-4 py-3 text-center font-medium">시술</th>
                <th className="px-4 py-3 text-center font-medium">의사</th>
                <th className="px-4 py-3 text-center font-medium">상태</th>
                <th className="px-4 py-3 text-center font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    등록된 병원이 없습니다
                  </td>
                </tr>
              ) : (
                hospitals.map((hospital) => (
                  <tr key={hospital.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{hospital.nameKo}</p>
                        <p className="text-xs text-muted-foreground">{hospital.nameVi}</p>
                        <div className="mt-1 flex items-center gap-1">
                          {hospital.beberiaPartner && (
                            <span className="rounded bg-pink-100 px-1.5 py-0.5 text-[10px] font-medium text-pink-700">
                              Beberia
                            </span>
                          )}
                          {hospital.isFeatured && (
                            <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-medium text-yellow-700">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {hospital.categories.map((cat) => (
                          <span
                            key={cat}
                            className="rounded bg-muted px-1.5 py-0.5 text-[10px]"
                          >
                            {categoryLabels[cat] || cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{hospital.ratingAvg.toFixed(1)}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        ({hospital.reviewCount})
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span>{hospital._count.bookings}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Stethoscope className="h-3 w-3 text-muted-foreground" />
                        <span>{hospital._count.procedures}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <UserRound className="h-3 w-3 text-muted-foreground" />
                        <span>{hospital._count.doctors}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {hospital.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                          <CheckCircle className="h-3 w-3" /> 활성
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                          <XCircle className="h-3 w-3" /> 비활성
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <HospitalActions
                        hospitalId={hospital.id}
                        isActive={hospital.isActive}
                        isFeatured={hospital.isFeatured}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
