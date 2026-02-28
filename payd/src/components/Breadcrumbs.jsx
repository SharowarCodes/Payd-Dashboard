import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const LABELS = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  customers: 'Customers',
  payouts: 'Payouts',
  balances: 'Balances',
  subscriptions: 'Subscriptions',
  'payment-plans': 'Payment Plans',
  referrals: 'Referrals',
  'audit-logs': 'Audit Logs',
  settings: 'Settings',
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  const crumbs = parts.map((part, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/')
    return { label: LABELS[part] || part, to, isLast: idx === parts.length - 1 }
  })

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
      <Link to="/dashboard" className="font-semibold text-slate-600 hover:text-slate-900">
        Payd
      </Link>
      {crumbs.map((c) => (
        <div key={c.to} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-slate-300" />
          {c.isLast ? (
            <span className="font-semibold text-slate-700">{c.label}</span>
          ) : (
            <Link to={c.to} className="font-semibold text-slate-600 hover:text-slate-900">
              {c.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
