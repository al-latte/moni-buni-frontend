import { BreakdownDetail } from "./BreakdownDetail"
import { Chart } from "./Chart"
import { TransactionList } from "./TransactionList"

export const TabContentLayout = () => {
  return (
    <div>
        {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
            <p className="my-6"> 
                <span className="font-bold text-3xl">$358.90</span> 
                <br /> 
                <span>of $500 spent</span> 
              </p>
              
              <Chart />
              <BreakdownDetail />
              <TransactionList />
            </div>
          </div>
          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:flex-row gap-6">
            <div className="lg:w-1/2 lg:pr-32">
            <p className="mb-6"> 
                <span className="font-bold text-3xl">$358.90</span> 
                <br /> 
                <span>of $500 spent</span> 
              </p>
              <TransactionList />
            </div>
            <div className="lg:w-1/2">
              <Chart />
              <BreakdownDetail />
            </div>
          </div>
    </div>
  )
}