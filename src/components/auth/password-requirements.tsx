import { Check, X } from "lucide-react";
import { getPasswordRequirementStatus } from "@/utilities/passwordRequirements";
import { cn } from "@/lib/utils";

type PasswordRequirementsProps = {
  password: string;
  className?: string;
};

export function PasswordRequirements({
  password,
  className,
}: PasswordRequirementsProps) {
  if (!password) return null;

  const requirements = getPasswordRequirementStatus(password);

  return (
    <div
      className={cn(
        "rounded-md border border-black/10 bg-gray-50 px-3 py-2.5",
        className
      )}
      aria-live="polite"
    >
      <p className="mb-2 text-xs font-medium text-gray-700">
        Password must include:
      </p>
      <ul className="space-y-1.5">
        {requirements.map(({ id, label, met }) => (
          <li key={id} className="flex items-start gap-2 text-xs">
            {met ? (
              <Check
                size={14}
                className="mt-0.5 shrink-0 text-green-600"
                aria-hidden
              />
            ) : (
              <X
                size={14}
                className="mt-0.5 shrink-0 text-red-500"
                aria-hidden
              />
            )}
            <span className={met ? "text-green-700" : "text-gray-600"}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
