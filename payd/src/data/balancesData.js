export const balancesHistoryMock = [
  { date: 'Mar 22', balance: 2050000 },
  { date: 'Mar 23', balance: 2120000 },
  { date: 'Mar 24', balance: 1980000 },
  { date: 'Mar 25', balance: 2250000 },
  { date: 'Mar 26', balance: 2380000 },
  { date: 'Mar 27', balance: 2510000 },
  { date: 'Mar 28', balance: 2450000 },
]

export const balanceTransactionsMock = [
  { id: 1, label: 'Card payment - TX-10482', date: 'Mar 28, 2024', type: 'credit', amount: 12500, running: 2450000 },
  { id: 2, label: 'Payout - PO-20011', date: 'Mar 27, 2024', type: 'debit', amount: -250000, running: 2437500 },
  { id: 3, label: 'Bank transfer - TX-10479', date: 'Mar 26, 2024', type: 'credit', amount: 7600, running: 2687500 },
]
