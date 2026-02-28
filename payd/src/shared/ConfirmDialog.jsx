import PropTypes from 'prop-types'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  const confirmStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    default: 'bg-payd-600 hover:bg-payd-700',
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 px-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold text-slate-900">{title}</div>
        {description ? <div className="mt-2 text-sm text-slate-600">{description}</div> : null}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={
              'rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ' +
              (confirmStyles[variant] || confirmStyles.default)
            }
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'danger']),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
