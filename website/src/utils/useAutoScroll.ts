import { useRef, useEffect } from 'react';

const useAutoScroll = <E extends Element = HTMLUListElement>(
  open: boolean,
  items: unknown[]
) => {
  const ref = useRef<E>(null);
  useEffect(() => {
    if (open) {
      if (ref.current.getBoundingClientRect().bottom > window.innerHeight) {
        ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
      ref.current.scrollTop = 0;
    }
  }, [open, items.length]);

  return ref;
};

export { useAutoScroll };
