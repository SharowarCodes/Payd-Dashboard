import { ChevronDown, TrendingUp } from 'lucide-react'

export default function DashboardHeader({ period, setPeriod, onOpenSidebar }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-2xl font-semibold text-slate-900 md:text-3xl">Hey Md Sharowar Hossain Robin</div>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600 md:text-base">
          <span>You earned</span>
          <span className="font-semibold text-slate-900">TOP DEVELOPER TITTLE</span>
          <span>this month</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            <TrendingUp className="h-3.5 w-3.5" />
            Positive
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
          onClick={onOpenSidebar}
        >
          Menu
        </button>

        <div className="relative">
          <select
            className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-payd-200"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="This month">This month</option>
            <option value="Last month">Last month</option>
            <option value="Last 3 months">Last 3 months</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  )
}
