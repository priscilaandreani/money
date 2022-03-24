import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions?.reduce(
    (accumulated, transaction) => {
      if (transaction.type === 'deposit') {
        accumulated.deposits += transaction.amount;
        accumulated.total += transaction.amount;
      } else {
        accumulated.withdraws += transaction.amount;
        accumulated.total -= transaction.amount;
      }
      return accumulated;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt='entradas' />
        </header>
        <strong className='deposit'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary!.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt='saídas' />
        </header>
        <strong className='withdraw'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary!.withdraws)}
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt='total' />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary!.total)}
        </strong>
      </div>
    </Container>
  );
}
