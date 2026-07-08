/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PYTHON_BASE_URL?: string;
  readonly VITE_KOTLIN_BASE_URL?: string;
  readonly VITE_FINOPS_BASE_URL?: string;
  readonly VITE_TERMS_PDF_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
