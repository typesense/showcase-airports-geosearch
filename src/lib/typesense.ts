import { Client } from 'typesense';

const typesense = new Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY ?? '',
  connectionTimeoutSeconds: 2,
});

export default typesense;
