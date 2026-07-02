import type { ContextItem } from "@/models/response/contextResponse";

/** Business owners may invite registered users to their business. */
export function canInviteBusinessUsers(
  activeContext: ContextItem | null | undefined
): boolean {
  return (
    activeContext?.context_type === "business" &&
    activeContext.role === "OWNER"
  );
}

/** Individual users may request to join a business from personal context. */
export function canRequestJoinBusiness(
  activeContext: ContextItem | null | undefined
): boolean {
  return activeContext?.context_type === "personal";
}
