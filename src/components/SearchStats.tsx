import { useEffect, useState } from 'react';
import { useStats } from 'react-instantsearch';

import typesense from '@/lib/typesense';

async function getIndexSize() {
  const results = await typesense.typesenseClient
    .collections('airports')
    .documents()
    .search({ q: '*', query_by: 'ident' }, {});
  return results.found;
}

export default function SearchStats() {
  const { nbHits, processingTimeMS } = useStats();
  const [indexSize, setIndexSize] = useState<number>();

  useEffect(() => {
    getIndexSize().then(setIndexSize);
  }, [setIndexSize]);

  let statsText = '';
  if (nbHits === 0) {
    statsText = 'no results';
  } else if (nbHits === 1) {
    statsText = '1 result';
  } else {
    statsText = `${nbHits.toLocaleString()} results`;
  }

  const indexText = indexSize?.toLocaleString() ?? '';

  return (
    <div className="text-xs py-1.5 px-6 text-gray-600">
      {`Found ${statsText} ${indexText} in ${processingTimeMS}ms`}
    </div>
  );
}
