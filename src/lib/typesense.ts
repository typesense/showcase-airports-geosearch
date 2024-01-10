import { Client } from 'typesense';

const typesense = new Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY ?? '',
  connectionTimeoutSeconds: 2,
});

export default typesense;
