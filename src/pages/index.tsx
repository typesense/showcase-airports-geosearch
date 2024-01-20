import { InstantSearch } from 'react-instantsearch';

import {
  AirportTypeControl,
  ElevationControl,
  Map,
  ScheduledServiceControl,
  SearchControl,
} from '@/components';
import typesense from '@/lib/typesense';

export default function Home() {
  return (
    <InstantSearch searchClient={typesense.searchClient} indexName="airports">
      <div className="flex flex-col w-screen h-screen antialiased">
        <div className="bg-white drop-shadow relative z-10">
          <div className="px-6 py-5 border-b">
            <h1 className="text-2xl font-serif font-black">Airports Search</h1>
          </div>
          <div className="grid grid-cols-[1fr,1fr,1fr,auto] divide-x">
            <SearchControl />
            <AirportTypeControl />
            <ElevationControl />
            <ScheduledServiceControl />
          </div>
        </div>
        <Map />
      </div>
    </InstantSearch>
  );
}
