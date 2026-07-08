export const formatMoney = (
  value: number | string | undefined,
  currency: string = "NGN"
) => {
  const num =
    typeof value === "string" ? Number(value) : typeof value === "number" ? value : 0;
  if (Number.isNaN(num)) return `${currency} 0.00`;
  return `${currency} ${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const sanitizeAmountInput = (value: string) => {
  const cleaned = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const [integer = "", ...decimalParts] = cleaned.split(".");
  const decimal = decimalParts.join("").slice(0, 2);

  if (cleaned.includes(".")) {
    return decimal.length > 0 ? `${integer}.${decimal}` : `${integer}.`;
  }

  return integer;
};

export const formatAmountWithCommas = (value: string | number) => {
  if (value === "" || value === null || value === undefined) return "";

  if (typeof value === "string") {
    const sanitized = sanitizeAmountInput(value);
    if (!sanitized || sanitized === ".") return sanitized;

    const endsWithDecimal = sanitized.endsWith(".");
    const [integer = "", decimal] = sanitized.split(".");
    const formattedInteger = integer
      ? Number(integer).toLocaleString(undefined, { maximumFractionDigits: 0 })
      : "0";

    if (endsWithDecimal) return `${formattedInteger}.`;
    if (decimal !== undefined) return `${formattedInteger}.${decimal}`;
    return formattedInteger;
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const formatUsdAmount = (value: string | number | undefined) => {
  if (value === "" || value === undefined) return "0";
  const sanitized =
    typeof value === "string" ? sanitizeAmountInput(value) : String(value);
  if (!sanitized || sanitized === ".") return "0";
  return formatAmountWithCommas(sanitized);
};

export const formatDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
