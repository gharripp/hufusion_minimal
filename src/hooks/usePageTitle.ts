import { useEffect } from 'react';

const SITE_TITLE = 'HU Fusion - STAR_Lite Stellarator';

// Sets the document title for a page, restoring the site title on unmount.
export default function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | HU Fusion` : SITE_TITLE;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [title]);
}
