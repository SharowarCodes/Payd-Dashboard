import { Gift, Share2 } from 'lucide-react'
import StatCard from '../shared/StatCard'
import DataTable from '../shared/DataTable'
import { referralsMock } from '../data/referralsData'

export default function ReferralsPage() {
  const columns = [
    { key: 'referred', header: 'Referred customer' },
    { key: 'referrer', header: 'Referrer' },
    { key: 'date', header: 'Date referred' },
    { key: 'status', header: 'Status' },
    { key: 'reward', header: 'Reward status' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
          Details
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Referrals</div>
          <div className="mt-1 text-sm text-slate-600">Grow with a referral program.</div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
          <Share2 className="h-4 w-4" />
          Share referral link
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total referrals" value="342" icon={Gift} />
        <StatCard title="Conversions" value="128" variant="success" />
        <StatCard title="Conversion rate" value="37.4%" />
        <StatCard title="Rewards paid" value="NGN 256,000" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Referrals list</div>
        <div className="mt-4">
          <DataTable rows={referralsMock} columns={columns} pageSize={8} />
        </div>
      </div>
    </div>
  )
}
