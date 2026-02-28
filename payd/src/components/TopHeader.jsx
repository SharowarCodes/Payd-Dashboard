import { useMemo } from 'react'
import { Bell, ChevronDown, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'

function getGreeting(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function TopHeader({ onOpenSidebar, collapsed, setCollapsed }) {
  const greeting = useMemo(() => getGreeting(), [])

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 lg:hidden"
            onClick={onOpenSidebar}
            aria-label="Open navigation"
          >
            Menu
          </button>

          <button
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 lg:inline-flex"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            type="button"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>

          <div>
            <div className="text-sm text-slate-600">{greeting},</div>
            <div className="text-lg font-semibold text-slate-900">Hey Md Sharowar Hossain Robin!</div>
          </div>
        </div>

        <div className="hidden max-w-md flex-1 items-center lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-payd-200"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            aria-label="User menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-payd-50 text-xs font-semibold text-payd-700">
              SHR
            </span>
            <span className="hidden sm:inline">   Md Sharowar Hossain Robin</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
