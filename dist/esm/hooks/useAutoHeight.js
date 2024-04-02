import { useState, useCallback, useLayoutEffect as useLayoutEffect$1, useEffect } from 'react';

const useLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? useLayoutEffect$1 : useEffect;
const useAutoHeight = ({
  anchorRef,
  show,
  margin = 0
}) => {
  const [height, setHeight] = useState();
  const computeHeight = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const newHeight = window.innerHeight - anchor.getBoundingClientRect().bottom - margin;
    setHeight(newHeight >= 0 ? newHeight : undefined);
  }, [anchorRef, margin]);
  useLayoutEffect(() => {
    show && computeHeight();
  }, [show, computeHeight]);
  return [height, computeHeight];
};

export { useAutoHeight };
