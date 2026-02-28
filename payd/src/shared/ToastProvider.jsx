import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { X } from 'lucide-react'

const ToastContext = createContext(null)

function ToastItem({ toast, onDismiss }) {
  const styles = {
    default: 'border-slate-200 bg-white text-slate-900',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    warn: 'border-amber-200 bg-amber-50 text-amber-900',
    danger: 'border-red-200 bg-red-50 text-red-900',
  }

  return (
    <div
      className={
        'flex w-[360px] max-w-[calc(100vw-2rem)] items-start justify-between gap-3 rounded-xl border p-4 shadow-sm ' +
        (styles[toast.variant] || styles.default)
      }
      role="status"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold">{toast.title}</div>
        {toast.message ? <div className="mt-1 text-sm opacity-80">{toast.message}</div> : null}
      </div>
      <button
        className="rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

ToastItem.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'success', 'warn', 'danger']),
  }).isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback((toast) => {
    const id = crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())
    const item = {
      id,
      title: toast.title || 'Notification',
      message: toast.message,
      variant: toast.variant || 'default',
      timeoutMs: toast.timeoutMs ?? 3500,
    }

    setToasts((prev) => [item, ...prev].slice(0, 4))

    if (item.timeoutMs > 0) {
      window.setTimeout(() => dismiss(id), item.timeoutMs)
    }

    return id
  }, [dismiss])

  const api = useMemo(() => ({ push, dismiss }), [push, dismiss])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[60] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
