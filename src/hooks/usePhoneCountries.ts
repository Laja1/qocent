/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const usePhoneCountries = () => {
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=idd,flags"
        );
        if (!res.ok) throw new Error(`Failed to load countries: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected payload");

        const formatted = data
          .map((c: any) => {
            const root: string | undefined = c.idd?.root;
            const suffixes: string[] | undefined = c.idd?.suffixes;
            if (!root || !suffixes || !suffixes.length) {
              return null;
            }
            const code = `${root}${suffixes[0]}`;
            const emoji = c.flags?.emoji ?? c.flags?.svg ?? ""; 
            // Note: flags.emoji might not exist; fallback to svg link or skip

            return {
              label: emoji || code,  // show emoji if available, else show code
              value: code,
            };
          })
          .filter((c): c is { label: string; value: string } => c !== null)
          .sort((a, b) => a.value.localeCompare(b.value));

        setCountries(formatted);
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };

    fetchCountries();
  }, []);

  return countries;
};
