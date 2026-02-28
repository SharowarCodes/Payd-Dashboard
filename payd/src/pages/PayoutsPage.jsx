import { Download, PlusCircle } from 'lucide-react'
import StatCard from '../shared/StatCard'
import DataTable from '../shared/DataTable'
import { payoutsMock } from '../data/payoutsData'

function formatNgn(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function PayoutsPage() {
  const columns = [
    { key: 'id', header: 'Payout ID' },
    { key: 'recipient', header: 'Recipient' },
    { key: 'amount', header: 'Amount', sortValue: (r) => r.amount, render: (r) => formatNgn(r.amount) },
    {
      key: 'status',
      header: 'Status',
      render: (r) => {
        const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold'
        if (r.status === 'Completed') return <span className={`${base} bg-emerald-50 text-emerald-700`}>Completed</span>
        if (r.status === 'Processing') return <span className={`${base} bg-indigo-50 text-indigo-700`}>Processing</span>
        if (r.status === 'Pending') return <span className={`${base} bg-amber-50 text-amber-700`}>Pending</span>
        return <span className={`${base} bg-red-50 text-red-700`}>Failed</span>
      },
    },
    { key: 'scheduled', header: 'Scheduled date' },
    { key: 'completed', header: 'Completion date' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            Cancel
          </button>
          <button className="rounded-lg bg-payd-600 px-2 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
            Retry
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Payouts</div>
          <div className="mt-1 text-sm text-slate-600">Schedule and track outgoing payouts.</div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
            <PlusCircle className="h-4 w-4" />
            Schedule payout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total pending" value="NGN 450,000" variant="warn" />
        <StatCard title="Total processed" value="NGN 2.1M" variant="success" />
        <StatCard title="Next payout" value="Mar 30, 2024" />
        <StatCard title="Avg processing" value="2.4 days" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Payouts list</div>
        <div className="mt-4">
          <DataTable rows={payoutsMock} columns={columns} pageSize={8} />
        </div>
      </div>
    </div>
  )
}
