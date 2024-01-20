import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';
import Head from 'next/head';
import { InstantSearch } from 'react-instantsearch';

import {
  AirportTypeControl,
  ElevationControl,
  Map,
  ScheduledServiceControl,
  SearchControl,
  SearchStats,
} from '@/components';
import typesense from '@/lib/typesense';

export default function Home() {
  return (
    <>
      <Head>
        <title>Airports Search with Typesense</title>
      </Head>
      <InstantSearch searchClient={typesense.searchClient} indexName="airports">
        <div className="flex flex-col w-screen h-screen antialiased">
          <div className="bg-white drop-shadow relative z-10 divide-y">
            <div className="flex items-center gap-4 px-6 py-4">
              <h1 className="text-2xl font-serif font-black">
                Airports Search
              </h1>

              <div className="flex gap-1.5 items-center text-sm">
                Powered by
                <a href="https://typesense.org" target="_blank">
                  <img src="/images/typesense.svg" className="h-5" />
                </a>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href="#"
                  target="_blank"
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  About
                  <ArrowSquareOut weight="bold" className="w-4 h-4 -mt-0.5" />
                </a>

                <a
                  href="#"
                  target="_blank"
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Source Code
                  <GithubLogo weight="bold" className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-[1fr,1fr,1fr,auto] divide-x">
              <SearchControl />
              <AirportTypeControl />
              <ElevationControl />
              <ScheduledServiceControl />
            </div>
            <SearchStats />
          </div>
          <Map />
        </div>
      </InstantSearch>
    </>
  );
}
