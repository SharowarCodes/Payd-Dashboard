import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null

  const { name, value } = payload[0]
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-sm">
      <div className="font-semibold text-slate-900">{name}</div>
      <div className="mt-1 text-slate-600">{value}%</div>
    </div>
  )
}

export default function SuccessRateCard() {
  const ratioData = [
    { key: 'Successful', value: 98, fill: '#10b981' },
    { key: 'Unsuccessful', value: 2, fill: '#ef4444' },
  ]

  return (
    <div className="col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">Success rate</div>

      <div className="mt-6 text-center">
        <div className="text-5xl font-semibold tracking-tight text-slate-900">98%</div>
      </div>

      <div className="mt-6 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ratioData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis type="number" hide domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(15,23,42,0.04)' }} />
            <Bar dataKey="value" radius={[8, 8, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Successful</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>Unsuccessful</span>
        </div>
      </div>
    </div>
  )
}
