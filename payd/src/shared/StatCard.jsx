import PropTypes from 'prop-types'

export default function StatCard({ title, value, trend, icon: Icon, variant = 'default' }) {
  const variantStyles = {
    default: 'bg-white',
    success: 'bg-emerald-50',
    warn: 'bg-amber-50',
    danger: 'bg-red-50',
  }

  return (
    <div className={`rounded-2xl border border-slate-200 ${variantStyles[variant]} p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
          {trend ? <div className="mt-1 text-xs font-semibold text-emerald-700">{trend}</div> : null}
        </div>
        {Icon ? (
          <div className="rounded-xl bg-slate-900/5 p-2 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.string,
  icon: PropTypes.any,
  variant: PropTypes.oneOf(['default', 'success', 'warn', 'danger']),
}
