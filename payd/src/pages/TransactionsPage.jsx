import { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import StatCard from '../shared/StatCard'
import DataTable from '../shared/DataTable'
import ConfirmDialog from '../shared/ConfirmDialog'
import { useToast } from '../shared/ToastProvider'
import { transactionsMock, transactionsVolume7d } from '../data/transactionsData'
import {
  CartesianGrid,
  Line,
  LineChart,
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

function parseDateInput(value) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

function parseTxDate(value) {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export default function TransactionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const toast = useToast()

  const [confirmOpen, setConfirmOpen] = useState(false)

  const query = searchParams.get('q') || ''
  const status = searchParams.get('status') || 'all'
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''

  const fromDate = parseDateInput(from)
  const toDate = parseDateInput(to)

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    next.delete('page')
    setSearchParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactionsMock.filter((t) => {
      const matchesQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.method.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)

      const matchesStatus = status === 'all' ? true : t.status.toLowerCase() === status

      const txDate = parseTxDate(t.date)
      const matchesFrom = fromDate && txDate ? txDate >= fromDate : true
      const matchesTo = toDate && txDate ? txDate <= toDate : true

      return matchesQuery && matchesStatus && matchesFrom && matchesTo
    })
  }, [query, status, fromDate, toDate])

  const columns = useMemo(
    () => [
      {
        key: 'id',
        header: 'Transaction ID',
        render: (row) => (
          <a href="#" className="font-semibold text-payd-700 hover:text-payd-900">
            {row.id}
          </a>
        ),
      },
      { key: 'customer', header: 'Customer' },
      { key: 'date', header: 'Date & Time' },
      {
        key: 'amount',
        header: 'Amount',
        sortValue: (row) => row.amount,
        render: (row) => <span className="font-medium">{formatNgn(row.amount)}</span>,
      },
      {
        key: 'status',
        header: 'Status',
        render: (row) => {
          const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold'
          if (row.status === 'Success') return <span className={`${base} bg-emerald-50 text-emerald-700`}>Success</span>
          if (row.status === 'Pending') return <span className={`${base} bg-amber-50 text-amber-700`}>Pending</span>
          return <span className={`${base} bg-red-50 text-red-700`}>Failed</span>
        },
      },
      { key: 'method', header: 'Payment method' },
      {
        key: 'actions',
        header: 'Actions',
        render: () => (
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
              View receipt
            </button>
            <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
              Download
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Transactions</div>
          <div className="mt-1 text-sm text-slate-600">Search, filter, and export transaction records.</div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total volume" value="NGN 15.2M" trend="+8%" />
        <StatCard title="Successful" value="2,847" />
        <StatCard title="Failed" value="43" variant="danger" />
        <StatCard title="Avg value" value="NGN 5,340" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Transactions table</div>
              <div className="mt-1 text-xs text-slate-500">Sortable columns and pagination included.</div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-72 max-w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-payd-200"
                  placeholder="Search transactions"
                  value={query}
                  onChange={(e) => setParam('q', e.target.value)}
                />
              </div>

              <select
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200"
                value={status}
                onChange={(e) => setParam('status', e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>

              <input
                type="date"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200"
                value={from}
                onChange={(e) => setParam('from', e.target.value)}
                aria-label="From date"
              />
              <input
                type="date"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200"
                value={to}
                onChange={(e) => setParam('to', e.target.value)}
                aria-label="To date"
              />
            </div>
          </div>

          <div className="mt-4">
            <DataTable rows={filtered} columns={columns} pageSize={8} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">Showing {filtered.length} results</div>
            <button
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              onClick={() => setConfirmOpen(true)}
              type="button"
            >
              Delete selected (demo)
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Quick stats</div>
          <div className="mt-1 text-xs text-slate-500">Volume over last 7 days</div>

          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionsVolume7d} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 'dataMax + 20000']} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    fontSize: 12,
                  }}
                  formatter={(v) => formatNgn(v)}
                />
                <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete transactions?"
        description="This is a scaffold confirmation dialog. Wire real selection + API later."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          toast.push({ title: 'Deleted', message: 'Demo action completed', variant: 'success' })
        }}
      />
    </div>
  )
}
