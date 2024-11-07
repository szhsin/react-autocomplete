import { useRef, useEffect } from 'react';

const useAutoScroll = (open: boolean, items: unknown[]) => {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (open) {
      if (ref.current.getBoundingClientRect().bottom > window.innerHeight) {
        ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }, [open, items.length]);

  return ref;
};

export { useAutoScroll };
