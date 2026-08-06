'use client';

import { useEffect } from 'react';

export default function ScrollHandler() {
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const currentPathname = window.location.pathname;
      const isHomePage = currentPathname === '/';

      let targetId = '';
      if (href.startsWith('#')) {
        targetId = href.substring(1);
      } else if (isHomePage && href.startsWith('/#')) {
        targetId = href.substring(2);
      }

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Only update history if the hash is actually changing to avoid double-hash bugs
          const targetHash = `#${targetId}`;
          if (window.location.hash !== targetHash) {
            const cleanUrl = window.location.pathname + targetHash;
            window.history.pushState(null, '', cleanUrl);
          }
        }
      }
    };

    // Use capture phase to intercept clicks before other routers try to handle them
    document.addEventListener('click', handleHashClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleHashClick, { capture: true });
    };
  }, []);

  return null;
}
