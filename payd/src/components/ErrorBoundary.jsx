import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    if (this.props.onError) this.props.onError(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-2xl font-semibold text-slate-900">Something went wrong</div>
          <div className="mt-2 text-sm text-slate-600">Please refresh the page and try again.</div>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
}
