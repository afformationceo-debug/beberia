"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProcedureSelector } from "@/components/booking/procedure-selector";
import { DoctorSelector } from "@/components/booking/doctor-selector";
import { ServiceSelector } from "@/components/booking/service-selector";
import { BookingSummary } from "@/components/booking/booking-summary";
import { DateTimePicker } from "@/components/booking/date-time-picker";
import { getLocalizedField } from "@/lib/i18n-helpers";
import { createBooking, validatePromoCode } from "@/lib/actions/bookings";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, Loader2, PartyPopper, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
const steps = ["procedures", "schedule", "services", "information", "review"] as const;

interface BookingFlowProps {
  hospital: any;
  additionalServices: any[];
  locale: Locale;
}

export function BookingFlow({
  hospital,
  additionalServices,
  locale,
}: BookingFlowProps) {
  const t = useTranslations("booking");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProcedureIds, setSelectedProcedureIds] = useState<string[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [passportName, setPassportName] = useState("");
  const [phone, setPhone] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [bookingResult, setBookingResult] = useState<{
    bookingNumber: string;
  } | null>(null);
  const [error, setError] = useState("");

  const hospitalName = getLocalizedField(hospital, "name", locale);

  function toggleProcedure(id: string) {
    setSelectedProcedureIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function toggleService(id: string) {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function canGoNext(): boolean {
    switch (currentStep) {
      case 0:
        return selectedProcedureIds.length > 0;
      case 1:
        return selectedDate !== null;
      case 2:
        return true;
      case 3:
        return passportName.trim().length > 0 && phone.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  }

  async function handleApplyPromo() {
    if (!promoCode.trim()) return;
    const result = await validatePromoCode(promoCode.trim());
    setPromoValid(result.valid);
    if (result.valid) {
      // Calculate discount
      const subtotal = (hospital.procedures as any[])
        .filter((p: any) => selectedProcedureIds.includes(p.id))
        .reduce((sum: number, p: any) => sum + (p.discountedPrice || p.originalPrice), 0);

      let discount = 0;
      if (result.discountType === "PERCENTAGE") {
        discount = Math.floor(subtotal * ((result.discountValue || 0) / 100));
        if (result.maxDiscount) {
          discount = Math.min(discount, result.maxDiscount);
        }
      } else {
        discount = result.discountValue || 0;
      }
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
    }
  }

  function handleSubmit() {
    setError("");
    startTransition(async () => {
      const result = await createBooking({
        hospitalId: hospital.id,
        doctorId: selectedDoctorId || undefined,
        procedures: selectedProcedureIds.map((id) => ({ procedureId: id })),
        serviceIds: selectedServiceIds.length > 0 ? selectedServiceIds : undefined,
        preferredDate: selectedDate || undefined,
        preferredTime: selectedTime || undefined,
        passportName: passportName || undefined,
        phone: phone || undefined,
        arrivalDate: arrivalDate || undefined,
        departureDate: departureDate || undefined,
        flightNumber: flightNumber || undefined,
        promotionCode: promoValid ? promoCode : undefined,
        notes: notes || undefined,
      });

      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }

      if ("data" in result && result.data) {
        setBookingResult({
          bookingNumber: result.data.bookingNumber,
        });
      }
    });
  }

  // ===== Booking Confirmed =====
  if (bookingResult) {
    return (
      <div className="relative flex flex-col items-center py-12 text-center overflow-hidden">
        {/* Confetti-style decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[10%] h-2 w-2 rotate-12 rounded-sm bg-pink-300 opacity-60" />
          <div className="absolute left-[25%] top-[5%] h-1.5 w-3 -rotate-45 rounded-full bg-yellow-300 opacity-50" />
          <div className="absolute right-[15%] top-[8%] h-2 w-2 rotate-45 rounded-sm bg-blue-300 opacity-60" />
          <div className="absolute right-[30%] top-[15%] h-1.5 w-1.5 rounded-full bg-green-300 opacity-50" />
          <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 -rotate-12 rounded-full bg-violet-300 opacity-50" />
          <div className="absolute right-[10%] top-[22%] h-2 w-3 rotate-[30deg] rounded-sm bg-orange-300 opacity-40" />
          <div className="absolute left-[40%] top-[3%] h-1 w-2 rotate-90 rounded-full bg-primary/30" />
          <div className="absolute right-[40%] top-[12%] h-2 w-2 rounded-full bg-pink-200 opacity-50" />
        </div>

        {/* Success icon with animation ring */}
        <div className="relative">
          <div className="absolute -inset-2 animate-ping rounded-full bg-green-200 opacity-20" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-100">
            <PartyPopper className="h-10 w-10 text-green-600" />
          </div>
        </div>

        <h2 className="mt-6 text-2xl font-bold">{t("confirmation.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{hospitalName}</p>

        {/* Booking number with gradient background */}
        <div className="mt-6 w-full max-w-xs rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-violet-50 px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {t("confirmation.bookingNumber")}
          </p>
          <p className="mt-1 text-2xl font-bold tracking-widest text-primary">
            {bookingResult.bookingNumber}
          </p>
        </div>

        <div className="mt-8 w-full space-y-3">
          <Button className="w-full bg-gradient-to-r from-primary to-primary/80 shadow-lg" asChild>
            <Link href="/my/bookings">{t("confirmation.nextSteps")}</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/hospitals/${hospital.slug}`}>{hospitalName}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border" asChild>
            <Link href={`/hospitals/${hospital.slug}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {hospital.thumbnailUrl ? (
              <img
                src={hospital.thumbnailUrl}
                alt={hospitalName}
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-muted"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-2 ring-primary/10">
                <Sparkles className="h-5 w-5 text-primary/60" />
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold">{t("title")}</h1>
              <p className="text-xs text-muted-foreground">{hospitalName}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 h-0.5 rounded-full bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Animated ring for active step */}
                  {i === currentStep && (
                    <div className="absolute -inset-1.5 animate-pulse rounded-full bg-primary/20" />
                  )}
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                      i < currentStep
                        ? "bg-green-500 text-white shadow-sm"
                        : i === currentStep
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md"
                          : "border-2 border-dashed border-muted-foreground/30 bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                </div>
                <span
                  className={`mt-1.5 text-[10px] font-medium transition-colors ${
                    i <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t(`steps.${step}`)}
                </span>
              </div>
              {/* Connecting line between steps */}
              {i < steps.length - 1 && (
                <div className="relative mx-1 mb-5 h-0.5 flex-1">
                  {/* Background line */}
                  <div className="absolute inset-0 rounded-full bg-muted" />
                  {/* Progress line */}
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-500 to-primary transition-all duration-500 ${
                      i < currentStep ? "w-full" : i === currentStep ? "w-0" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Procedures */}
      {currentStep === 0 && (
        <div>
          <h2 className="mb-3 font-semibold">{t("selectProcedure")}</h2>
          <ProcedureSelector
            procedures={hospital.procedures}
            selectedIds={selectedProcedureIds}
            onToggle={toggleProcedure}
            locale={locale}
          />
          {selectedProcedureIds.length === 0 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {t("selectProcedure")}
            </p>
          )}
        </div>
      )}

      {/* Step 2: Date & Doctor */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="mb-3 font-semibold">{t("selectDate")}</h2>
            <DateTimePicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>
          <div>
            <h2 className="mb-3 font-semibold">{t("selectDoctor")}</h2>
            <DoctorSelector
              doctors={hospital.doctors}
              selectedId={selectedDoctorId}
              onSelect={setSelectedDoctorId}
              locale={locale}
            />
          </div>
        </div>
      )}

      {/* Step 3: Services */}
      {currentStep === 2 && (
        <div>
          <h2 className="mb-3 font-semibold">{t("additionalServices")}</h2>
          {additionalServices.length > 0 ? (
            <ServiceSelector
              services={additionalServices}
              selectedIds={selectedServiceIds}
              onToggle={toggleService}
              locale={locale}
            />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No additional services available
            </p>
          )}
        </div>
      )}

      {/* Step 4: Information */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h2 className="font-semibold">{t("yourInfo")}</h2>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>{t("passportName")} *</Label>
              <Input
                value={passportName}
                onChange={(e) => setPassportName(e.target.value)}
                placeholder="NGUYEN VAN A"
              />
            </div>
            <div className="space-y-1.5">
              <Label>{t("phone")} *</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+84 xxx xxx xxxx"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>{t("travelDates")} (Arrival)</Label>
                <Input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Departure</Label>
                <Input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>{t("flightNumber")}</Label>
              <Input
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                placeholder="VN-123"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests..."
                rows={3}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h2 className="font-semibold">{t("summary")}</h2>

          <BookingSummary
            procedures={hospital.procedures}
            services={additionalServices}
            selectedProcedureIds={selectedProcedureIds}
            selectedServiceIds={selectedServiceIds}
            discountAmount={discountAmount}
            isBeberiaMember={false}
            locale={locale}
            labels={{
              subtotal: t("subtotal"),
              discount: t("discount"),
              services: t("additionalServices"),
              total: t("total"),
            }}
          />

          {/* Promo Code */}
          <div className="flex gap-2">
            <Input
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
                setPromoValid(null);
              }}
              placeholder={t("promoCode")}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleApplyPromo}>
              {t("apply")}
            </Button>
          </div>
          {promoValid === true && (
            <p className="text-xs text-green-600">Promo applied!</p>
          )}
          {promoValid === false && (
            <p className="text-xs text-red-500">Invalid promo code</p>
          )}

          {/* Info Summary */}
          <div className="space-y-1 rounded-lg bg-muted/50 p-3 text-sm">
            {selectedDate && (
              <p>
                <span className="text-muted-foreground">Date:</span> {selectedDate}
                {selectedTime && ` ${selectedTime}`}
              </p>
            )}
            {passportName && (
              <p>
                <span className="text-muted-foreground">Name:</span> {passportName}
              </p>
            )}
            {phone && (
              <p>
                <span className="text-muted-foreground">Phone:</span> {phone}
              </p>
            )}
            {flightNumber && (
              <p>
                <span className="text-muted-foreground">Flight:</span> {flightNumber}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {currentStep > 0 && (
          <Button
            variant="outline"
            className="flex-1 gap-2 border-muted-foreground/20"
            onClick={() => setCurrentStep((s) => s - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            {t(`steps.${steps[currentStep - 1]}`)}
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg transition-shadow hover:shadow-xl"
            disabled={!canGoNext()}
            onClick={() => setCurrentStep((s) => s + 1)}
          >
            {t(`steps.${steps[currentStep + 1]}`)}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-lg transition-shadow hover:shadow-xl"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Check className="mr-1 h-4 w-4" />
            )}
            {t("confirmBooking")}
          </Button>
        )}
      </div>
    </>
  );
}
