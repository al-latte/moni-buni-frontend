import { BreakdownDetail } from "./BreakdownDetail"
import { Chart } from "./Chart"
import TransactionList from "../features/transactions/components/TransactionList"
import { Period } from "@/features/transactions/types/transaction.types";
import { useTotalExpenses } from "@/features/transactions/hooks/useTotalExpenses";

interface Props {
  period: Period;
}

export const TabContentLayout = ({ period }: Props) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const { total, isLoading } = useTotalExpenses(user?._id, period);

  return (
    <div>
        {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
        <div className="flex flex-row items-end justify-between my-6">
            <p className=""> 
                <span className="font-bold text-3xl"> ${isLoading ? '...' : total.toFixed(2)}</span> 
                <br /> 
                <span className="text-gray-400">Total Expenses</span> 
              </p>
              <p> 
                <span className="font-bold text-2xl">$8.90</span> 
                <br /> 
                <span className="text-gray-400">Left in budget</span> 
              </p>
            </div>
              
              <Chart userId={user?._id} period={period} />
              <BreakdownDetail />
              <TransactionList userId={user?._id} period={period}/>
            </div>
          </div>
          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:flex-row gap-4">
            <div className="lg:w-1/2 lg:pr-32">
            <div className="flex flex-row items-end justify-between  mb-6">
            <p> 
                <span className="font-bold text-3xl"> ${isLoading ? '...' : total.toFixed(2)}</span> 
                <br /> 
                <span className="text-gray-400">Total Expenses</span> 
              </p>
              <p> 
                <span className="font-bold text-2xl">$8.90</span> 
                <br /> 
                <span className="text-gray-400">Left in budget</span> 
              </p>
            </div>
            
              <TransactionList userId={user?._id} period={period}/>
            </div>
            <div className="lg:w-1/2">
            <Chart userId={user?._id} period={period} />
              <BreakdownDetail />
            </div>
          </div>
    </div>                                                 
  )
}