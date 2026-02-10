export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface HospitalFilters {
  category?: string;
  district?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  beberiaDiscount?: boolean;
  search?: string;
  sort?: "recommended" | "rating" | "reviews" | "price_asc" | "price_desc";
  page?: number;
  pageSize?: number;
}

export interface BookingRequest {
  hospitalId: string;
  doctorId?: string;
  procedures: { procedureId: string; quantity: number }[];
  services?: { serviceId: string; details?: Record<string, unknown> }[];
  preferredDate?: string;
  preferredTime?: string;
  passportName: string;
  phone: string;
  arrivalDate?: string;
  departureDate?: string;
  flightNumber?: string;
  promotionCode?: string;
  notes?: string;
}
