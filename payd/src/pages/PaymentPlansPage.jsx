import { PlusCircle } from 'lucide-react'
import { plansMock } from '../data/paymentPlansData'

export default function PaymentPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-900">Payment Plans</div>
          <div className="mt-1 text-sm text-slate-600">Create and manage pricing plans.</div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-payd-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
          <PlusCircle className="h-4 w-4" />
          Create plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plansMock.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">NGN {p.price.toLocaleString()}</div>
                <div className="mt-1 text-xs text-slate-500">{p.cycle}</div>
              </div>

              <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>{p.active ? 'Active' : 'Inactive'}</span>
                <input type="checkbox" defaultChecked={p.active} className="h-4 w-4 accent-indigo-600" />
              </label>
            </div>

            <div className="mt-4 space-y-2">
              {p.features.map((f) => (
                <div key={f} className="text-sm text-slate-600">
                  - {f}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500">Subscribers: {p.subscribers}</div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  Edit
                </button>
                <button className="rounded-lg bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
