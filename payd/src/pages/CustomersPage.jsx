import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import StatCard from '../shared/StatCard'
import { customersMock } from '../data/customersData'

export default function CustomersPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return customersMock
    const q = query.toLowerCase()
    return customersMock.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.status.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Customers</div>
          <div className="mt-1 text-sm text-slate-600">Manage customers and track engagement.</div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
          <Plus className="h-4 w-4" />
          Add customer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total customers" value="1,247" />
        <StatCard title="Active this month" value="342" />
        <StatCard title="New customers" value="89" variant="success" />
        <StatCard title="Churn rate" value="2.3%" variant="warn" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Customer list</div>
            <div className="mt-1 text-xs text-slate-500">Quick view of profiles and status.</div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-72 max-w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-payd-200"
              placeholder="Search customers"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-payd-50 text-sm font-semibold text-payd-700">
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-slate-900">{c.name}</div>
                    <div className="truncate text-sm text-slate-600">{c.email}</div>
                  </div>
                </div>

                <span
                  className={
                    'rounded-full px-2 py-0.5 text-xs font-semibold ' +
                    (c.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700')
                  }
                >
                  {c.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-slate-500">Transactions</div>
                  <div className="font-semibold text-slate-900">{c.transactions}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Total spent</div>
                  <div className="font-semibold text-slate-900">NGN {c.totalSpent.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">Last activity: {c.lastActivity}</div>

              <div className="mt-3 flex items-center gap-2">
                <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  View profile
                </button>
                <button className="rounded-lg bg-payd-600 px-2 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
