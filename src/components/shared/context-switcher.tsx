import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  ChevronDown,
  User,
  Check,
  Loader2,
  Wallet,
  Crown,
  Eye,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useGetContextsQuery, useGetActiveContextQuery, useSelectContextMutation } from "@/service/contextApi";
import { contextStore } from "@/store/contextSlice";
import { showCustomToast } from "./toast";
import { ErrorHandler } from "@/service/httpClient/errorHandler";
import type { ContextItem, ContextRole } from "@/models/response/contextResponse";
import type { RootState } from "@/store";

const roleLabel: Record<ContextRole, string> = {
  PERSONAL: "Personal",
  OWNER: "Owner",
  MEMBER: "Member",
  VIEWER: "View only",
};

const roleIcon: Record<ContextRole, React.ReactNode> = {
  PERSONAL: <User className="w-3 h-3" />,
  OWNER: <Crown className="w-3 h-3" />,
  MEMBER: <Users className="w-3 h-3" />,
  VIEWER: <Eye className="w-3 h-3" />,
};

const roleBadgeClass: Record<ContextRole, string> = {
  PERSONAL: "bg-blue-100 text-blue-700",
  OWNER: "bg-amber-100 text-amber-700",
  MEMBER: "bg-green-100 text-green-700",
  VIEWER: "bg-gray-100 text-gray-600",
};

export function ContextSwitcher() {
  const dispatch = useDispatch();
  const activeContext = useSelector((state: RootState) => (state as any).context?.activeContext as ContextItem | null);
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  const { data: contextsData, isLoading } = useGetContextsQuery();
  const { data: activeContextData } = useGetActiveContextQuery();
  const [selectContext] = useSelectContextMutation();

  const contexts = contextsData?.data ?? [];

  useEffect(() => {
    if (activeContextData?.active_context && !activeContext) {
      dispatch(
        contextStore.action.setActiveContext({
          context: activeContextData.active_context,
        })
      );
    }
  }, [activeContextData, activeContext, dispatch]);

  const handleSelect = async (ctx: ContextItem) => {
    // Business owners cannot switch to personal context
    if (activeContext?.role === "OWNER" && ctx.context_type === "personal") {
      showCustomToast("Business owners cannot switch to a personal account.", {
        toastOptions: { type: "warning", autoClose: 4000 },
      });
      return;
    }

    if (activeContext?.entity_id === ctx.entity_id && activeContext?.context_type === ctx.context_type) {
      return; // already active
    }

    setSwitchingId(ctx.entity_id);
    try {
      const res = await selectContext({
        context_type: ctx.context_type,
        entity_id: ctx.entity_id,
      }).unwrap();

      dispatch(
        contextStore.action.setActiveContext({
          context: res.active_context,
          tokenContextClaim: res.token_context_claim,
        })
      );

      showCustomToast(`Switched to ${res.active_context.display_name}`, {
        toastOptions: { type: "success", autoClose: 3000 },
      });
    } catch (error) {
      const message = ErrorHandler.extractMessage(error);
      showCustomToast(message, { toastOptions: { type: "error", autoClose: 4000 } });
    } finally {
      setSwitchingId(null);
    }
  };

  const display = activeContext ?? contexts[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2 px-3 py-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-colors min-w-0">
          {display?.context_type === "business" ? (
            <Building2 className="w-4 h-4 shrink-0 text-amber-600" />
          ) : (
            <User className="w-4 h-4 shrink-0 text-blue-600" />
          )}
          <span className="truncate">{display?.display_name ?? "Select account"}</span>
          {isLoading ? (
            <Loader2 className="w-3 h-3 shrink-0 animate-spin text-white/60" />
          ) : (
            <ChevronDown className="w-3 h-3 shrink-0 text-white/60 ml-auto" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
          Your accounts
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {contexts.length === 0 && !isLoading && (
          <div className="px-3 py-4 text-center text-sm text-gray-400">
            No accounts available
          </div>
        )}

        {contexts.map((ctx) => {
          const isActive =
            activeContext?.entity_id === ctx.entity_id &&
            activeContext?.context_type === ctx.context_type;
          const isSwitching = switchingId === ctx.entity_id;
          const isOwnerLocked =
            activeContext?.role === "OWNER" && ctx.context_type === "personal";

          return (
            <DropdownMenuItem
              key={`${ctx.context_type}-${ctx.entity_id}`}
              onClick={() => !isOwnerLocked && handleSelect(ctx)}
              disabled={isSwitching || isOwnerLocked}
              className="flex items-start gap-3 p-3 cursor-pointer"
            >
              <div className="mt-0.5 shrink-0">
                {ctx.context_type === "business" ? (
                  <Building2 className="w-4 h-4 text-amber-600" />
                ) : (
                  <User className="w-4 h-4 text-blue-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">{ctx.display_name}</span>
                  {isActive && <Check className="w-3 h-3 text-green-600 shrink-0" />}
                  {isSwitching && <Loader2 className="w-3 h-3 animate-spin shrink-0" />}
                </div>

                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full font-medium ${roleBadgeClass[ctx.role]}`}
                  >
                    {roleIcon[ctx.role]}
                    {roleLabel[ctx.role]}
                  </span>

                  {ctx.has_active_subscription && (
                    <Badge variant="outline" className="text-xs py-0 px-1.5 h-4">
                      Subscribed
                    </Badge>
                  )}

                  {ctx.wallet_status === "ACTIVE" && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Wallet className="w-3 h-3" />
                      {ctx.currency} {ctx.current_balance.toLocaleString()}
                    </span>
                  )}
                </div>

                {isOwnerLocked && (
                  <p className="text-xs text-amber-600 mt-1">
                    Business owners cannot switch to a personal account
                  </p>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
