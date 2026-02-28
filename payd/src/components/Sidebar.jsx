import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  ArrowLeftRight,
  Users,
  DollarSign,
  Wallet,
  Repeat,
  Calendar,
  Gift,
  History,
  Settings,
} from 'lucide-react'

const navItemBase =
  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200'

export default function Sidebar({ mobileOpen, setMobileOpen, collapsed }) {
  const paymentsItems = useMemo(
    () => [
      { label: 'Transactions', to: '/transactions', icon: ArrowLeftRight },
      { label: 'Customers', to: '/customers', icon: Users },
      { label: 'Payouts', to: '/payouts', icon: DollarSign },
      { label: 'Balances', to: '/balances', icon: Wallet },
      { label: 'Subscriptions', to: '/subscriptions', icon: Repeat },
      { label: 'Payment plans', to: '/payment-plans', icon: Calendar },
    ],
    [],
  )

  const commerceItems = useMemo(
    () => [
      { label: 'Referrals', to: '/referrals', icon: Gift },
      { label: 'Audit logs', to: '/audit-logs', icon: History },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
    [],
  )

  const handleBackdropClick = () => setMobileOpen(false)
  const handleNavClick = () => setMobileOpen(false)

  return (
    <>
      {mobileOpen ? (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={handleBackdropClick}
        />
      ) : null}

      <aside
        className={
          'fixed left-0 top-0 z-50 h-full border-r border-slate-200 bg-white py-5 transition-transform lg:translate-x-0 ' +
          (collapsed ? 'w-[76px] px-3' : 'w-[250px] px-4') +
          ' ' +
          (mobileOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex items-center justify-between">
          <NavLink
            to="/dashboard"
            className={
              collapsed
                ? 'flex h-10 w-10 items-center justify-center rounded-xl bg-payd-600 text-base font-extrabold text-white'
                : 'text-2xl font-bold tracking-tight text-slate-900'
            }
            aria-label="Payd"
            title={collapsed ? 'Payd' : undefined}
          >
            {collapsed ? 'P' : 'Payd'}
          </NavLink>

          <button
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close"
          >
            <span className="text-lg">×</span>
          </button>
        </div>

        <nav className="mt-8 space-y-6">
          <div>
            {collapsed ? null : (
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Payments
              </div>
            )}
            <div className="mt-3 space-y-1">
              {paymentsItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.label}
                    onClick={handleNavClick}
                    to={item.to}
                    className={({ isActive }) =>
                      navItemBase +
                      ' ' +
                      (collapsed ? 'justify-center' : '') +
                      (isActive
                        ? 'bg-payd-600/10 text-payd-800 ring-1 ring-payd-100'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900')
                    }
                    title={collapsed ? item.label : undefined}
                    aria-label={item.label}
                  >
                    <Icon
                      className="h-4 w-4 text-slate-400 group-hover:text-slate-600"
                    />
                    {collapsed ? null : <span>{item.label}</span>}
                  </NavLink>
                )
              })}
            </div>
          </div>

          <div>
            {collapsed ? null : (
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Commerce
              </div>
            )}
            <div className="mt-3 space-y-1">
              {commerceItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.label}
                    onClick={handleNavClick}
                    to={item.to}
                    className={({ isActive }) =>
                      navItemBase +
                      ' ' +
                      (collapsed ? 'justify-center' : '') +
                      (isActive
                        ? 'bg-payd-600/10 text-payd-800 ring-1 ring-payd-100'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900')
                    }
                    title={collapsed ? item.label : undefined}
                    aria-label={item.label}
                  >
                    <Icon
                      className="h-4 w-4 text-slate-400 group-hover:text-slate-600"
                    />
                    {collapsed ? null : <span>{item.label}</span>}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
