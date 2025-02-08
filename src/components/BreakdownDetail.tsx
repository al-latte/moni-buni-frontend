import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
  

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const BreakdownDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-4"
      >
        <div className="flex items-center justify-between space-x-4 px-4 bg-black text-white rounded-full">
          <p className="text-sm font-semibold">
            Details
          </p>
          <CollapsibleTrigger asChild>
            <Button className="bg-transparent">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="space-y-2 md:flex gap-3">
            <div className="space-y-2 border-2 border-black rounded-3xl p-3"> 
                <p className="font-bold">Filter(week/month etc) Breakdown</p>
                <p className="text-sm">Average spent per day: $0 <br /> Total expenses: $100 <br /> Total income: $100</p>
            </div>
            <div className="space-y-2 bg-black text-white rounded-3xl p-3">
                <p className="font-bold ">Wallets Breakdown</p>
                {/* this div will be for all wallets */}
                <div>
                <p className="font-bold text-sm">Wallet name</p>
                <p className="text-sm">Total expenses: $100 <br /> Overspent: $100 <br /> Remaining : $0  </p>
                </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
  )
}

  