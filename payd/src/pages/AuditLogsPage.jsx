import { Download } from 'lucide-react'
import DataTable from '../shared/DataTable'
import { auditLogsMock } from '../data/auditLogsData'

export default function AuditLogsPage() {
  const columns = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'user', header: 'User' },
    { key: 'action', header: 'Action type' },
    { key: 'resource', header: 'Resource' },
    { key: 'ip', header: 'IP address' },
    { key: 'status', header: 'Status' },
    {
      key: 'details',
      header: 'Details',
      render: () => (
        <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
          View
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Audit Logs</div>
          <div className="mt-1 text-sm text-slate-600">Security and activity tracking.</div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Export logs
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Logs</div>
        <div className="mt-4">
          <DataTable rows={auditLogsMock} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  )
}
