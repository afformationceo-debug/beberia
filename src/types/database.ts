import type {
  User,
  Hospital,
  Doctor,
  Procedure,
  ProcedureCategory,
  Booking,
  BookingItem,
  BookingService,
  Review,
  CommunityPost,
  Comment,
  ChatRoom,
  ChatMessage,
  Promotion,
  Favorite,
  AdditionalService,
  ServicePackage,
  Notification,
  Media,
} from "@prisma/client";

// Re-export Prisma types
export type {
  User,
  Hospital,
  Doctor,
  Procedure,
  ProcedureCategory,
  Booking,
  BookingItem,
  BookingService,
  Review,
  CommunityPost,
  Comment,
  ChatRoom,
  ChatMessage,
  Promotion,
  Favorite,
  AdditionalService,
  ServicePackage,
  Notification,
  Media,
};

// Extended types with relations
export type HospitalWithRelations = Hospital & {
  doctors: Doctor[];
  procedures: Procedure[];
  reviews: Review[];
};

export type BookingWithRelations = Booking & {
  hospital: Hospital;
  doctor: Doctor | null;
  items: (BookingItem & { procedure: Procedure })[];
  services: (BookingService & { service: AdditionalService })[];
};

export type ReviewWithRelations = Review & {
  user: Pick<User, "id" | "name" | "avatar">;
  hospital: Pick<Hospital, "id" | "nameVi" | "nameKo" | "nameEn" | "slug">;
};

export type ChatRoomWithRelations = ChatRoom & {
  messages: ChatMessage[];
  booking: Booking | null;
};
