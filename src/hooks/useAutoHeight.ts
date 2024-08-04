import { useState, useCallback, useEffect, useLayoutEffect as _useLayoutEffect } from 'react';

const useLayoutEffect =
  typeof window !== 'undefined' && window.document && window.document.createElement!
    ? _useLayoutEffect
    : useEffect;

const findOverflowAncestor = (element: Element | null) => {
  while (element) {
    element = element.parentElement;
    if (!element || element === document.body) return;
    const { overflow, overflowX, overflowY } = getComputedStyle(element);
    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) return element;
  }
};

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
    const overflowAncestor = findOverflowAncestor(anchor);
    const bottomBoundary = overflowAncestor
      ? overflowAncestor.getBoundingClientRect().bottom
      : window.innerHeight;
    const newHeight = bottomBoundary - anchor.getBoundingClientRect().bottom - margin;
    setHeight(Math.max(newHeight, 0));
  }, [anchorRef, margin]);

  useLayoutEffect(() => {
    show && computeHeight();
  }, [show, computeHeight]);

  return [height, computeHeight] as const;
};

export { useAutoHeight };
