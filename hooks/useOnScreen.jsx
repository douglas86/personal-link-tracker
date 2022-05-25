import { useState, useEffect } from 'react';

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.setIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconect();
    };
  }, []);

  return isIntersecting;
}
