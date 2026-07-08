import { TermsAndConditionsContent } from "@/components/auth/terms-and-conditions-content";
import { Footer } from "@/components/shared";
import Navbar from "@/components/shared/navbar2";
import Seo from "@/components/shared/seo";
import DownloadButton from "@/pages/home/documentation/download-button";
import {
  TERMS_PDF_FILENAME,
  TERMS_PDF_URL,
} from "@/utilities/constants/legal";
import { useEffect, useState } from "react";

const TermsAndConditions = () => {
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(TERMS_PDF_URL, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) {
          setPdfAvailable(response.ok);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPdfAvailable(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-background">
      <Seo
        title="Terms and Conditions - Qocent"
        description="Read the Qocent Terms and Conditions governing use of our multi-cloud platform."
        canonical="https://qocent.com/terms"
        image="https://qocent.com/og-image.jpg"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms and Conditions - Qocent",
          description:
            "Read the Qocent Terms and Conditions governing use of our multi-cloud platform.",
          url: "https://qocent.com/terms",
        }}
      />

      <Navbar />

      <main className="mx-auto w-full max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            Terms and Conditions
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated document for Qocent, operated by Qucoon Limited.
          </p>
        </header>

        {pdfAvailable === true ? (
          <div className="space-y-6">
            <DownloadButton
              fileUrl={TERMS_PDF_URL}
              fileName={TERMS_PDF_FILENAME}
              title="Download Terms and Conditions (PDF)"
              className="max-w-none"
            />
            <iframe
              src={TERMS_PDF_URL}
              title="Qocent Terms and Conditions"
              className="h-[min(80vh,900px)] w-full rounded-lg border border-border bg-card"
            />
          </div>
        ) : (
          <article className="rounded-lg border border-border bg-card p-6 lg:p-8">
            <TermsAndConditionsContent />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
