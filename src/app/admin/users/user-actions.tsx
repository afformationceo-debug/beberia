"use client";

import { useState, useTransition } from "react";
import { updateUserRole, updateMembershipTier } from "@/lib/actions/admin";
import type { UserRole, MembershipTier } from "@prisma/client";
import { Settings } from "lucide-react";

export function UserActions({
  userId,
  currentRole,
  currentTier,
}: {
  userId: string;
  currentRole: UserRole;
  currentTier: MembershipTier;
}) {
  const [isPending, startTransition] = useTransition();
  const [showMenu, setShowMenu] = useState(false);

  function handleRoleChange(role: UserRole) {
    startTransition(async () => {
      await updateUserRole(userId, role);
      setShowMenu(false);
    });
  }

  function handleTierChange(tier: MembershipTier) {
    startTransition(async () => {
      await updateMembershipTier(userId, tier);
      setShowMenu(false);
    });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={isPending}
        className="rounded p-1.5 hover:bg-muted"
      >
        <Settings className="h-4 w-4" />
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-8 z-20 w-48 rounded-lg border bg-background p-2 shadow-lg">
            <p className="mb-1 px-2 text-[10px] font-medium text-muted-foreground">역할 변경</p>
            {(["CUSTOMER", "HOSPITAL_ADMIN", "ADMIN"] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                disabled={isPending || role === currentRole}
                className={`w-full rounded px-2 py-1 text-left text-xs hover:bg-muted disabled:opacity-50 ${
                  role === currentRole ? "bg-muted font-medium" : ""
                }`}
              >
                {role === "CUSTOMER" ? "고객" : role === "HOSPITAL_ADMIN" ? "병원관리자" : "관리자"}
              </button>
            ))}

            <hr className="my-2" />

            <p className="mb-1 px-2 text-[10px] font-medium text-muted-foreground">멤버십 변경</p>
            {(["FREE", "BEBERIA_MEMBER", "BEBERIA_VIP"] as MembershipTier[]).map((tier) => (
              <button
                key={tier}
                onClick={() => handleTierChange(tier)}
                disabled={isPending || tier === currentTier}
                className={`w-full rounded px-2 py-1 text-left text-xs hover:bg-muted disabled:opacity-50 ${
                  tier === currentTier ? "bg-muted font-medium" : ""
                }`}
              >
                {tier === "FREE" ? "Free" : tier === "BEBERIA_MEMBER" ? "Beberia Member" : "Beberia VIP"}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
