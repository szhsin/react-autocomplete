import { useRef, useEffect } from 'react';

const useAutoScroll = <E extends Element = HTMLUListElement>(
  open: boolean,
  items: unknown[]
) => {
  const ref = useRef<E>(null);
  useEffect(() => {
    if (open) {
      const elt = ref.current;
      if (!elt) return;
      if (elt.getBoundingClientRect().bottom > window.innerHeight) {
        elt.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
      elt.scrollTop = 0;
    }
  }, [open, items.length]);

  return ref;
};

export { useAutoScroll };
