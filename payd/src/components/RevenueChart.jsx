import PropTypes from 'prop-types'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function formatNgn(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  const amount = payload[0].value

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-slate-600">{formatNgn(amount)}</div>
    </div>
  )
}

export default function RevenueChart({ data }) {
  if (!Array.isArray(data)) {
    return (
      <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
        <div className="text-sm font-semibold text-slate-900">Revenue</div>
        <div className="mt-6 flex h-48 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          Loading chart...
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
        <div className="text-sm font-semibold text-slate-900">Revenue</div>
        <div className="mt-6 flex h-48 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-900">Revenue</div>
          <div className="mt-1 text-xs text-slate-500">Weekly revenue overview</div>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="paydBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 200000]}
              ticks={[0, 50000, 100000, 150000, 200000]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,70,229,0.08)' }} />
            <Bar dataKey="amount" fill="url(#paydBar)" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

RevenueChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      week: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ),
}
