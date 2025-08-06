import { create } from 'zustand'

interface CollapseState {
  isAllExpanded: boolean
  toggleAll: () => void
  setAllExpanded: (expanded: boolean) => void
}

export const useCollapseStore = create<CollapseState>((set) => ({
  isAllExpanded: true,
  toggleAll: () => set((state) => ({ isAllExpanded: !state.isAllExpanded })),
  setAllExpanded: (expanded) => set({ isAllExpanded: expanded }),
}))
