import { useEffect, useState } from 'react';

/**
 * True on devices that cannot hover (phones, tablets). Hairline figures only
 * answer a pointer, so on these devices they are given `play` to move on
 * their own. False on the server and on first render, so markup matches.
 */
export default function useNoHover(): boolean {
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: none)');
    const sync = () => setNoHover(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return noHover;
}
