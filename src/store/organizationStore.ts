import type { organization } from '@/models/response/organizationResponse';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OrganizationState = {
  organization: organization | null;
  setOrganization: (org: organization) => void;
  clearOrganization: () => void;
};

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organization: null,

      setOrganization: (org) =>
        set({ organization: org }),

      clearOrganization: () =>
        set({ organization: null }),
    }),
    {
      name: 'organization-storage', // storage key
      storage: createJSONStorage(() => localStorage), // AsyncStorage if RN
    }
  )
);
