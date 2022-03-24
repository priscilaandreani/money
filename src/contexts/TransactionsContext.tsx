import { createContext, ReactNode } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';

interface DataResponse {
  transactions: Transaction[] | undefined;
}
interface Transaction {
  id: number;
  title: string;
  type: string;
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
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export const TransactionsContext = createContext<StateContext>(
  {} as StateContext
);

export function TransactionsProvider({ children }: TransactionProvider) {
  const { data, isFetching, setData } = useFetch<DataResponse>('/transactions');

  let transactions = data?.transactions;

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    if (transactions !== undefined) {
      setData({
        transactions: [...transactions, transaction],
      });
    } else {
      setData({
        transactions: [transaction],
      });
    }
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, isFetching, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
