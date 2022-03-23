import { useFetch } from '../../hooks/useFetch';
import { Container } from './styles';

interface DataResponse {
  transactions: Transaction[];
}
interface Transaction {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const { data, isFetching } = useFetch<DataResponse>('/transactions');
  console.log(data?.transactions);
  let transactions = data?.transactions;

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {isFetching && (
            <tr>
              <td>Carregando transações</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}

          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
