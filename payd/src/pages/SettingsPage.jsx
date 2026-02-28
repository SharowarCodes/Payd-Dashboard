import { useState } from 'react'

const tabs = ['Profile', 'Team', 'Payments', 'Notifications', 'Security', 'Billing']

export default function SettingsPage() {
  const [tab, setTab] = useState('Profile')

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold text-slate-900">Settings</div>
        <div className="mt-1 text-sm text-slate-600">Manage business preferences.</div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              className={
                'rounded-lg px-3 py-2 text-sm font-semibold transition-colors ' +
                (tab === t ? 'bg-payd-600/10 text-payd-800' : 'text-slate-600 hover:bg-slate-50')
              }
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">{tab} settings</div>
        <div className="mt-1 text-sm text-slate-600">This is a starter UI scaffold. Wire to your API later.</div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-600">Business name</label>
            <input className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Business email</label>
            <input className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Timezone</label>
            <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200">
              <option>UTC+01</option>
              <option>UTC+06</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Currency</label>
            <select className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-payd-200">
              <option>NGN</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button className="rounded-lg bg-payd-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700">
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}
