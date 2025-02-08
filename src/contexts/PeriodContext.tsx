import { createContext, useContext, useState, ReactNode } from "react";
import { Period } from "../features/transactions/types/transaction.types";

interface PeriodContextType {
  selectedPeriod: Period;
  setSelectedPeriod: (value: Period) => void;
}

const PeriodContext = createContext<PeriodContextType | null>(null);

export const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("week");

  return (
    <PeriodContext.Provider value={{ selectedPeriod, setSelectedPeriod }}>
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (!context) {
    throw new Error("usePeriod must be used within a PeriodProvider");
  }
  return context;
};