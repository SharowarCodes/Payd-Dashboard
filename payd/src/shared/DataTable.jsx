import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'

export default function DataTable({ rows, columns, pageSize = 10 }) {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: null, dir: 'asc' })

  const sorted = useMemo(() => {
    const safeRows = Array.isArray(rows) ? rows : []
    if (!sort.key) return safeRows
    const col = columns.find((c) => c.key === sort.key)
    const get = col?.sortValue ? col.sortValue : (r) => r[sort.key]

    const copy = [...safeRows]
    copy.sort((a, b) => {
      const av = get(a)
      const bv = get(b)
      if (av === bv) return 0
      if (av == null) return 1
      if (bv == null) return -1
      return sort.dir === 'asc' ? (av > bv ? 1 : -1) : av > bv ? -1 : 1
    })
    return copy
  }, [rows, sort, columns])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize)

  const toggleSort = (key) => {
    setPage(1)
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: 'asc' }
      return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
    })
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((c) => {
                const sortable = c.sortValue || typeof c.key === 'string'
                return (
                  <th
                    key={c.key}
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    <button
                      className={
                        'inline-flex items-center gap-1 ' +
                        (sortable ? 'hover:text-slate-700' : 'cursor-default')
                      }
                      onClick={sortable ? () => toggleSort(c.key) : undefined}
                      type="button"
                    >
                      {c.header}
                      {sortable ? <ChevronsUpDown className="h-3.5 w-3.5" /> : null}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {pageRows.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan={columns.length}>
                  No results
                </td>
              </tr>
            ) : null}

            {pageRows.map((r, idx) => (
              <tr key={r.id ?? idx} className="transition-colors hover:bg-slate-50">
                {columns.map((c) => (
                  <td key={c.key} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
        <div className="text-xs text-slate-500">
          Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
          <span className="font-semibold text-slate-700">{totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
      sortValue: PropTypes.func,
    }),
  ).isRequired,
  pageSize: PropTypes.number,
}
