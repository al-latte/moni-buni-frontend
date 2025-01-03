import { DollarSign, Plus, ReceiptText, Settings, WalletMinimal } from "lucide-react"
import { Link } from "react-router-dom"

export const MobileNav = () => {
  return (
    <div className="fixed bottom-0 flex justify-between items-center w-full h-16 bg-white shadow-md px-4 z-50 border-t border-gray-200">
        <Link to="/">
            <div className="flex flex-col items-center">
            <DollarSign />
                <p className="text-xs font-medium">Transactions</p>
            </div>
        </Link>
        <Link to="/">
            <div className="flex flex-col items-center">
            <WalletMinimal />
                <p className="text-xs font-medium">Wallets</p>
            </div>
        </Link>
        <Link to="/">
            <div className="bg-black text-white rounded-full p-3">
            <Plus />
            </div>
        </Link>
        <Link to="/">
            <div className="flex flex-col items-center">
            <ReceiptText />
                <p className="text-xs font-medium">Receipts</p>
            </div>
        </Link>
        <Link to="/">
            <div className="flex flex-col items-center">
            <Settings />
                <p className="text-xs font-medium">Settings</p>
            </div>
        </Link>
    </div>
  )
}