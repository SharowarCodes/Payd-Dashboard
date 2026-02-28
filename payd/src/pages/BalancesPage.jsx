import { useState } from 'react'
import { ArrowDownToLine, PlusCircle } from 'lucide-react'
import StatCard from '../shared/StatCard'
import { balancesHistoryMock, balanceTransactionsMock } from '../data/balancesData'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function formatNgn(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function BalancesPage() {
  const [currency, setCurrency] = useState('NGN')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Balances</div>
          <div className="mt-1 text-sm text-slate-600">Track available funds and history.</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            aria-label="Currency"
          >
            <option value="NGN">NGN</option>
          </select>
          <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
            <PlusCircle className="h-4 w-4" />
            Add funds
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <ArrowDownToLine className="h-4 w-4" />
            Withdraw
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Available" value="NGN 2,450,000" variant="success" />
        <StatCard title="Pending" value="NGN 380,000" variant="warn" />
        <StatCard title="Reserved" value="NGN 120,000" />
        <StatCard title="Total" value="NGN 2,950,000" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="text-sm font-semibold text-slate-900">Balance history</div>
          <div className="mt-1 text-xs text-slate-500">Area chart trend</div>

          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balancesHistoryMock} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(v) => formatNgn(v)} />
                <Area type="monotone" dataKey="balance" stroke="#4f46e5" fill="url(#bal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Recent balance changes</div>
          <div className="mt-3 space-y-2">
            {balanceTransactionsMock.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{t.label}</div>
                  <div className="text-xs text-slate-500">{t.date}</div>
                </div>
                <div className={t.type === 'credit' ? 'text-emerald-700' : 'text-red-700'}>
                  <div className="text-sm font-semibold">{formatNgn(t.amount)}</div>
                  <div className="text-xs text-slate-500 text-right">{formatNgn(t.running)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500">Currency: {currency}</div>
    </div>
  )
}
