import { Download, PlusCircle } from 'lucide-react'
import StatCard from '../shared/StatCard'
import DataTable from '../shared/DataTable'
import { subscriptionsMock } from '../data/subscriptionsData'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

export default function SubscriptionsPage() {
  const columns = [
    { key: 'customer', header: 'Customer' },
    { key: 'plan', header: 'Plan name' },
    { key: 'start', header: 'Start date' },
    { key: 'next', header: 'Next billing' },
    { key: 'amount', header: 'Amount' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => {
        const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold'
        if (r.status === 'Active') return <span className={`${base} bg-emerald-50 text-emerald-700`}>Active</span>
        if (r.status === 'Past due') return <span className={`${base} bg-amber-50 text-amber-700`}>Past due</span>
        return <span className={`${base} bg-slate-100 text-slate-700`}>Cancelled</span>
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            Manage
          </button>
          <button className="rounded-lg bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-red-700">
            Cancel
          </button>
        </div>
      ),
    },
  ]

  const planDist = [
    { name: 'Basic', value: 420, fill: '#4f46e5' },
    { name: 'Pro', value: 310, fill: '#6366f1' },
    { name: 'Enterprise', value: 126, fill: '#818cf8' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Subscriptions</div>
          <div className="mt-1 text-sm text-slate-600">Track MRR and plan performance.</div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
            <PlusCircle className="h-4 w-4" />
            Create subscription
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active" value="856" variant="success" />
        <StatCard title="MRR" value="NGN 1.2M" />
        <StatCard title="Churn" value="1.8%" variant="warn" />
        <StatCard title="Avg value" value="NGN 8,500" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="text-sm font-semibold text-slate-900">Subscriptions table</div>
          <div className="mt-4">
            <DataTable rows={subscriptionsMock} columns={columns} pageSize={8} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Plan distribution</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={planDist} dataKey="value" nameKey="name" outerRadius={80} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1 text-xs text-slate-600">
            {planDist.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.fill }} />
                  <span>{p.name}</span>
                </div>
                <span className="tabular-nums">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
