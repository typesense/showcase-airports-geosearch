import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';

const typesense = new TypesenseInstantsearchAdapter({
  server: {
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST ?? 'localhost',
        port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT ?? 8108),
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL ?? 'http',
      },
    ],
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY ?? '',
    connectionTimeoutSeconds: 2,
  },
  additionalSearchParameters: {
    query_by: 'name,iata_code,ident,gps_code,country_name,region_name,type',
    limit: 100,
  },
  geoLocationField: 'location',
});

export default typesense;
