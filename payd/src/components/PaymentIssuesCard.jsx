import PropTypes from 'prop-types'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null

  const { label, value } = payload[0].payload
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-slate-600">{value}</div>
    </div>
  )
}

PaymentIssuesCard.propTypes = {
  errorData: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }),
    ).isRequired,
    total: PropTypes.number.isRequired,
  }),
}

export default function PaymentIssuesCard({ errorData }) {
  if (!errorData || !Array.isArray(errorData.categories)) {
    return (
      <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Payment issues</div>
        <div className="mt-6 flex h-28 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          Loading issues...
        </div>
      </div>
    )
  }

  const mini = [
    { label: 'a', value: 5, fill: '#f59e0b' },
    { label: 'x', value: 10, fill: '#ef4444' },
    { label: 'o', value: 3, fill: '#6366f1' },
  ]

  const colorMap = {
    'Customer errors': 'bg-amber-500',
    'Fraud blocks': 'bg-red-500',
    'Bank errors': 'bg-indigo-500',
    'System errors': 'bg-slate-400',
  }

  return (
    <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">Payment issues</div>

      <div className="mt-4 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mini} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15,23,42,0.04)' }} />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-slate-700">
        <span className="font-medium">Total number of errors:</span> {errorData.total}
      </div>

      <div className="mt-4 space-y-1">
        {errorData.categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${colorMap[cat.name] || 'bg-slate-300'}`} />
              <span className="font-medium">{cat.name}</span>
            </div>
            <div className="tabular-nums text-slate-600">{cat.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
