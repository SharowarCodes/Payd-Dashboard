import PropTypes from 'prop-types'

export default function RecentActivity({ items }) {
  const safeItems = Array.isArray(items) ? items : []

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">Recent Activity</div>
        <div className="text-xs text-slate-500">Stats</div>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {safeItems.length === 0 ? (
          <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
            No recent activity
          </div>
        ) : null}

        {safeItems.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-payd-50 text-sm font-semibold text-payd-700">
              {a.initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate font-semibold text-slate-900">{a.name}</div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-slate-500 sm:inline">{a.time}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="mt-0.5 truncate text-sm text-slate-600">{a.message}</div>
              <div className="mt-1 text-xs text-slate-500 sm:hidden">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

RecentActivity.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      initials: PropTypes.string.isRequired,
    }),
  ),
}
