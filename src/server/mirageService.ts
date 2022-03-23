import { createServer, Model } from 'miragejs';

export const fakeService = () => {
  createServer({
    models: {
      transaction: Model,
    },

    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: 'Exemplo de depósito',
            type: 'deposit',
            category: 'Exemplo',
            amount: 600,
            createdAt: new Date('2021-02-12 09:00:00'),
          },
          {
            id: 2,
            title: 'Exemplo de retirada',
            type: 'withdraw',
            category: 'Exemplo',
            amount: 200,
            createdAt: new Date('2021-02-12 12:00:00'),
          },
        ],
      });
    },
    routes() {
      this.namespace = 'api';

      this.get('/transactions', () => {
        return this.schema.all('transaction');
      });

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);

        return schema.create('transaction', data);
      });
    },
  });
};
