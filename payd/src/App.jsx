import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import CustomersPage from './pages/CustomersPage'
import PayoutsPage from './pages/PayoutsPage'
import BalancesPage from './pages/BalancesPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import PaymentPlansPage from './pages/PaymentPlansPage'
import ReferralsPage from './pages/ReferralsPage'
import AuditLogsPage from './pages/AuditLogsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/payouts" element={<PayoutsPage />} />
        <Route path="/balances" element={<BalancesPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/payment-plans" element={<PaymentPlansPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
