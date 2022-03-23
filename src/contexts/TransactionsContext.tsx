import { createContext, ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';

interface DataResponse {
  transactions: Transaction[] | undefined;
}
interface Transaction {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  category: string;
  createdAt: string;
}

interface TransactionProvider {
  children: ReactNode;
}

interface StateContext {
  transactions: Transaction[] | undefined;
  isFetching: boolean;
}
export const TransactionsContext = createContext<StateContext>({
  transactions: [],
  isFetching: true,
});

export function TransactionsProvider({ children }: TransactionProvider) {
  const { data, isFetching } = useFetch<DataResponse>('/transactions');
  let transactions = data?.transactions;

  return (
    <TransactionsContext.Provider value={{ transactions, isFetching }}>
      {children}
    </TransactionsContext.Provider>
  );
}
