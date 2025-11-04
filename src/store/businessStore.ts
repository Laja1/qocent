import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BusinessService {
  bookingDate: string;
  serviceName: string;
  status: string;
}

export interface Business {
  businessAccountCode: string;
  businessContactEmail: string;
  businessContactName: string;
  businessContactNumber: string;
  businessContactRole: string;
  businessDescription: string;
  businessId: number;
  businessName: string;
  businessSize: string;
  businessStatus: string;
  businessUserId: number;
  businessWebsite: string;
  services: BusinessService[];
}

interface BusinessState {
  business: Business | null;
  setBusiness: (data: Business) => void;
  updateBusiness: (updates: Partial<Business>) => void;
  clearBusiness: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      business: null,
      setBusiness: (data) => set({ business: data }),
      updateBusiness: (updates) =>
        set((state) =>
          state.business ? { business: { ...state.business, ...updates } } : state
        ),
      clearBusiness: () => set({ business: null }),
    }),
    {
      name: "business-storage",
      storage: createJSONStorage(() => localStorage), // ✅ Correct usage
    }
  )
);
