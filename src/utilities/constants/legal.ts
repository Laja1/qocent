/** Public path for the T&C PDF — drop the file at `public/documents/qocent-terms-and-conditions.pdf` */
export const TERMS_PDF_PATH = "/documents/qocent-terms-and-conditions.pdf";

export const TERMS_PDF_URL =
  import.meta.env.VITE_TERMS_PDF_URL ?? TERMS_PDF_PATH;

export const TERMS_PDF_FILENAME = "qocent-terms-and-conditions.pdf";
