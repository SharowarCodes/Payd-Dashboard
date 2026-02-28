import { useState } from 'react'
import RevenueChart from '../components/RevenueChart'
import SuccessRateCard from '../components/SuccessRateCard'
import PaymentIssuesCard from '../components/PaymentIssuesCard'
import ActivityFeed from '../components/ActivityFeed'
import { activityData, errorData, revenueData } from '../data/dashboardData'
import { Download, PlusCircle, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [period, setPeriod] = useState('Weekly')

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Total Honour</div>
            <div className="mt-1 text-xl font-semibold text-slate-900 md:text-2xl">
              You earned TOP DEVELOPER for transactions this month
            </div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              +12% from last month
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Download report
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
              <PlusCircle className="h-4 w-4" />
              Add funds
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Revenue Overview</div>
              <div className="mt-1 text-xs text-slate-500">Bar chart showing weekly revenue</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ' +
                  (period === 'Weekly'
                    ? 'bg-payd-600/10 text-payd-800'
                    : 'text-slate-600 hover:bg-slate-50')
                }
                onClick={() => setPeriod('Weekly')}
              >
                Weekly
              </button>
              <button
                className={
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ' +
                  (period === 'Monthly'
                    ? 'bg-payd-600/10 text-payd-800'
                    : 'text-slate-600 hover:bg-slate-50')
                }
                onClick={() => setPeriod('Monthly')}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mt-4">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <SuccessRateCard />
          <PaymentIssuesCard errorData={errorData} />
        </div>
      </section>

      <ActivityFeed items={activityData} />
    </div>
  )
}
