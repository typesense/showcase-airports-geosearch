import { parse as csvParse } from 'csv-parse';
import dotenv from 'dotenv';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

dotenv.config();

const typesense = new Typesense.Client({
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

const typesenseAirportsSchema: CollectionCreateSchema = {
  name: 'airports',
  fields: [
    {
      name: 'id',
      type: 'string',
      index: true,
    },
    {
      name: 'ident',
      type: 'string',
      index: true,
    },
    {
      name: 'type',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'location',
      type: 'geopoint',
      index: true,
    },
    {
      name: 'elevation',
      type: 'float',
    },
    {
      name: 'continent',
      type: 'string',
    },
    {
      name: 'iso_country',
      type: 'string',
    },
    {
      name: 'iso_region',
      type: 'string',
    },
    {
      name: 'municipality',
      type: 'string',
      optional: true,
    },
    {
      name: 'scheduled_service',
      type: 'bool',
    },
    {
      name: 'gps_code',
      type: 'string',
      optional: true,
    },
    {
      name: 'iata_code',
      type: 'string',
      optional: true,
    },
    {
      name: 'local_code',
      type: 'string',
      optional: true,
    },
    {
      name: 'home_link',
      type: 'string',
      optional: true,
    },
    {
      name: 'wikipedia_link',
      type: 'string',
      optional: true,
    },
    {
      name: 'keywords',
      type: 'string',
      optional: true,
    },
    {
      name: 'country_name',
      type: 'string',
    },
    {
      name: 'region_name',
      type: 'string',
    },
  ],
};

const airports: object[] = [];
const collect = new Writable({
  write(record: any) {
    const airport = {
      id: record.id.toString(),
      ident: record.ident.toString(),
      type: record.type,
      name: record.name,
      location: [Number(record.latitude_deg), Number(record.longitude_deg)],
      elevation: Number(record.elevation_ft),
      continent: record.continent,
      iso_country: record.iso_country,
      iso_region: record.iso_region,
      municipality: record.municipality?.toString(),
      scheduled_service: record.scheduled_service === 'yes',
      gps_code: record.gps_code?.toString(),
      iata_code: record.iata_code,
      local_code: record.local_code?.toString(),
      home_link: record.home_link,
      wikipedia_link: record.wikipedia_link,
      keywords: record.keywords?.toString(),
      country_name: record.country_name,
      region_name: record.region_name,
    };

    airports.push(airport);
  },
  objectMode: true,
});

(async function () {
  // Delete existing collection with same name if it exists
  if (await typesense.collections(typesenseAirportsSchema.name).exists()) {
    await typesense.collections(typesenseAirportsSchema.name).delete();
  }

  // Create the collection
  await typesense.collections().create(typesenseAirportsSchema);

  /**
   * Read the CSV file, parse it, and collect it.
   * The records can also be created as documents on Typesense in stream,
   * but `import` method is much faster to create multiple records at once.
   */
  await pipeline(
    createReadStream(resolve(__dirname, './data.csv')),
    csvParse({ columns: true }),
    collect
  );

  await typesense
    .collections(typesenseAirportsSchema.name)
    .documents()
    .import(airports);
})();
