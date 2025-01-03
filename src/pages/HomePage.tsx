import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs"


export const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-[1920px] mx-auto">
        <div className="block md:hidden">
        <MobileNav />
        </div>
        <div className="hidden md:block">
        <MainNav />
        </div>
        <div className="flex-1 md:py-4 md:px-20">
          <PeriodFilterTabs />
        </div>
    </div>
  )
}