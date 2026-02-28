import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-full bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-3xl font-semibold text-slate-900">404</div>
        <div className="mt-2 text-sm text-slate-600">This page doesn’t exist.</div>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-payd-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-payd-700"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
