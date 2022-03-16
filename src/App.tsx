import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import Modal from 'react-modal';
import { fakeService } from './server/mirageService';
import { GlobalStyle } from './styles/global';

fakeService();

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransaction() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransaction() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <div className='App'>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransaction} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransaction}
      />
    </div>
  );
}
