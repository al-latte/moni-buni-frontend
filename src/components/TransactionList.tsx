import { Transaction } from "./Transaction"

export const TransactionList = () => {
  return (
    <div className="space-y-4">
    <p className="mt-4 font-bold text-lg">Transactions</p>
    <div>
        {/* all transaction will be a Transaction */}
    <Transaction />
    </div>
    
    </div>
  )
}