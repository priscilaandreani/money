import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

import { fakeService } from './server/mirageService';
import { GlobalStyle } from './styles/global';

fakeService();

export function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Header />
      <Dashboard />
    </div>
  );
}
