import { create } from "zustand"

interface AdmissionModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useAdmissionModal = create<AdmissionModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
