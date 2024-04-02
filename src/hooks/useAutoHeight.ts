import { useState, useCallback, useEffect, useLayoutEffect as _useLayoutEffect } from 'react';

const useLayoutEffect =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  typeof window !== 'undefined' && window.document && window.document.createElement!
    ? _useLayoutEffect
    : useEffect;

const useAutoHeight = ({
  anchorRef,
  show,
  margin = 0
}: {
  anchorRef: React.RefObject<Element>;
  show?: boolean;
  margin?: number;
}) => {
  const [height, setHeight] = useState<React.CSSProperties['maxHeight']>();

  const computeHeight = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const newHeight = window.innerHeight - anchor.getBoundingClientRect().bottom - margin;
    setHeight(newHeight >= 0 ? newHeight : undefined);
  }, [anchorRef, margin]);

  useLayoutEffect(() => {
    show && computeHeight();
  }, [show, computeHeight]);

  return [height, computeHeight] as const;
};

export { useAutoHeight };
