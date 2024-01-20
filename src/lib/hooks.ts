import { useEffect, useState } from 'react';

export const useWikipediaThumbnailUrl = (wikipediaLink: string) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();

  useEffect(() => {
    if (thumbnailUrl || !wikipediaLink) return;

    const [, articleTitle] = wikipediaLink.split('/wiki/');
    if (!articleTitle) return;

    // Fetch the main image of a Wikipedia article using Wikipedia API
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${articleTitle}`
    )
      .then((res) => res.json())
      .then((data) => {
        setThumbnailUrl(
          Object.values<{ original?: { source?: string } }>(data.query.pages)[0]
            ?.original?.source
        );
      });
  }, [thumbnailUrl, wikipediaLink]);

  return thumbnailUrl;
};
