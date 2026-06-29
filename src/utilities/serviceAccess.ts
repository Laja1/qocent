const DEFAULT_FINOPS_BASE_URL =
  import.meta.env.VITE_FINOPS_BASE_URL || "https://finops.qocent.com";

export function buildServiceRedirectUrl(
  redirectUrl: string,
  finopsBaseUrl = DEFAULT_FINOPS_BASE_URL
): string {
  const backendRedirectUrl = new URL(redirectUrl);
  const token = backendRedirectUrl.searchParams.get("token");
  const target = new URL("/", finopsBaseUrl);
  if (token) {
    target.searchParams.set("token", token);
  }
  return target.toString();
}
