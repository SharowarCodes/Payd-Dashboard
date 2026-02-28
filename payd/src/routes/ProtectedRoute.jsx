import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ isAuthed = true, children }) {
  const location = useLocation()

  if (!isAuthed) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />
  }

  return children
}

ProtectedRoute.propTypes = {
  isAuthed: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
