import { useEffect, useRef } from 'react';

import type { RefObject } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  enabled: boolean = true,
) => {
  const savedHandler = useRef(onOutsideClick);

  useEffect(() => {
    savedHandler.current = onOutsideClick;
  }, [onOutsideClick]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        savedHandler.current();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref, enabled]);
};

export default useOutsideClick;
