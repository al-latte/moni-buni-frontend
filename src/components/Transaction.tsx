import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Separator } from "@/components/ui/separator";

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
      // className="md:w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 bg-black text-white rounded-full">
        <p className="text-sm font-semibold">
          January 1, 2025 - January 31, 2025
        </p>
        <CollapsibleTrigger asChild>
          <Button size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md px-2 py-2 text-sm ">
          <div className="flex items-start gap-4 m-3">
            <div className="w-10 h-10 bg-black rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Category</p>
              <p className="text-xs text-gray-500">Date</p>
            </div>
            <div>
              <p className="text-sm font-semibold">-$10.50</p>
            </div>
          </div>
          <Separator />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
